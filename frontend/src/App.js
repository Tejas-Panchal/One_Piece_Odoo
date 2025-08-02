import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import NewTicket from './pages/NewTicket';
import Tickets from './pages/Tickets';
import Ticket from './pages/Ticket';
import AdminRoute from './components/AdminRoute'; // IMPORT
import CategoryAdmin from './pages/admin/CategoryAdmin'; 
import UserAdmin from './pages/admin/UserAdmin'; 

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            {/* Public Routes */}
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            {/* Private Routes */}
            <Route path='/' element={<PrivateRoute />}>
              <Route path='/' element={<Dashboard />} />
            </Route>
            <Route path='/new-ticket' element={<PrivateRoute />}>
                <Route path='/new-ticket' element={<NewTicket />} />
            </Route>
            <Route path='/tickets' element={<PrivateRoute />}>
                <Route path='/tickets' element={<Tickets />} />
            </Route>
            <Route path='/ticket/:ticketId' element={<PrivateRoute />}>
                <Route path='/ticket/:ticketId' element={<Ticket />} />
            </Route>
            <Route path='/admin/categories' element={<AdminRoute />}>
                <Route path='/admin/categories' element={<CategoryAdmin />} />
            </Route>
            <Route path='/admin/users' element={<AdminRoute />}>
                <Route path='/admin/users' element={<UserAdmin />} />
            </Route>

          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;