from datetime import datetime
from ..extensions import db

class Post(db.Model):
  __tablename__ = 'posts'

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(200), nullable=False)
  content = db.Column(db.Text(), nullable=False)
  author_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  author = db.relationship('User', backref=db.backref('posts'))
  created_at = db.Column(db.DateTime, default=datetime.now)

  def to_dict(self):
    return {
      'id':self.id,
      'title':self.title,
      'content':self.content,
      'created_at':self.created_at,
      'author':{
        'id':self.author_id,
        'nickname':self.author.nickname
      }
    }