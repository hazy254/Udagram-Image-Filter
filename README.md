# Udagram Image Filter

This is a simple Node-Express application which runs a simple script to process images.

## Deployment
The application is hosted on AWS and deployed using Elastic Beanstalk.
The script receives an image, processes it and sends a response to the client with the procesed image. The files hosted on the server side are then deleted after a timeout period of 15 seconds.

