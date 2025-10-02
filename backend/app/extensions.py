from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_cors import CORS
import joblib

db = SQLAlchemy()
migrate = Migrate()
login_manager = LoginManager()
cors = CORS()
model = joblib.load('app/model.joblib')
movie_model = joblib.load('app/movie.joblib')
