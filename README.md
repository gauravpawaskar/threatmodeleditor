# Threat Model Editing utility

This project is to help create threat models in table format and push the threat model in github repository and fetch it back for easy editing

## How to run

To run the tool you can run following commands

`cd frontend`

`npm run build`

Go back to project root directory

`docker image build -t threatmodel .`

Generate a personal access token on github to update threat model to GitHub repository

`docker run -p 5000:5000 -e GIT_TOKEN=<your personal access token> threatmodel`

Navigate to [http://localhost:5000/](http://localhost:5000/)

## How to start local development

### Run frontend

`cd frontend`

`npm start`

### Run Backend

`cd backend`

`python -m venv ./virtual`

`source virtual/bin/activate`

`export ENV=dev`

`export GIT_TOKEN=<your personal access token>`

`python main.py`

Navigate to Navigate to [http://localhost:3000/](http://localhost:3000/)
