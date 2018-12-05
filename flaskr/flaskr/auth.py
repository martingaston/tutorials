import functools

from flask import (Blueprint, flash, g, redirect, render_template, request, session, url_for)
from werkzeug.security import check_password_hash, generate_password_hash

from flaskr.db import get_db

# Flask uses a concept of blueprints for making application components and supporting common patterns
# A Blueprint object works similarly to an application object

# create a Blueprint named 'auth', with the url_prefix prepended to all URLs associated with it
# this Blueprint will be registered in the factory function before returning the app
bp = Blueprint('auth', __name__, url_prefix='/auth')

# when Flask recieves a request to /auth/register it will call the register view
@bp.route('/register', methods=('GET', 'POST'))
def register():
    # validate the input if request.method is POST (user submits form)
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        db = get_db()
        error = None

        if not username:
            error = "Username is required."
        elif not password:
            error = "Password is required."
        # db.execute takes a SQL query with ? placeholders and a tuple of values to replace with
        # the sqlite3 library will take care of escaping values this way to prevent SQL injection
        # fetchone() returns one row from the query or None is no results
        elif db.execute(
                'SELECT id FROM user WHERE username = ?', (username,)
                ).fetchone() is not None:
            error = 'User {} is already registered.'.format(username)

        # if validation suceeds, the new user is inserted into the database
        if error is None:
            db.execute(
                    'INSERT INTO user (username, password) VALUES (?, ?)',
                    (username, generate_password_hash(password))
                    )
            # as this query modifies data, db.commit() needs to be called to save changes
            db.commit()
            return redirect(url_for('auth.login'))

        # if error, flash can store messages that can be retrieved when rendering
        flash(error)

    # if GET request or error in validation, render the register page
    return render_template('auth/register.html')

@bp.route('/login', methods=('GET', 'POST'))
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        db = get_db()
        error = None
        # query user and store it in a variable for later use
        user = db.execute(
                'SELECT * FROM user WHERE username = ?', (username,)
                ).fetchone()

        if user is None:
            error = 'Incorrect username.'
        elif not check_password_hash(user['password'], password):
            error = 'Incorrect password.'

        if error is None:
            # session is a dict that stores data across requests
            # the data is stored in a cookie sent to the client
            # Flask signs the data to prevent tampering
            session.clear()
            session['user_id'] = user['id']
            return redirect(url_for('index'))

        flash(error)

    return render_template('auth/login.html')

@bp.before_app_request
def load_logged_in_user():
    """Load a user if their information is available at the start of each request"""
    user_id = session.get('user_id')

    if user_id is None:
        g.user = None
    else:
        g.user = get_db().execute(
                'SELECT * FROM user WHERE id = ?', (user_id,)
                ).fetchone()

@bp.route('/logout')
def logout():
    """Log out current user and remove session"""
    session.clear()
    return redirect(url_for('index'))

def login_required(view):
    """Add a decorator to check for authenticated views, returning view function that wraps original view"""
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return redirect(url_for('auth.login'))

        return view(**kwargs)

    return wrapped_view
