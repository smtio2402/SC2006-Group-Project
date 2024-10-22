# ParkIT Frontend

The frontend of ParkIT is built with React.js and Tailwind CSS, providing a responsive and intuitive user interface for parking management.

## Tech Stack

- React.js
- Tailwind CSS
- Axios for API requests
- React Router for navigation
- React Query for state management
- Google Maps React for map integration

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   ├── contexts/
│   └── App.js
└── package.json
```

## Available Scripts

```bash
# Install dependencies
npm install

# Start development server
npm start
```

## Environment Variables

Create a `.env` file in frontend directories. The following variables are required:

### Frontend (.env)

```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## Environment Setup

1. Create a `.env` file in the frontend root directory
2. Add required environment variables (see Environment Variables section above)
3. Install dependencies using `npm install`

## Coding Standards

- Use ESLint for code linting
- Follow Prettier configuration for code formatting
- Follow React best practices and guidelines
- Use Tailwind CSS utility classes for styling

---
