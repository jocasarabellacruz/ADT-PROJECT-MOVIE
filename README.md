# Movie-Site
A Movie Site

## Prerequisites
- Node.js
- Composer 
- XAMPP

## Setup
1. Clone the repository
2. Backend Setup:
   - Place the backend folder in your XAMPP htdocs directory
   - Run `composer install` in the backend directory
   - Create a `.env` file in the backend directory with your TMDB API key:
     ```
     TMDB_API_KEY=your_api_key_here
     ```
   - Start XAMPP Apache and MySQL services
   - The database will be automatically created on first run

3. Frontend Setup:
   - Navigate to the frontend directory
   - Run `npm install`
   - Run `npm start` to start the development server

## API Endpoints

### Authentication
- **POST /login**
  - Login user
  - Body: `{ email: string, password: string }`

- **POST /register**
  - Register new user
  - Body: `{ name: string, email: string, password: string, conf_pass: string }`

### Movies
- **GET /get_movies**
  - Get all movies

- **GET /get_featured**
  - Get featured movies

- **GET /get_movie**
  - Get single movie details
  - Query: `?movieId=number`

- **POST /add_movie**
  - Add new movie
  - Body: Movie details including cast, photos, and videos

- **PUT /update_movie**
  - Update existing movie
  - Query: `?movieId=number`
  - Body: Updated movie details

- **DELETE /delete_movie**
  - Delete a movie
  - Query: `?movieId=number`

### Search
- **GET /admin_search**
  - Search movies in TMDB database
  - Query: `?query=string`

- **POST /search_movie**
  - Search local movie database
  - Body: `{ search: string }`

### Admin
- **GET /admin_edit**
  - Get movie details for editing
  - Query: `?tmbd_id=number`

### User
- **GET /get_user**
  - Get current user details

### Favorites
- **GET /get_favorite**
  - Get user's favorite movies
  - Query: `?userId=number`

- **POST /add_favorite**
  - Add movie to favorites
  - Body: `{ movieId: number, userId: number }`

- **DELETE /remove_favorite**
  - Remove movie from favorites
  - Query: `?movieId=number&userId=number`