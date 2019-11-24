# Flask chat app

## Start 

docker build -t flask-chat-app:latest .

docker run -d -p 5002:5000 flask-chat-app

open localhost:5002

## Stop

docker ps -a

docker stop <name>
