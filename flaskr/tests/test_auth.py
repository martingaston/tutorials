import pytest

from flask import g, session
from flaskr.db import get_db

def test_register(client, app):
    """Register should render successfully on GET"""
    assert client.get('/auth/register').status_code == 200 # client.get makes a GET request
    response = client.post(
            '/auth/register', data={'username': 'a', 'password': 'a'}
            )
    assert 'http://localhost/auth/login' == response.headers['Location'] # headers will have a Location header of the login URL when the register view redirects to the login view.

    # user's data should be in the test database
    with app.app_context():
        assert get_db().execute(
                "SELECT * FROM user WHERE username = 'a'",
                ).fetchone() is not None

# pytest.mark.parametrize tells Pytest to run the same test function with different arguments.
@pytest.mark.parametrize(('username', 'password', 'message'), (
    # b'...' creates a bytes literal
    ('', '', b'Username is required.'),
    ('a', '', b'Password is required.'),
    ('test', 'test', b'already registered'),
))
def test_register_validate_input(client, username, password, message):
    response = client.post( # client.post makes a POST request
            '/auth/register',
            data={'username': username, 'password': password}
            ) # the data dict is turned into form data
    assert message in response.data # data contains the body of the response as bytes
    # get_data(as_text=True) for unicode

def test_login(client, auth):
    """Test logging in exists in session"""
    assert client.get('/auth/login').status_code == 200
    response = auth.login()
    assert response.headers['Location'] == 'http://localhost/'

    # using client in a with block allows access of context variables (such as session)
    with client:
        client.get('/')
        assert session['user_id'] == 1
        assert g.user['username'] == 'test'

@pytest.mark.parametrize(('username', 'password', 'message'), (
    ('a', 'test', b'Incorrect username.'),
    ('test', 'a', b'Incorrect password.'),
))
def test_login_validate_input(auth, username, password, message):
    """Test incorrect login data"""
    response = auth.login(username, password)
    assert message in response.data

def test_logout(client, auth):
    """Session should not contain user_id after logging out"""
    auth.login()

    with client:
        auth.logout()
        assert 'user_id' not in session


