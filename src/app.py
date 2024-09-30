import os
from flask import Flask, request, jsonify
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from models import db
from routes import api
from dotenv import load_dotenv

load_dotenv()

path = os.path.abspath("instance")

app = Flask(__name__, instance_path=path)
app.config['DEBUG'] = True 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')

db.init_app(app)
Migrate(app, db)
jwt = JWTManager(app)
CORS(app)

app.register_blueprint(api, url_prefix="/api")

@app.route('/')
def main():
    return jsonify({"msg": "Server funcionando correctamente"}), 200

if __name__ == '__main__':
    app.run()