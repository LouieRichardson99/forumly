# Forumly

![Forumly](https://user-images.githubusercontent.com/60019261/115260125-5fa0bc80-a12a-11eb-9ef1-7385bd4d413f.png)

Forumly is a forum style web application which uses Next.js, CSS, Node.js, MySQL on AWS.

It is hosted on Vercel due to the great compatibility with Next.js.

This app uses the React Context API to store data such as the user info (username, user id) and uses Redux Toolkit to store the functions needed to re-fetch data such as the post data.
This is to prevent having to 'prop drill' just to pass down a function to refresh posts data.

This was a really fun project to work on because I wanted to work with Node.js to develop efficient API endpoints whilst creating CRUD functionality. This led to improving my knowledge about how middleware works in API routes, such as validating the user before allowing to proceed with a API request.

## Features

- User auth with sessions.
- Create, Read, Update, Delete posts.
- Comment on posts.
- Profile page with user information.
- Delete account.

### User Authorisation and Authentication

User auth is achieved by storing usernames and passwords in the MySQL database using bcrypt hashing. The user sessions are handled via Next Iron Session. This is a great package for storing user data in a session so the user doesn't have to sign in again once they have shut down their browser.
