from flask import Blueprint, request, jsonify
from email_validator import validate_email, EmailNotValidError
from ..extensions import db
from ..models import User
from flask_login import login_user, login_required, current_user, logout_user

bp = Blueprint('auth', __name__)

@bp.post('/signup')
def signup():
  data = request.get_json()

  username = data.get('username')
  password = data.get('password')
  email = data.get('email')
  nickname = data.get('nickname')

  if not username or not password or not email:
    return jsonify({ 'ok':False, 'message':'아이디,비번,이메일은 필수로 입력' }), 400
  
  try:
    validate_email(email)
  except EmailNotValidError as e:
    return jsonify({'ok':False, 'message':str(e)}), 400
  except Exception:
    return jsonify({'ok':False, 'message':'알 수 없는 오류'}), 400
  
  user = User(username=username, email=email, nickname=nickname)
  user.set_password(password)

  db.session.add(user)
  
  try:
    db.session.commit()
  except Exception:
    db.session.rollback()
    return jsonify({'ok':False, 'message':'이미 등록된 아이디, 이메일입니다.'}), 400
  
  return jsonify({'ok':True, 'message':'회원 가입 완료', 'user':user.to_dict()}), 200


@bp.post('/login')
def login():
  data = request.get_json()

  username = data.get('username')
  password = data.get('password')

  if not username or not password:
    return jsonify({'ok':False, 'message':'아이디 비번 입력하시오'}), 400
  
  # 사용자가 입력한 username에 해당하는 레코드를 DB에서 꺼내옴
  user = db.session.query(User).filter(User.username == username).first()

  # 꺼내왔는데 없을 수 있고 -> username이 잘못입력
  # 있으면 -> 비번 검사
  if not user or not user.check_password(password):
    return jsonify({'ok':False, 'message':'아이디 또는 비번 틀림'}), 400
  
  login_user(user)
  return jsonify({'ok':True, 'message':'로그인 성공', 'user':user.to_dict()}), 200
  
  # 프론트에서 아이디 비번을 받음
  # 아이디 비번을 검사
  # 아이디 비번이 일치하면 로그인 처리를 해줌
  # 중간중간 문제 있을 때 응답, 성공 시 응답 처리

  # 실패 시 전부 ok : False, 성공 시 ok : True
  # 아이디, 비번이 안왔으면 message : 아이디 비번 입력하시오
  # 아이디, 비번이 일치하지 않으면 : 잘못된 정보입니다.
  # 로그인 성공 : 로그인 성공, 로그인 성공한 유저 객체

@bp.get('/me')
def me():
  if current_user.is_authenticated: # 인증된 사용자면
    return jsonify({'ok':True, 'user':current_user.to_dict()}), 200
  return jsonify({'ok':False, 'user':None}), 200


@bp.post('/logout')
@login_required
def logout():
  logout_user
  return jsonify({'ok':True, 'message':'로그아웃 성공'}), 200
