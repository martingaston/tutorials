import os
from flask import Flask
from . import db, auth

# Flask will automatically detect the factory (create_app or make_app)
def create_app(test_config=None):
    """Create and configure the application factory"""

    # a Flask application is an instance of the Flask class
    # creating a global instance directly can cause issues as a project grows
    # all configuration, registration and other setup will happen inside the function

    # __name__ is the current module name. The Flask class needs to know where it's located
    # to setup some paths.

    # instance_relative_config=True tells the app that configuration files are relative
    # to the instance folder. The instance folder is outside of the flaskr package and
    # can hold local data that shouldn't be commited to version control, such as secret
    # keys and the database.

    app = Flask(__name__, instance_relative_config=True)

    # app.config.from_mapping() sets some configurations that the app will use
    # note how the database is kept in the app.instance_path (see above)

    app.config.from_mapping(
            SECRET_KEY='dev',
            DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
            )

    # app.config.from_pyfile() overrides the default configuration with values from
    # the config.py file from the instance folder, if it exists. This can be used, for
    # example, to set a real SECRET_KEY when deploying

    # test_config can also be passed to the factory to be used instead. This lets tests
    # be configured independently

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # a simple Hello World route
    @app.route('/hello')
    def hello():
        return 'Hello, World!'

    app.register_blueprint(auth.bp)

    db.init_app(app)

    return app
