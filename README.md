# final_project-chatroom
  ##### Group Members
 [Kevin Nguyen](https://github.com/kevnguy) 
[Michelle Park](https://github.com/tomatomodest) 
[Yonas Adamu](https://github.com/Yonas-A)
 
## Project Description
#### Why is it important or interesting to you?
It is important that people are able to communicate their thoughts through the use of social media platforms. To help facilitate this, our project allows users to create an account and being chatting with one another.

#### Languages/tools/technologies used?
 -  Front end: `css`, `html`, `Angular`
 - Backend: `node.js`, `Express.js`
 - Database: `mongodb`
 - `moment.js` for date formatting 
 - `jsonwebtoken` for user authentication 
 - `bcrypt` for salting and hashing passwords

  
## Installation
- Go to the directory for this project and run `npm install`.
- Current configuration for database is local. This requires the installation of mongoDB server an creation of a new database. Afterwards, start the mongo instance with `mongod`
- then run `nodemon server.js` and `ng serve --open` in parallel terminal.

## Usage/Screenshots
Best compatibility in chrome browser
On the sign up page, enter your name, email, username, password and click submit
- You are now able to see the list of current chatrooms. You can create a room and enjoy messaging your friends.
---
### Sign up page
![Signup](/images/signup.png)

### Login page
![Login](/images/Login.png)

### Room list page
![Rooms page](/images/roomlist.png)

### Chatroom
![chatroom](/images/chatroom.png)

### Profile
![profile](/images/Profile.png)
