# Configure
Copy app/client/config.template.js to app/client/config.default.js and change url to desired endpoint.
Local would be http://127.0.0.1:8012 to send to nginx that we will run with docker-compose

# Build images
Run build.sh in app and nginx

# Run
docker-compose up