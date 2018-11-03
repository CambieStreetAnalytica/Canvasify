# Canvasify
## Authors
Declan Herbertson<br> Albert Yip
## Description
Canvasify is an application designed to engage students and gamify learning that <b>placed 3rd</b> in the <b>UBC Learning Analytics Student API Hackathon</b> Canvasify integrates with the Canvas Student API to get access to course, assignment, grade and discussion information related to the student, and uses that data to generate unlockable acheivements and create an avatar that can gain experience and level up.
The purpose of this is to incentivize positive learning habits such posting helpful messages, asking questions or handing in assignments before the deadline. 

## Proposed Features
<b>Milestones</b>: Unlockable acheivements for performing tasks such as posting in a classes discussion, receiving a certain amount of upvotes, or getting a certain grade on a quiz or test.<br>
<b>Submission Stream</b>: A sidebar containing upcoming and submitted/graded assignments, quizes and tests. upon submission of an assignment or receival of marks, the user would be able to collect experience that would level their avatar.<br>
<b>Customization</b>: Users would be able to spend some form of in app currency earned by acheiving Milestones or submitting assignments to cosmetically customize their avatar.

## Implemented Features
<b>Milestones</b>: Acheivements unlockable by posting a certain amount of times in discussion and receiving a certain number of upvotes are implemented.

## Project stack
Angular version 7.0.2 <br>
TypeScript 3.1.1 <br>
Express 6.4.1 <br>
Node 8.1.2 <br>
 
## To launch project
<b>Prerequisites: Angular CLI, Node</b>
1. log in to Canvas and generate an access token
2. create an enviromental variable called CANVAS_TOKEN and set it to your access token
2. navigate to the server directory and enter either ```npm start``` or ```node server.js```. 
3. navigate to the web directory and enter ```ng serve``` then go to ```http://localhost:4200/``` in a browser <br>



