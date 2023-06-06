import json
import os
import shutil


def get_threatmodel_file(repo_dir):
    return os.path.abspath(os.getcwd())+"/"+repo_dir+"/threatmodel.json"

def read_threat_model_from_git(repo_dir):
    f = open(get_threatmodel_file(repo_dir))
    data = json.load(f)
    f.close()
    clean_dir(repo_dir)
    return data["threatmodel"]

def update_threat_model_to_git(repo_dir, threat_model):
    f = open(get_threatmodel_file(repo_dir), "w")
    f.write(json.dumps({"threatmodel": threat_model}))
    f.close()

def clean_dir(repo_path):
    shutil.rmtree(repo_path)