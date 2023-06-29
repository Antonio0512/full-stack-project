# Music Library
This app is a Music LIBRARY (not player) where users can add songs and albums. They can like, dislike and comment under the songs. Users can register and login, edit and delete their profiles. 

P.S: This project does not have a player and users cannot listen to music here! They can only find new songs and albums to listen to uploaded by other users.

## Installation
To get started with the project, follow the instructions below:

### Prerequisites

- Node.js: [Download and install Node.js](https://nodejs.org/)
- Python: [Download and install Python](https://www.python.org/)

### Clone the Repository

```bash
git clone https://github.com/Antonio0512/full-stack-project.git
cd full-stack-project/
```

## Frontend (React) Installation
1. Navigate to the project's frontend directory:

```bash
cd frontend/
```

2. Install the necessary dependencies by running:

```bash
npm install
```

## Backend (Python) Installation
1. Move to the project's backend directory:

```bash
cd ../backend/
```

2. Create and activate a virtual environment (optional but recommended):

```bash
python3 -m venv venv
source venv/bin/activate
```

3. Install the required Python packages by executing:

```bash
pip install -r requirements.txt
```

## Database Configuration

Create a PostgreSQL database for the project. You should have it installed locally or use docker image.

1.In the backend directory, create a .env file and add the following environment variables:

```bash
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
SECRET_KEY=your_secret_key
```

Replace username, password, and database_name with your PostgreSQL credentials. Generate a secure your_secret_key for the Django secret key.

## Start the Application

1. In the backend directory, run the following command to apply database migrations:

```bash
python manage.py migrate
```


2. Start the backend server:
```bash
python manage.py runserver
```

3. In a separate terminal, navigate to the frontend directory and start the React development server:

```bash
cd ../frontend/
npm start
```

The React frontend will be accessible at http://localhost:3000, and the Django backend will run on http://localhost:8000.

That's it! You have successfully installed and set up the Music Library project on your local machine. Now you can start using the app to add songs, albums, and interact with other users.
