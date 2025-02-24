# LungeLife Workout Tracker

## Installation and Run

`npm run dev`

## Frontend (React) Features

### 1. **Progress Tracking:**
   - Added a chart to show exercise progress over time.
   - Created a history table to display the last 5 records for each exercise.

### 2. **Exercise Management:**
   - Developed functionality to add, delete, and update exercise records, including a modal for adding new exercises.
   - Implemented a dynamic form to manage multiple sets and exercises.
   - Added a timer for tracking exercise duration.
   - Displayed detailed exercise information on individual exercise pages.
   - Integrated a session system to manage workout sessions.

### 3. **UI and Styling:**
   - Improved table and button styles for better UX.
   - Added icons and custom logo for branding (LungeLife).
   - Styled components like header, footer, and exercise details for consistency across the app.
   - **Hover effect for workout templates:** When hovering over a workout template, the corresponding image of the template appears, enhancing the visual experience.

### 4. **Routing:**
   - Set up routes for signing in, viewing exercise details, and managing workouts.
   - Implemented a navigation bar and links for smooth app navigation.

### 5. **Chart Integration:**
   - Installed and integrated Chart.js for visualizing workout progress.

---

## Backend (Node.js/Express) Features

### 1. **Workout and Template Management:**
   - Created routes for adding, updating, and fetching workout templates.
   - Implemented a function to retrieve workout data by template ID.
   - Added functionality to post and retrieve progress data for workouts.

### 2. **Database and Migrations:**
   - Defined database migrations for creating, updating, and dropping tables for users, exercises, and progress.
   - Implemented seeders to populate tables with JSON data for users and exercises.
   - Wrote routes to handle user data and workout progress tracking.

### 3. **API Endpoints:**
   - Developed RESTful API endpoints for posting and getting user data, exercise progress, and templates.
   - Added error handling to ensure data consistency and correct data types (e.g., converting reps from string to integer).

### 4. **Progress Tracking:**
   - Added a progress chart and functionality for storing and retrieving exercise progress.
   - Implemented routes for updating and retrieving progress data related to specific exercises and sessions.



