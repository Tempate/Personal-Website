## Projects

In this repository I intend to keep track of some algorithms I've been learning throw the past year.
The code consists on a Django application that runs the algorithms, written in [p5.js](https://p5js.org/) (Processing) as static files.

### Running the code

#### Install dependencies

1. Create a virtual environment
```
python -m venv venv
```

2. Activate the virtual environment
```
source venv/bin/activate
```

3. Install the requirements
```
pip install -r requirements.txt
```

#### Set up a secret key

4. Generate a secret key for Django
```
python gen_secret_key.py
```

5. Export the secret as an environment variable
```
export DJANGO_SECRET_KEY='your-secret-key'
```

#### Launch the site

###### Production

Use this approach when launching the site in production. It is faster, more scalable, and designed to handle production loads.

```
gunicorn --bind 0.0.0.0:8000 projects.wsgi:application
```

###### Development

Use this approach when launching the site locally in development. It is simpler and automatically reloads the application when the code changes.

```
python manage.py runserver 0.0.0.0:8080
```
