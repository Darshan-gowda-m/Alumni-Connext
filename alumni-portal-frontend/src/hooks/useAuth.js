import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/auth/authSlice';

const useAuth = () => {
  const user = useSelector(selectCurrentUser);
  
  return {
    isAuthenticated: !!user,
    user,
    isAdmin: user?.role === 'admin',
    isStudent: user?.role === 'student',
    isAlumni: user?.role === 'alumni',
    isFaculty: user?.role === 'faculty'
  };
};

export default useAuth;