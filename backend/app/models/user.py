from datetime import datetime
from flask_login import UserMixin, login_manager
from werkzeug.security import generate_password_hash, check_password_hash
from ..extensions import db

class User(db.Model, UserMixin):
  __tablename__ = 'users'
  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(50), unique=True, nullable=False, index=True)
  password_hash = db.Column(db.String(255), nullable=False)
  email = db.Column(db.String(255), unique=True)
  nickname = db.Column(db.String(100))
  created_at = db.Column(db.DateTime, default=datetime.now)

  def set_password(self, password):
    self.password_hash = generate_password_hash(password)

  def check_password(self, password):
    return check_password_hash(self.password_hash, password)
  
  def to_dict(self):
    return {
      'id':self.id,
      'username':self.username,
      'email':self.email,
      'nickname':self.nickname,
      'created_at':self.created_at
    }