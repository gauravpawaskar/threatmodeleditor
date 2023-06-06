from git import Repo
import random
import string
import threatmodel_utils

def clone_repo(git_url):
    repo_dir = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(8))
    Repo.clone_from(git_url, repo_dir)
    return repo_dir

def push_to_git(repo_dir, threat_model):
    branch_name = "test1"
    repo = Repo(repo_dir)
    origin = repo.remote(name="origin")
    repo.head.reference = repo.create_head(branch_name)
    repo.head.reference.set_tracking_branch(origin.refs.master).checkout()
    threatmodel_utils.update_threat_model_to_git(repo_dir, threat_model)
    repo.index.add([threatmodel_utils.get_threatmodel_file(repo_dir)])
    repo.index.commit("your commit message")
    push_res = origin.push(branch_name)[0]
    threatmodel_utils.clean_dir(repo_dir)
    print(push_res.summary)
