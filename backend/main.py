import os

import github
import threatmodel_utils
from flask import Flask, jsonify, request, send_from_directory

app = Flask(__name__, static_folder='./frontend/')

def add_dev_headers(response):
    response.headers.add("Access-Control-Allow-Headers", "Content-Type")
    response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
    return response

def response_for_options():
    response = jsonify({})
    if os.environ.get('ENV') == 'dev':
        add_dev_headers(response)
    return response

# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route('/gettm', methods=['POST', 'OPTIONS'])
def gettm():
    if request.method == 'OPTIONS':
        return response_for_options()
    else:
        git_details = request.get_json()
        repo_dir = github.clone_repo(git_details['git_url'])
        if repo_dir == None:
            response = jsonify({"error": "error in cloning"})
        else:
            threat_model = threatmodel_utils.read_threat_model_from_git(repo_dir)
            response = jsonify(threat_model)
        if os.environ.get('ENV') == 'dev':
            add_dev_headers(response)
        return response
    
@app.route('/pushtm', methods=['POST', 'OPTIONS'])
def pushtm():
    if request.method == 'OPTIONS':
        return response_for_options()
    else:
        git_details = request.get_json()
        repo_dir = github.clone_repo(git_details['git_url'])
        if repo_dir == None:
            response = jsonify({"error": "error in cloning"})
        else:
            push_res = github.push_to_git(repo_dir, git_details['threats'])
            if push_res == None:
                response = jsonify({"error": "error in pushing branch"})
            else:
                response = jsonify({"msg":"ok"})
        if os.environ.get('ENV') == 'dev':
            add_dev_headers(response)
        return response

if __name__ == "__main__":
    isDev = False
    if os.environ.get('ENV') == 'dev':
        isDev = True
    app.run(debug=isDev, host='0.0.0.0')