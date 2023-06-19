FROM python:3.9

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

# Define the command to run the Django development server
CMD bash -c "sleep 5 && python manage.py runserver 0.0.0.0:8000"
