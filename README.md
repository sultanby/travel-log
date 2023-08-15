# travel-log

The Travel Log App is a full-stack web application that allows users to keep track of the places they have traveled. Users can add and view their travel entries, including details like the destination, date, description, and photos. This app is perfect for travel enthusiasts who want to share their adventures and memories with others.


## Features
- Add new travel entries: Users can add details about the places they have traveled to, including destination, date, description, and photos.
- View travel entries: Users can view a list of their travel entries, sorted by date.
- User-friendly interface: The app features a clean and intuitive user interface for easy navigation and interaction.

## Technologies Used
- Frontend: HTML, CSS, JavaScript, React.js, Mapbox
- Backend: Node.js, Express.js, MongoDB

## Installation
1. Clone the repository: `git clone https://github.com/sultanby/travel-log.git`
2. Navigate to the project directory: `cd travel-log`
3. Install frontend dependencies: `cd client && npm install`
4. Stall backend dependencies: `cd ../server && npm install`
5. Set up MongoDB database: 
    - Create a MongoDB Atlas account or set up a local MongoDB instance.
    - Configure the .env file in the server directory with your database connection details.
6. Obtain a Mapbox token:
    - Create a Mapbox account and obtain an API token from the Mapbox Dashboard.
    - Configure the .env file in the client directory with your actual Mapbox token.
7. Start the server: `npm start` in the `server` directory.
8. Start the frontend: `npm start` in the `client` directory.

## Usage
- Add new travel entries by providing details and uploading photos.
- View your travel entries.
- Explore your travel history.

