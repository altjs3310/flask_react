from flask import Flask, jsonify
from .extensions import db, migrate, login_manager, cors
from .config import Config
from .models import User
from flask_login import login_required

def create_app():
  app = Flask(__name__)
  app.config.from_object(Config)

  db.init_app(app)
  migrate.init_app(app, db)    
  # 로그인 성공하면 인증 정보가 담긴 쿠키를 응답 헤더에 담아서 프론트로 보냄
  cors.init_app(app, origins=app.config['CORS_ORIGINS'], supports_credentials=True)
  login_manager.init_app(app)

  @login_manager.user_loader
  def load_user(user_id):
    return User.query.get(user_id)

  @login_manager.unauthorized_handler
  def unauthorized():
    return jsonify({'ok':False, 'message':'인증되지 않은 사용자'}), 401
  
  from .blueprints.auth import bp as auth_bp
  from .blueprints.post import bp as post_bp
  from .blueprints.api import bp as api_bp

  app.register_blueprint(auth_bp, url_prefix='/auth')
  app.register_blueprint(post_bp, url_prefix='/post')
  app.register_blueprint(api_bp, url_prefix='/api')

  @app.route('/check')
  def check():
    return {'ok':True}
  
  @app.route('/check2')
  @login_required
  def check2():
    return {'ok':True}

  return app