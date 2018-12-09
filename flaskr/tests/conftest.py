# conftest will be loaded as a directory-specific hook implementation
# in short, this will be invoked with every test file in the directory

import os
import tempfile

import pytest

from flaskr import create_app
from flaskr.db import get_db, init_db

# open our dummy data test file
with open(os.path.join(os.path.dirname(__file__), 'data.sql'), 'rb') as f:
    _data_sql = f.read().decode('utf8')

# the pytest.fixture decorator will setup the app factory in testing mode
# https://docs.pytest.org/en/2.7.3/fixture.html
@pytest.fixture
def app():
    db_fd, db_path = tempfile.mkstemp() # creates and opens temporary file, returning the file and its path

    app = create_app({
        'TESTING': True, # set testing mode
        'DATABASE': db_path, # set up our test sql database
        })

    with app.app_context():
        init_db()
        get_db().executescript(_data_sql)

    yield app

    os.close(db_fd)
    os.unlink(db_path)

# the client fixture returns the app.test_client() with the application above
# tests will execute without running the server in this mode
@pytest.fixture
def client(app):
    return app.test_client()

# create a runner that can call the Click commands registered with the application
@pytest.fixture
def runner(app):
    return app.test_cli_runner()

class AuthActions(object):
    def __init__(self, client):
        # _single_leading_underscore: weak "internal use" indicator. E.g. from M import * does not import objects whose name starts with an underscore (PEP8)
        # in short - it means it's intended to be private :)
        self._client = client

    def login(self, username='test', password='test'):
        return self._client.post(
                '/auth/login',
                data={'username': username, 'password': password}
                )

    def logout(self):
        return self._client.get('/auth/logout')

@pytest.fixture
def auth(client):
    return AuthActions(client)

