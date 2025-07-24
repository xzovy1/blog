# Backend

This app is for a personal blog. The backend will only pass JSON to be handled by the frontend which will be running react in both the author/ and visitor/ folders.

- authentication will be handled by JWT's. (use passport-jwt or npm jsonwebtoken ?)
  - use passport jwt, so that

The backend will store:

1. posts by author. being able to edit the post is only accessible by the author.

2. comments by anyone. these can be posted with a username.
   - comments have name of person who posted, body, and date.

## Routes

the focus will be on having protected routes that the visitors cannot access.
Visitors to the blog site can only Create comments. all other CRUD capabilities will be controlled by the Author.

### Visitor/Author Routes

- GET `/api/posts`: all posts.
- GET `/api/posts/:postid`: a specific post
- GET `/api/posts/:postid/comments`: all comments associated with a specific post
- POST `/api/posts/postid/comments`: creates a new comment on a post
- GET `/api/posts/:postid/:commentid`: specific comment associated with a specific post
- POST `/api/posts/:postid/:commentid`: creates reply to a comment

### Author-specific Routes

- POST `/api/posts`: creates a new post
- PUT `/api/posts/:postid`: updates a post
- DELETE `/api/posts/:postid`: deletes a post
- PUT `/api/posts/:commentid`: updates a comment (used for moderating comments)
- DELETE `/api/posts/:commentid`: deletes a comment (used for moderating comments)

## Models

User:

- only one author.
- the author can have multiple posts. (1-m)

Post:

- Published date
- Published status (only visible to author)
- body
- title
- comments

Comment:

- What blog post its associated with
- the name of the person who posted the comment
- the date of the comment.
- consider having comments being replied to other comments.

# Authentication

- the author login will have authentication, so for that reason I'll implement passportjs and passport-jwt

## To do:
