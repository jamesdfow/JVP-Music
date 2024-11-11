from flask import Flask, request, render_template, make_response
from flask_restful import Resource, Api
from json import dumps
from flask_jsonpify import jsonify
from config import load_config
from dbconnection import connect

app = Flask(__name__)
api = Api(app)

def run():
     print('server running on port 5002')
     app.run(port='5002')

class HomePage(Resource):
     def get(self):
          response = make_response(render_template('index.html'))
          response.headers['Content-Type'] = 'text/html'
          return response
     
class ResultsPage(Resource):
     def get(self):
          response = make_response(render_template('page2.html'))
          response.headers['Content-Type'] = 'text/html'
          return response

class Artists(Resource):
     def get(self):
          conn = db_connection()
          cursor = conn.cursor()
          search_term = request.args.get('artist_name')
          cursor.execute("SELECT * FROM artists WHERE last_name = '%s'" %str(search_term))
          unformatted_results = cursor.fetchall()
          list_keys = ['id', 'first_name', 'last_name']
          result = create_result_dict(list_keys, unformatted_results)
          conn.close()
          return jsonify(result)

class Albums(Resource):
     def get(self):
          conn = db_connection()
          cursor = conn.cursor()
          search_term = request.args.get('artist_id')
          cursor.execute("SELECT * FROM albums WHERE artist_id = '%d'" %int(search_term))
          unformatted_results = cursor.fetchall()
          list_keys = ['id', 'artist_id', 'title']
          # result = create_result_dict(list_keys, unformatted_results)
          result = {'data': [dict(zip(tuple(list_keys), album_row)) for album_row in unformatted_results] }
          conn.close()
          return jsonify(result)

class Songs(Resource):
     def get(self):
          conn = db_connection()
          cursor = conn.cursor()
          search_term = request.args.get('album_id')
          print('search_term', search_term)
          cursor.execute("SELECT * FROM songs WHERE album_id = '%d'" %int(search_term))
          unformatted_results = cursor.fetchall()
          list_keys = ['id', 'album_id', 'title']
          # result = create_result_dict(list_keys, unformatted_results)
          result = {'data': [dict(zip(tuple(list_keys), song_row)) for song_row in unformatted_results] }
          conn.close()
          return jsonify(result)
     
def db_connection():
     config = load_config()
     conn = connect(config)
     return conn
def create_result_dict(list_keys, results):
     result = {
          "data": {
               list_keys[0]: results[0][0],
               list_keys[1]: results[0][1],
               list_keys[2]: results[0][2]
          }
     }
     print('result:', result)
     return result

api.add_resource(Artists, '/api/v1/artists') # Artist Route
api.add_resource(Albums, '/api/v1/albums') # Album Route
api.add_resource(Songs, '/api/v1/songs') # Songs Route
api.add_resource(HomePage, '/') # Server Homepage
api.add_resource(ResultsPage, '/results') # Results Page


if __name__ == '__main__':
     run()