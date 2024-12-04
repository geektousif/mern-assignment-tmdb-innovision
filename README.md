# Movie Search App

This project is a movie search web application built using the MERN stack. It fetches movie data from The Movie Database (TMDb) API and displays it in a user-friendly interface with features like trailers, cast lists, and more.

---

## Features

- **Search Movies**: Search for movies by name.
- **Movie Cards**: Each card shows the poster, release date, and a truncated description.
- **Trailers**: Watch trailers for movies (if available).
- **Cast Details**: View cast information in a scrollable modal.

---

## Prerequisites

- **Node.js**: Version 16 or above.
- **TMDb API Key**: Obtain your API key from [TMDb](https://www.themoviedb.org/).

---

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/movie-search-app.git
   cd movie-search-app
   ```
   
2. Install dependencies for both the frontend and backend:

   ```bash
   # Frontend
   cd frontend
   npm install
    
   # Backend
   cd backend
   npm install
   ```
   
3. Configure your environment variables:
   - Create a .env file in the backend directory with the following:
       ```
       PORT=3000
       TMDB_API_KEY=your_tmdb_api_key
       NODE_ENV=development
       FRONTEND_ORIGIN_URL=http://localhost:5173
       ```

    - Create a .env file in the frontend directory
       ```
       VITE_BACKEND_URL='http://localhost:3000/api'
       ```

4. Start the application:
   - Backend:
     ```
     cd backend
     npm run dev
     ```
   - Backend:
     ```
     cd frontend
     npm run dev
     ```

5. Access the application in your browser at http://localhost:5173.

---

## Technologies Used
  ### Frontend
   - React: Component-based architecture.
   - ShadCN/UI: Pre-styled components.
   - TailwindCSS: Utility-first CSS for styling.
   - Vite: For faster builds and hot reloading.
  ### Backend
   - Express.js: Lightweight API framework.
   - Axios: For HTTP requests.
   - Dotenv: Environment variable management.

---

## Future Improvements
  - Implement pagination for search results.
  - Add unit and integration tests.
  - Improve accessibility with better ARIA roles.
  - .. (much more) .. 
      
