# React

A modern React-based MDRRMO Operations Hub utilizing the latest frontend technologies, Supabase backend, and tools for building responsive emergency management web applications.

## 🚀 Features

- **React 18** - React version with improved rendering and concurrent features
- **Vite** - Lightning-fast build tool and development server
- **Supabase** - Backend-as-a-Service with PostgreSQL database, authentication, and real-time subscriptions
- **Redux Toolkit** - State management with simplified Redux setup
- **TailwindCSS** - Utility-first CSS framework with extensive customization
- **React Router v6** - Declarative routing for React applications
- **Data Visualization** - Integrated D3.js and Recharts for powerful data visualization
- **Form Management** - React Hook Form for efficient form handling
- **Animation** - Framer Motion for smooth UI animations
- **Testing** - Jest and React Testing Library setup
- **Database Integration** - Full CRUD operations with Supabase PostgreSQL
- **Authentication** - Secure user authentication and role-based access control
- **Real-time Updates** - Live data synchronization across all connected clients

## 📋 Prerequisites

- Node.js (v14.x or higher)
- npm or yarn
- Supabase account and project setup

## 🛠️ Installation

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
   
2. Set up environment variables:
   Create a `.env` file in the root directory with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   
3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

## 🗄️ Database Setup

The application uses Supabase as the backend database. The SQL migrations are located in the `supabase/migrations/` directory and include:

- **Navigation System**: Dynamic menu management
- **User Profiles**: Role-based access control
- **Advisories**: Public announcements and emergency alerts
- **Incident Reports**: Emergency incident tracking and management
- **Evacuation Centers**: Shelter facility management
- **Resources**: Emergency resource inventory
- **Site Pages**: Dynamic content management

### Database Schema Features:
- Row Level Security (RLS) enabled on all tables
- Automatic timestamp triggers for created_at/updated_at
- Foreign key relationships with proper cascading
- Indexed columns for optimal query performance
- Enum types for consistent data validation

## 📁 Project Structure

```
react_app/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom React hooks for data fetching
│   ├── lib/            # Supabase client and database utilities
│   ├── pages/          # Page components
│   ├── styles/         # Global styles and Tailwind configuration
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── App.jsx         # Main application component
│   ├── Routes.jsx      # Application routes
│   └── index.jsx       # Application entry point
├── supabase/
│   └── migrations/     # Database migration files
├── .env                # Environment variables
├── index.html          # HTML template
├── package.json        # Project dependencies and scripts
├── tailwind.config.js  # Tailwind CSS configuration
└── vite.config.js      # Vite configuration
```

## 🔐 Authentication & Authorization

The application implements role-based access control with the following roles:
- **Super Admin**: Full system access
- **Admin**: Administrative access to most features
- **Editor**: Content creation and editing capabilities
- **Viewer**: Read-only access to dashboard and reports

### Usage Example:
```jsx
import { useAuth } from './hooks/useAuth';

const MyComponent = () => {
  const { user, isAuthenticated, hasRole, signIn, signOut } = useAuth();
  
  if (!isAuthenticated) {
    return <LoginForm onLogin={signIn} />;
  }
  
  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      {hasRole(['admin', 'super_admin']) && (
        <AdminPanel />
      )}
    </div>
  );
};
```

## 📊 Database Operations

### Using Database Hooks:
```jsx
import { useAdvisories } from './hooks/useAdvisories';

const AdvisoriesPage = () => {
  const { advisories, loading, create, update, remove } = useAdvisories({
    status: 'Published',
    is_public: true,
    limit: 10
  });
  
  const handleCreateAdvisory = async (data) => {
    const result = await create(data);
    if (result.success) {
      console.log('Advisory created:', result.data);
    }
  };
  
  return (
    <div>
      {loading ? <LoadingSpinner /> : <AdvisoriesList data={advisories} />}
    </div>
  );
};
```

### Direct Database Access:
```jsx
import { db } from './lib/supabase';

// Get all published advisories
const advisories = await db.getAdvisories({ 
  status: 'Published', 
  is_public: true 
});

// Create new incident report
const incident = await db.createIncidentReport({
  title: 'Emergency Incident',
  description: 'Incident description',
  type: 'flood',
  status: 'Reported',
  location: 'Poblacion'
});
```

## 🧩 Adding Routes

To add new routes to the application, update the `Routes.jsx` file:

```jsx
import { useRoutes } from "react-router-dom";
import HomePage from "pages/HomePage";
import AboutPage from "pages/AboutPage";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/about", element: <AboutPage /> },
    // Add more routes as needed
  ]);

  return element;
};
```

## 🎨 Styling

This project uses Tailwind CSS with a custom design system. The configuration includes:

### Color Palette:
- **Primary**: #042189 (blue) - Authority, trust, and key actions
- **Accent**: #fccf03 (yellow) - Warnings, calls to action, and highlights  
- **Neutral**: slate - Backgrounds, text, and borders
- **Semantic**: emerald for success, red for errors/danger, orange for caution

### Features:
- Forms plugin for form styling
- Typography plugin for text styling
- Aspect ratio plugin for responsive elements
- Container queries for component-specific responsive design
- Fluid typography for responsive text
- Animation utilities

### Typography:
- **Primary Font**: Inter - Excellent readability and modern aesthetic
- **Monospace Font**: JetBrains Mono - Code and technical content

## 📱 Responsive Design

The app is built with responsive design using Tailwind CSS breakpoints and follows modern design principles:
- Mobile-first approach
- Consistent 8px spacing system
- Proper contrast ratios for accessibility
- Progressive disclosure for complex interfaces
- Micro-interactions and hover states

## 🔄 Real-time Features

The application supports real-time updates through Supabase subscriptions:

```jsx
import { useEffect } from 'react';
import { supabase } from './lib/supabase';

const useRealtimeAdvisories = () => {
  useEffect(() => {
    const subscription = supabase
      .channel('advisories')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'advisories' },
        (payload) => {
          console.log('Advisory updated:', payload);
          // Handle real-time updates
        }
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }, []);
};
```

## 📦 Deployment

Build the application for production:

```bash
npm run build
```

## 🔧 Environment Variables

Required environment variables for Supabase integration:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 🚨 Emergency Features

The MDRRMO Operations Hub includes specialized emergency management features:

- **Incident Management**: Real-time incident reporting and tracking
- **Public Advisories**: Emergency communication and public announcements  
- **Evacuation Centers**: Shelter capacity and resource management
- **Weather Bulletins**: Meteorological alerts and forecasts
- **Resource Tracking**: Emergency supply inventory management
- **Event Calendar**: Training and preparedness event scheduling

## 🙏 Acknowledgments

- Built with [Bolt.new](https://bolt.new)
- Powered by React and Vite
- Backend powered by Supabase
- Styled with Tailwind CSS
- Designed for Municipal Disaster Risk Reduction and Management Office

Built with ❤️ for emergency preparedness and community safety
