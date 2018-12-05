import sqlite3
import click # command line interface creation kit

# g is a special object that is unique for each request
# it is used to store data that might be accessed by multiple functions during the req
# the connection is stored and reused instead of being remade if called again in same req

# current_app is another special object that points to the Flask app handling the req
# This known as the Flask application context: http://flask.pocoo.org/docs/1.0/appcontext/

from flask import current_app, g
from flask.cli import with_appcontext

def get_db():
    """Open a sqlite3 database connection"""
    if 'db' not in g:
        # sqlite3.connect() establishes a connection to the file pointed at by the config
        g.db = sqlite3.connect(
                current_app.config['DATABASE'],
                detect_types=sqlite3.PARSE_DECLTYPES
                )
        # sqlite3.Row tells the connection to return rows that behave like dicts
        g.db.row_factory = sqlite3.Row

        return g.db # add g.db to the Flask global (g) application context

def close_db(e=None):
    """Close a sqlite3 database connection if one exists"""
    db = g.pop('db', None)

    if db is not None:
        db.close()

def init_db():
    db = get_db()

    # http://flask.pocoo.org/docs/1.0/api/#flask.Flask.open_resource
    with current_app.open_resource('schema.sql') as f:
        # executescript is a shortcut that creates a sqlite3 cursor() method
        # and calls the executescript convenience method
        db.executescript(f.read().decode('utf8'))

@click.command('init-db')
@with_appcontext
def init_db_command():
    """Clear existing data and create new tables."""
    init_db()
    click.echo('Initialised the SQLite3 database.')

# we're using a factory function so there's no application context available in this file
def init_app(app):
    """Take a Flask appplication and perform registration"""
    app.teardown_appcontext(close_db) # tell Flask to call a function after returning response
    app.cli.add_command(init_db_command) # add a new command that can be called with flask
