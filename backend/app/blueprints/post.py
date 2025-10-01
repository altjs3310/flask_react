from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from ..models import Post
from ..extensions import db

bp = Blueprint('post', __name__)

@bp.post('')
@login_required
def create_post():
  data = request.get_json()

  title = data.get('title')
  content = data.get('content')
 
  if not title or not content:
    return jsonify({'ok':False, 'message':'제목과 내용은 필수입니다'}), 400
  
  post = Post(title=title, content=content, author_id=current_user.id)

  db.session.add(post)
  db.session.commit()

  return jsonify({'ok':True, 'message':'글등록 완료'}), 200  


@bp.get('/')
def post_list():
  posts = db.session.query(Post).order_by(Post.created_at.desc()).all()

  return jsonify({
    'ok':True, 
    'posts':[ post.to_dict() for post in posts ]
  })


@bp.route('/<post_id>')
def get_post(post_id):
  post = db.session.query(Post).get(post_id)

  return jsonify({'ok':True, 'post':post.to_dict()})


@bp.put('/<post_id>')
@login_required
def edit_post(post_id):
  data = request.get_json()

  title = data.get('title')
  content = data.get('content')

  if not title or not content:
    return jsonify({'ok':False, 'message':'제목, 내용 입력'}), 400

  post = db.session.query(Post).get(post_id)

  post.title = title
  post.content = content

  db.session.add(post)
  db.session.commit()

  return jsonify({'ok':True, 'message':'수정 완료'}), 200


@bp.delete('/<post_id>')
@login_required
def delete_post(post_id):

  post = db.session.query(Post).get(post_id)

  if post.author_id != current_user.id:
    return jsonify({'ok':False, 'message':'작성자만 삭제 가능'}), 403

  db.session.delete(post)
  db.session.commit()

  return jsonify({'ok':True, 'message':'삭제 완료'}), 200