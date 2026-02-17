# IPM Frontend - Service Provider Platform

A modern, responsive web application built with React and Vite for connecting users with service providers. This platform enables users to browse, book, and manage professional services seamlessly.

## 🚀 Features

- **User Authentication**: Secure login and signup functionality
- **Service Browsing**: Explore available service providers
- **Booking System**: Schedule appointments with service providers
- **User Profiles**: Manage personal information and booking history
- **Responsive Design**: Mobile-first design using Tailwind CSS
- **Fast Performance**: Built with Vite for lightning-fast HMR

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (v9 or higher)
- Backend server running (see Backend/README.md)

## 🛠️ Tech Stack

- **Framework**: React 18.3.1
- **Build Tool**: Vite 6.0.5
- **Routing**: React Router DOM 7.12.0
- **Styling**: Tailwind CSS 4.1.18
- **HTTP Client**: Axios 1.13.2
- **Icons**: Lucide React 0.562.0
- **Linting**: ESLint 9.17.0

## 📦 Installation

1. Navigate to the frontend directory:

```bash
cd Frontend/connect
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root of the frontend directory (if needed):

```env
VITE_API_URL=http://localhost:5000
```

## 🚀 Running the Application

### Development Mode

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

Create an optimized production build:

```bash
npm run build
```

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

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

## 🔧 Configuration

### Vite Configuration

The Vite configuration is located in [vite.config.js](vite.config.js) and includes React plugin setup.

### ESLint Configuration

Linting rules are defined in [eslint.config.js](eslint.config.js) for maintaining code quality.

### Tailwind CSS

Tailwind CSS is configured with the Vite plugin for optimal performance and modern styling capabilities.

## 🌐 API Integration

This frontend connects to the backend API. Ensure the backend server is running before starting the frontend application. API calls are made using Axios.

Default backend URL: `http://localhost:5000`

## 🤝 Contributing

1. Create a new branch for your feature
2. Make your changes
3. Run linting: `npm run lint`
4. Test your changes thoroughly
5. Submit a pull request

## 📝 Development Guidelines

- Follow React best practices and hooks conventions
- Use functional components with hooks
- Maintain component reusability
- Keep components small and focused
- Use Tailwind CSS for styling
- Ensure responsive design for all screen sizes
- Write clean, readable code with proper comments

## 🐛 Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will automatically try the next available port.

### Module Not Found

Run `npm install` to ensure all dependencies are installed.

### Backend Connection Issues

Verify the backend server is running and the API URL is correctly configured.

## 📄 License

This project is part of the IPM (Internal Project Management) system.

## 📞 Support

For issues or questions, please contact the development team or create an issue in the project repository.

---

Built with ❤️ using React + Vite
