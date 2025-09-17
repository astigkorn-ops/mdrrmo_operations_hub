import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import MainDashboard from './pages/main-dashboard';
import LoginPage from './pages/login';
import PublicHomepage from './pages/public-homepage';
import EventCalendar from './pages/event-calendar';
import PublicAdvisories from './pages/public-advisories';
import IncidentManagement from './pages/incident-management';
import EvacuationCentersManagement from './pages/evacuation-centers-management';
import WeatherBulletinsManagement from './pages/weather-bulletins-management';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<EventCalendar />} />
        <Route path="/main-dashboard" element={<MainDashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/public-homepage" element={<PublicHomepage />} />
        <Route path="/event-calendar" element={<EventCalendar />} />
        <Route path="/public-advisories" element={<PublicAdvisories />} />
        <Route path="/incident-management" element={<IncidentManagement />} />
        <Route path="/evacuation-centers-management" element={<EvacuationCentersManagement />} />
        <Route path="/weather-bulletins-management" element={<WeatherBulletinsManagement />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;