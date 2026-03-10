# LocalHub Frontend - Service Provider Platform

A modern, responsive web application built with React and Vite for connecting users with service providers. This platform enables users to browse, book, and manage professional services seamlessly.

## 🚀 Features

- **User Authentication**: Secure login and signup functionality
- **Service Browsing**: Explore available service providers
- **Booking System**: Schedule appointments with service providers
- **User Profiles**: Manage personal information and booking history
- **Responsive Design**: Mobile-first design using Tailwind CSS
- **Fast Performance**: Built with Vite for lightning-fast HMR


## 🛠️ Tech Stack

- **Framework**: React 18.3.1
- **Build Tool**: Vite 6.0.5
- **Routing**: React Router DOM 7.12.0
- **Styling**: Tailwind CSS 4.1.18
- **HTTP Client**: Axios 1.13.2
- **Icons**: Lucide React 0.562.0
- **Linting**: ESLint 9.17.0

## 📦 Installation







VITE_API_URL=http://localhost:5000
```






npm run dev


The application will be available at `http://localhost:5173`



## 📁 Project Structure

```
Frontend/connect/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, fonts, and other assets
│   ├── components/      # Reusable React components
│   │   ├── Footer.jsx   # Application footer
│   │   └── Header.jsx   # Navigation header
│   ├── pages/           # Page components
│   │   ├── Home.jsx     # Landing page
│   │   ├── Login.jsx    # User login page
│   │   ├── Signup.jsx   # User registration page
│   │   ├── Profile.jsx  # User profile page
│   │   ├── Booking.jsx  # Booking management page
│   │   └── Providers.jsx # Service providers listing
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── eslint.config.js     # ESLint configuration
├── vite.config.js       # Vite configuration
├── package.json         # Project dependencies
└── README.md            # Project documentation
```

## 🎨 Available Pages

| Route        | Component | Description                        |
| ------------ | --------- | ---------------------------------- |
| `/`          | Home      | Landing page with service overview |
| `/login`     | Login     | User authentication page           |
| `/signup`    | Signup    | New user registration              |
| `/profile`   | Profile   | User profile management            |
| `/booking`   | Booking   | Service booking interface          |
| `/providers` | Providers | Browse service providers           |



## 🌐 API Integration

This frontend connects to the backend API. Ensure the backend server is running before starting the frontend application. API calls are made using Axios.

Default backend URL: `http://localhost:5000`

