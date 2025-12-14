# Library Management System

A full-stack library management application built with Spring Boot backend and React frontend.

## Project Structure

```
project/
├── library/              # Spring Boot Backend
│   ├── src/
│   ├── pom.xml
│   └── ...
├── frontend/            # React Frontend (Vite)
│   ├── src/
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Features

- User Authentication (Login/Signup)
- Role-based Access Control (Admin/User)
- Book Management (Create, Read, Update, Delete)
- Search Books by Publication Year
- View Book Details (Genre, Shelf Location, etc.)
- Responsive Design

## Technology Stack

### Backend
- **Framework:** Spring Boot 3.5.7
- **Language:** Java 17
- **Database:** MongoDB Atlas
- **Security:** JWT (JSON Web Tokens)
- **Build Tool:** Maven

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Styling:** CSS3

## Setup Instructions

### Prerequisites

- Java 17 or higher (for backend)
- Node.js 16+ and npm (for frontend)
- MongoDB Atlas account with active database
- Git (optional)

### Backend Setup

1. Navigate to the library directory:
   ```bash
   cd library
   ```

2. Make the Maven wrapper executable (Linux/Mac):
   ```bash
   chmod +x mvnw
   ```

3. Build the project:
   ```bash
   ./mvnw clean package -DskipTests
   ```

4. Run the backend:
   ```bash
   ./mvnw spring-boot:run
   ```

   Or after building, run the JAR file:
   ```bash
   java -jar target/library-0.0.1-SNAPSHOT.jar
   ```

   The backend will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`

### MongoDB Setup

See [MONGODB_SETUP.md](./MONGODB_SETUP.md) for detailed instructions on setting up the database and sample data.

**Quick Setup:**
1. Access MongoDB Atlas dashboard
2. Connect to your `book_db` database
3. Run the setup commands from MONGODB_SETUP.md
4. Use the demo credentials to test the application

## Demo Credentials

### Admin User
- **Username:** admin
- **Password:** admin123
- **Role:** Can create, edit, and delete books

### Regular User
- **Username:** user1
- **Password:** user123
- **Role:** Can only view books

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/signin` - Login and get JWT token

### Books (Protected Routes)
- `GET /api/books` - Get all books (USER, ADMIN)
- `POST /api/books` - Create a new book (ADMIN only)
- `GET /api/books/{id}` - Get book by ID (USER, ADMIN)
- `PUT /api/books/{id}` - Update book (ADMIN only)
- `DELETE /api/books/{id}` - Delete book (ADMIN only)
- `GET /api/books/year/{year}` - Get books by publication year (USER, ADMIN)
- `GET /api/books/{id}/genre` - Get genre of a book (USER, ADMIN)
- `DELETE /api/books/year/{year}` - Delete books by year (ADMIN only)

## Running Both Applications

### Option 1: Separate Terminals

**Terminal 1 - Backend:**
```bash
cd library
./mvnw spring-boot:run
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Option 2: Using Concurrent Commands

From the project root:
```bash
npm install -g concurrently
concurrently "cd library && ./mvnw spring-boot:run" "cd frontend && npm run dev"
```

## Building for Production

### Backend
```bash
cd library
./mvnw clean package
# JAR file will be at target/library-0.0.1-SNAPSHOT.jar
```

### Frontend
```bash
cd frontend
npm run build
# Production-ready files will be in dist/
```

## Project Features in Detail

### Authentication & Authorization
- JWT-based authentication
- Role-based access control
- Secure password hashing with BCrypt
- Session management in localStorage

### Book Management
- Full CRUD operations for books
- Metadata: title, author, genre, publication year, shelf location
- Search and filter functionality
- Admin-only management features

### User Interface
- Clean, modern design with gradient background
- Responsive grid layout for books
- Form validation and error handling
- Loading states for async operations
- User profile display

## Troubleshooting

### Backend Won't Start
1. Ensure Java 17+ is installed: `java -version`
2. Check MongoDB connection string in `application.properties`
3. Verify MongoDB Atlas database is active

### Frontend Won't Load
1. Check Node.js version: `node -v`
2. Delete node_modules and reinstall: `npm install`
3. Ensure backend is running on port 8080

### Login Issues
1. Verify sample users are created in MongoDB
2. Check browser console for API errors
3. Ensure CORS is enabled in Spring Boot (it is by default)

### Database Connection Issues
1. Check MongoDB Atlas IP whitelist
2. Verify connection string in `application.properties`
3. Ensure database user has proper permissions

## Environment Variables

### Backend (application.properties)
```properties
spring.data.mongodb.uri=mongodb+srv://user:password@cluster.mongodb.net/book_db
spring.jpa.hibernate.ddl-auto=update
```

### Frontend (Vite)
The frontend automatically proxies API calls to localhost:8080 during development.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Book ratings and reviews
- Advanced search filters
- Book checkout/return system
- User profiles with reading history
- Email notifications
- Admin dashboard with statistics
- Book cover images
- Integration with external book APIs

## License

MIT License - Feel free to use this project for educational purposes.

## Support

For issues or questions, please refer to the backend and frontend documentation or create an issue in the repository.
