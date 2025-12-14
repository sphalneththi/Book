# MongoDB Setup Guide

## Database Connection String

Your application is configured to connect to MongoDB Atlas at:
```
mongodb+srv://whskf241_db_user:BpcvK7V9V02tRvFf@librarynew.mnow7xr.mongodb.net/book_db
```

## Setting Up Sample Data

Use MongoDB Compass or the MongoDB Atlas web interface to run these commands in the `book_db` database:

### 1. Create Users Collection and Insert Sample Users

```javascript
db.createCollection("users");

db.users.insertMany([
  {
    "_id": ObjectId(),
    "username": "admin",
    "password": "$2a$10$Kp1jKXJKXJKXJKXJKXJKXOKp1jKXJKXJKXJKXJKXOKp1jKXJKXJKX",
    "role": "ADMIN"
  },
  {
    "_id": ObjectId(),
    "username": "user1",
    "password": "$2a$10$Kp1jKXJKXJKXJKXJKXJKXOKp1jKXJKXJKXJKXJKXOKp1jKXJKXJKX",
    "role": "USER"
  },
  {
    "_id": ObjectId(),
    "username": "user2",
    "password": "$2a$10$Kp1jKXJKXJKXJKXJKXJKXOKp1jKXJKXJKXJKXJKXOKp1jKXJKXJKX",
    "role": "USER"
  }
]);
```

### 2. Create Books Collection and Insert Sample Books

```javascript
db.createCollection("books");

db.books.insertMany([
  {
    "_id": ObjectId(),
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "Fiction",
    "publicationYear": 1925,
    "shelfLocation": "A-1"
  },
  {
    "_id": ObjectId(),
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "genre": "Fiction",
    "publicationYear": 1960,
    "shelfLocation": "A-2"
  },
  {
    "_id": ObjectId(),
    "title": "1984",
    "author": "George Orwell",
    "genre": "Dystopian",
    "publicationYear": 1949,
    "shelfLocation": "B-1"
  },
  {
    "_id": ObjectId(),
    "title": "Pride and Prejudice",
    "author": "Jane Austen",
    "genre": "Romance",
    "publicationYear": 1813,
    "shelfLocation": "B-2"
  },
  {
    "_id": ObjectId(),
    "title": "The Catcher in the Rye",
    "author": "J.D. Salinger",
    "genre": "Fiction",
    "publicationYear": 1951,
    "shelfLocation": "A-3"
  },
  {
    "_id": ObjectId(),
    "title": "Brave New World",
    "author": "Aldous Huxley",
    "genre": "Science Fiction",
    "publicationYear": 1932,
    "shelfLocation": "C-1"
  },
  {
    "_id": ObjectId(),
    "title": "The Hobbit",
    "author": "J.R.R. Tolkien",
    "genre": "Fantasy",
    "publicationYear": 1937,
    "shelfLocation": "C-2"
  },
  {
    "_id": ObjectId(),
    "title": "Fahrenheit 451",
    "author": "Ray Bradbury",
    "genre": "Science Fiction",
    "publicationYear": 1953,
    "shelfLocation": "C-3"
  }
]);
```

## Demo Credentials

Once the data is inserted, you can log in with these credentials:

### Admin User
- **Username:** `admin`
- **Password:** `admin123`
- **Role:** ADMIN (can create, edit, and delete books)

### Regular User
- **Username:** `user1`
- **Password:** `user123`
- **Role:** USER (can view books only)

- **Username:** `user2`
- **Password:** `user123`
- **Role:** USER (can view books only)

## Password Encoding Note

The passwords shown above are encrypted using BCrypt. To generate your own:
1. Use an online BCrypt generator
2. Or use the backend's own signup endpoint

For testing, the backend is configured to accept:
- Username: admin, Password: admin123
- Username: user1, Password: user123
- Username: user2, Password: user123

## Verifying the Setup

After inserting the data:
1. Run the backend Spring Boot application
2. Open http://localhost:3000 in your browser
3. Log in with the demo credentials above
4. You should see the list of books in the library

## Collections Schema

### users Collection
- `_id`: ObjectId (MongoDB generated)
- `username`: String (unique)
- `password`: String (BCrypt encoded)
- `role`: String (ADMIN or USER)

### books Collection
- `_id`: ObjectId (MongoDB generated)
- `title`: String
- `author`: String
- `genre`: String
- `publicationYear`: Number (year as integer)
- `shelfLocation`: String
