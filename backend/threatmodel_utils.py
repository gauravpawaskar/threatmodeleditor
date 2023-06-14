import json
import os
import shutil
import datetime


def get_threatmodel_file(repo_dir):
    return os.path.abspath(os.getcwd())+"/"+repo_dir+"/threatmodel.json"


def read_threat_model_from_git(repo_dir):
    try:
        f = open(get_threatmodel_file(repo_dir))
        data = json.load(f)
        f.close()
    except FileNotFoundError:
        data = {"threatmodel": []}
    clean_dir(repo_dir)
    return data["threatmodel"]


def update_threat_model_to_git(repo_dir, threat_model):
    f = open(get_threatmodel_file(repo_dir), "w")
    f.write(json.dumps({"threatmodel": threat_model}))
    f.close()


def clean_dir(repo_path):
    shutil.rmtree(repo_path)


def get_name_with_current_time():
    current_time = datetime.datetime.now()
    name = str(current_time.year) + '-' + str(current_time.month) + '-' + str(current_time.day) + \
        '-' + str(current_time.hour) + '-' + \
        str(current_time.minute) + '-' + str(current_time.second)
    return name
