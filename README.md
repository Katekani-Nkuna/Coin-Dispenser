# Coin-Dispenser

# I. Option to access the application on the internet
The frontend has been hosted on aws s3 bucket and can be accessed on the url http://mobisite.com.s3-website.af-south-1.amazonaws.com/
The backend has been hosted on a private aws ec2 instance.
This is a much easier way to access the solution


# II. Option to run the application locally
1. Run the backend in the folder "spring-app" by executing the command "mvn spring-boot:run"
2. The backend wll be running on localhost:8081
3. Before running frontend download and install node JS and the material ui component (npm install @mui/material)
4. Run the front-end app in the folder "react-app" by executing the command npm start ()
5. the app wll be running on localhost:3000
6. You will have to create username and password once the app is loaded on localhost:3000
7. After creating credentials, login
8. enter amount of change required and the list of coins available comma seperated ie 1,2,5,10 
