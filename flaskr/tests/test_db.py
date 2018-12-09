import sqlite3
import pytest
from flaskr.db import get_db

def test_get_close_db(app):
    """get_db should return the same connection each time it's called and close after the context"""
    with app.app_context():
        db = get_db()
        assert db is get_db()

    with pytest.raises(sqlite3.ProgrammingError) as e:
        db.execute('SELECT 1')

    assert 'closed' in str(e)

def test_init_db_command(runner, monkeypatch):
    """This test uses Pytest's monkeypatch to replace the init_db function"""
    class Recorder(object):
        called = False

    def fake_init_db():
        Recorder.called = True

    monkeypatch.setattr('flaskr.db.init_db', fake_init_db)
    result = runner.invoke(args=['init-db']) # the runner fixture calls init-db by name
    assert 'Initialised' in result.output
    assert Recorder.called
