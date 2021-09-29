# Blog REST API

This is a simple blog api developed using Node.js,Express and MongoDB.<br>
<br>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width=40 height=40/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" width=40 height=40 />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-plain-wordmark.svg" width=40 height=40 />



## Features:

User:

- [x] User Signup
- [x] User Signin
- [x] User Authentication using jsonwebtokens ("/user" mounted)
- [x] Read User Profile by id
- [x] Update User Account
- [x] Delete User Account

---
Blog:

- [x] User needs to be authenticated to access any of ("/blog" mounted)
- [x] Create a new Blog Post
- [x] Read all Blog Posts created + Pagination + Sorted by recent
- [x] Read a specific Blog Post by id
- [x] Update a Blog Post
- [x] Delete a Blog Post

---
- [x] Link the authenticated User with the blogs he created ( referenced using their ObjectId in the User document in an array (one-to-many) )
- [x] Link the blog with creator of it ( referenced using the user's ObjectId (one-to-one) )

## To be done:
- Refactor it and make more layers
- Better Error Handling
- Add new features:
1- Sorting features 2- Comment on a Blog
