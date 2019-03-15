# Moonrise Technical QA Exercise

## Directions
The application in this repo is a very simple PHP json API with a single model and a couple endpoints and a very basic react front end.  We'd like you to demonstrate your QA skills by writing some tests for both the back end and front end components of this application.  We’ve intentionally made the API and frontend very simple, especially when it comes to error handling and validation.  Using any testing tooling you like, write some tests for both the API and Frontend that you think will be most useful in helping to fix and track bugs, and ensure existing functionality going forward.  Be prepared to explain what type of tests you chose and why.  Don’t spend more than 1 hour on writing tests for the API and no more than 1 hour writing tests for the front end.  You can either fork this repository or create a stand alone one to write your tests, just make sure it's publicly available and provide us with the link.

## Installation Instructions
1. As a prerequisite to running this application, you must have PHP > 7.1 and node >= 8.0 installed on your system and be running either a linux or unix shell.
2. Clone down this repository: `git clone https://github.com/MoonriseDev/moonrise-technical-exercise.git`
4. Run the following commands to install all dependencies: 
```
cd moonrise-technical-exercise
npm install
```
5. To start the application, you can run command `npm run dev`  This will use npm library concurrently to run both the PHP API and the react front end
6. The react app will be running locally at http://localhost:3000/ and the API will be running at http://localhost:8080. Make sure you don't have any other web services currently listening on these ports.

## Technologies in use
The API is running on PHP >= 7.1, it was adapted from a very barebones project found on github.  It basically has some very simple routing and is using a SQLite3 database, which can be found at `/api/db/testing.sqllite`.  The main data model is an approximation of the user model in our real application, made a bit simpler with a lot of functionality stripped out as well.  The front end is a basic `create-react-app` skeleton with the `material-ui` component library and routing with `react-router` v4.  Create react app comes with it's preferred built in testing framework `jest` installed and configured, but you can use any testing framework or tools you like.

## Things to consider
While reading through the code and writing your tests, keep some of these in mind:

What existing functionality, if any, is working well enough already?
Are there any areas where the app is working differently than expected?
What types of tests would be good for ensuring existing working behavior?
What types of tests would be good for indentifying and fixing bugs?
Would you use the same testing tools for the front-end and back-end, why or why not?
