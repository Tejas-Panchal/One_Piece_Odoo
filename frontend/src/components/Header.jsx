import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LogoutIcon from '@mui/icons-material/Logout';


function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>QuickDesk</Link>
      </div>
      <ul>
        {user ? (
          // If user is logged in, show Logout button
          <li>
            <Button variant='contained' startIcon={<LogoutIcon/>} onClick={onLogout}>
              Logout
            </Button>
          </li>
        ) : (
          // If user is logged out, show Login and Register
          <>
            <li>
              <Link to='/login'>
                <Button startIcon={<LoginIcon/>}>Login</Button>
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <Button startIcon={<HowToRegIcon/>}>Register</Button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;