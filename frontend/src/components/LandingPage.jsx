import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const LandingScreen = () => {
  const { user } = useSelector((state) => state.auth);

  if (user) {
    return <Navigate to={'/timesheets'} replace />;
  }

  return <div>Landing Screen</div>;
};

export default LandingScreen;
