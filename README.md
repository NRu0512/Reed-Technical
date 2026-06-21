# Reed-Technical
This is a test automation project the tests the UI of the website https://www.cheapflights.com.au/, specifically the Search functionality, and the endpoints in https://restful-booker.herokuapp.com/apidoc/index.html#api-Booking. This makes use of NodeJS, WebdriverIO, Mocha, and Chai. This is written in Javascript.

This project is created according to the specifications of the technical assessment provided by Reed ([project-specifications.pdf](https://github.com/user-attachments/files/29181197/project-specifications.pdf)).

# Setup
– Install NodeJs  
– Clone the repository  
– Run `npm install` or `npm i`  

# Running the tests
:warning: Disclaimer:warning:: _when running the UI tests, especially regarding the Search feature, watch the run as it might trigger a CAPTCHA
that you must answer for the automated test to proceed. The timeout has been increased to 45 seconds to give you time to answer it._

– To run all the tests, run the command
`npm run test`  
– To run UI tests only, run the command
`npm run ui-test`  
– To run API tests only, run the command
`npm run api-test`  
