import os

import github
import threatmodel_utils
from flask import Flask, jsonify, request, send_from_directory

app = Flask(__name__, static_folder='./frontend/')

# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route('/gettm', methods=['POST'])
def gettm():
    git_details = request.get_json()
    repo_dir = github.clone_repo(git_details['git_url'])
    threat_model = threatmodel_utils.read_threat_model_from_git(repo_dir)
    response = jsonify(threat_model)
    return response
    
@app.route('/pushtm', methods=['POST'])
def pushtm():
    git_details = request.get_json()
    repo_dir = github.clone_repo(git_details['git_url'])
    github.push_to_git(repo_dir, git_details['threats'])
    response = jsonify({"msg":"ok"})
    return response

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')