# Ocean Disaster Management Platform - SIH 2025

A mobile and web platform that enables citizens, coastal residents, and disaster managers to share real-time information during ocean-related emergencies. This community-driven solution helps identify and track coastal hazards through citizen reports, social media monitoring, and AI-powered analysis.

## 🌊 Project Overview

Our platform addresses the critical need for real-time disaster information sharing during ocean-related emergencies. Citizens can report unusual sea behavior, flooding, or damage through geotagged updates, while officials can validate and track these reports for better emergency response.

### Key Features
- **Citizen Reporting**: Simple interface for posting geotagged text, photos, and videos
- **Real-time Mapping**: Interactive map displaying all reports and official alerts
- **Role-based Access**: Different permissions for citizens, officials, and analysts
- **AI-powered Analysis**: NLP module scanning social media for relevant disaster signals
- **Multi-language Support**: Accessible to diverse coastal communities
- **Offline Capability**: Works even in areas with poor connectivity
- **Scalable Framework**: Extensible to other disaster types

## 🏗️ Project Structure

This is a modern React TypeScript application built with Vite. Here's how the code is organized:

```
SIH-2025/
├── public/                     # Static files (images, icons, etc.)
├── src/                        # Main source code
│   ├── components/             # Reusable UI components
│   │   ├── layout/            # Navigation, headers, footers
│   │   ├── shared/            # Common components (buttons, modals)
│   │   └── ui/                # Basic UI elements (inputs, cards)
│   ├── hooks/                 # Custom React hooks
│   │   ├── use-auth.ts        # Authentication logic
│   │   └── use-theme.ts       # Dark/light theme switching
│   ├── lib/                   # Utility functions and configurations
│   │   ├── api-client.ts      # API communication setup
│   │   ├── constants.ts       # App-wide constants
│   │   └── utils.ts           # Helper functions
│   ├── pages/                 # Main application screens
│   │   ├── DashboardPage.tsx  # Main dashboard view
│   │   ├── LoginPage.tsx      # User login screen
│   │   └── RegisterPage.tsx   # User registration screen
│   ├── routes/                # Navigation and route protection
│   ├── store/                 # State management (user data, app state)
│   ├── styles/                # CSS and styling files
│   ├── types/                 # TypeScript type definitions
│   └── main.tsx              # App entry point
├── Configuration Files:
│   ├── package.json           # Project dependencies and scripts
│   ├── vite.config.ts         # Build tool configuration
│   ├── tailwind.config.js     # Styling framework setup
│   └── tsconfig.json          # TypeScript configuration
```

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite (fast development and building)
- **Styling**: Tailwind CSS (utility-first CSS framework)
- **State Management**: Zustand (lightweight state management)
- **Routing**: React Router (navigation between pages)
- **HTTP Client**: Axios (API communication)
- **Icons**: Lucide React (beautiful, customizable icons)

### Dashboard
- **Statistics Display**: Shows key metrics and analytics
- **Activity Feed**: Real-time updates and recent reports
- **Interactive Elements**: Hover effects and smooth animations

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/pinakkk/SIH-2025.git
   cd SIH-2025
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📱 Future Development Plan

### Phase 1: Core Platform (Current)
- ✅ User authentication system
- ✅ Basic dashboard structure
- ✅ Responsive design foundation
- 🔄 Citizen reporting interface
- 🔄 Interactive mapping system

### Phase 2: Advanced Features
- 🔄 Real-time notifications
- 🔄 AI-powered social media monitoring
- 🔄 Multi-language support
- 🔄 Offline functionality

### Phase 3: Integration & Scale
- 🔄 Government API integration
- 🔄 Advanced analytics dashboard
- 🔄 Mobile app development
- 🔄 Multi-disaster support

## 👥 Team Guidelines

### Code Style
- Use TypeScript for type safety
- Follow the existing component structure
- Add comments for complex logic
- Use Tailwind classes for styling

## 🔧 Environment Setup

### Environment Variables
Create a `.env` file for local configuration:
```
VITE_API_URL=http://localhost:3001
VITE_MAP_API_KEY=your_map_api_key
```


