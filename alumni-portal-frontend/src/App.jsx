import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { useEffect } from 'react';
import MainLayout from './components/layout/MainLayout';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import JobsPage from './pages/JobsPage';
import MentorshipPage from './pages/MentorshipPage';
import AnalyticsPage from './pages/AnalyticsPage';
import MessagesPage from './pages/MessagesPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ui/ProtectedRoute';
import { fetchUserProfile } from './features/auth/authThunks';

function App() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      store.dispatch(fetchUserProfile());
    }
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Public route */}
          <Route path="/login" element={<AuthPage />} />

          {/* Protected app routes inside MainLayout */}
          <Route element={<MainLayout />}>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/mentorship" element={<MentorshipPage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/profile" element={<ProfilePage />} />

              {/* Nested admin-only routes */}
              <Route element={<ProtectedRoute roles={['admin']} />}>
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/admin" element={<AdminPage />} />
              </Route>
            </Route>
          </Route>

          {/* Catch-all for unmatched routes */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;