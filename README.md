# Social Media Backend REST API
This repository contains the backend REST API for a social media application built with Express and MongoDB.

## Features
- User Authentication (Sign Up, Log In, Logout)
- Post Creation, Retrieval, Update, and Deletion
- User Profile Management

## Prerequisites
- Node.js and npm installed on your machine
- MongoDB installed and running

## Getting Started
1. Clone the repository:
```
https://github.com/Richmond-Andoh/social-media-backend-rest-api.git

cd  social-media-backend-rest-api

```
2. Install dependencies using npm:
```
npm install

```
3. Set up environment variables:
```
PORT=5900

MONGODB_URI=mongodb+srv://richy:<password>@mycluster.61numx5.mongodb.net/

make sure to replace with your connection string from mongoDB
```

4. Start the Server
```
npm start

The server will on 'http://localhost:5900/' by default.
```

## API Endpoints
### User Authentication:

- POST /api/user/register - Create a new user account.
- POST /api/user/login - Log in with existing credentials.
- POST /api/logout - Log out the currently authenticated user.

### User Profile:

- GET /api/user/:userId - Get user details by ID.
- PUT /api/user/update/:userId - Update user details.
- DELETE /api/user/:userId - Delete a user account.

### Post Management:

- GET /api/blog/ - Get all blog posts (public).
- GET /api/blog/:postId - Get a specific post by ID.
- GET /api/blog/user/:userId - Get all posts by user ID.
- POST /api/blog/add - Create a new post.
- PUT /api/blog/update/:postId - Update an existing post.
- DELETE /api/blog/:postId - Delete a post.

## Testing the API

### Using Postman:

- Import the provided SocialMediaBackend.postman_collection.json file into Postman.
- Run the collection to test various API endpoints.
- Curl Commands:

Sample curl commands to test user register and login:

```
# User Register

curl -X POST -H "Content-Type: application/json" -d '{"username": "john_doe", "email": "john.doe@example.com", "password": "securepassword"}' http://localhost:3000/api/user/register

# User Login

curl -X POST -H "Content-Type: application/json" -d '{"email": "john.doe@example.com", "password": "securepassword"}' http://localhost:3000/api/user/login

```

## Contributing
 Feel free to contribute by opening issues and submitting pull requests.

## License
This project is licensed under the MIT License.