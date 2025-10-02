from flask import Blueprint, request, jsonify
from ..extensions import model
from ..extensions import movie_model

import pandas as pd

bp = Blueprint('api', __name__)

@bp.post('/recommend')
def recommend_food():
  """
    요청 데이터 예시
    {
      'spicy' : 1, 'soup' : 0, 'food_type' : 2,
      'sweet' : 0, 'cheap' : 1
    }
  """
  data = request.get_json()

  X = pd.DataFrame([data])

  proba = model.predict_proba(X)[0]
  classes = model.named_steps['knn'].classes_

  order = proba.argsort()[::-1][:3]
  top3 = [{'label':classes[i]} for i in order ]

  return jsonify({
    'ok':True,
    'top3':top3
  })

@bp.post('/movie')
def movie():
  data = request.get_json()

  X = pd.DataFrame([data])
  proba = movie_model.predict_proba(X)[0]
  classes = movie_model.named_steps['knn'].classes_

  order = proba.argsort()[::-1][:3]
  top3 = [{'label':classes[i]} for i in order]

  return jsonify({'ok':True, 'top3':top3})