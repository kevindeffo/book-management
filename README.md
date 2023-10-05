
// README.md
# Book Management 
### Introduction
Book management is a REST API created with expressJs and MongoDb for CODEVIGOR's junior backend developer recruitment test.
###  Features
* Users can login to their accounts
* Authenticated users can access all books as well as create a new book, edit and delete a book.
### Installation Guide
* Clone this repository [here](https://github.com/kevindeffo/book-management.git).
* the main branch is the one that contains the entire project, but each test question was performed on a different branch.
* Run npm install to install all dependencies
* You can use the default database registered in the project or use your own (the project uses a mongodb database).
### Usage
* Run npm start to start the application.

### API Endpoints
| HTTP Verbs | Endpoints        | Action                                |
|------------|------------------|---------------------------------------|
| POST       | /api/user/signin | To login an existing user account     |
| POST       | /api/save        | To create a new book                  |
| GET        | /api/:id         | To retrieve one book by ID            |
| GET        | /api/            | To retrieve all books on the platform |
| PUT        | /api/:id         | To edit a single book                 |
| DELETE     | /api/:id         | To delete a single book               |

### ACCESS

To connect to the API, use the following information
- username: kevindeffo
- password: 12345

