import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getUsers, updateUserRole, reset } from '../../features/admin/adminSlice';
import { Container, Typography, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem, FormControl } from '@mui/material';
import BackButton from '../../components/BackButton';

function UserAdmin() {
  const dispatch = useDispatch();
  const { users, isLoading, isError, message } = useSelector((state) => state.admin);
  const { user: loggedInUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getUsers());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message]);

  const handleRoleChange = (userId, newRole) => {
    dispatch(updateUserRole({ userId, roleData: { role: newRole } }))
        .unwrap()
        .then(() => {
            toast.success('User role updated successfully!');
        })
        .catch((error) => {
            toast.error(`Failed to update role: ${error}`);
        });
  };

  if (isLoading) {
    return <CircularProgress sx={{ display: 'block', margin: '100px auto' }} />;
  }

  return (
    <Container maxWidth="lg">
      <BackButton />
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        User Management
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="user table">
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="center">Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {user._id}
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell align="center">
                  <FormControl size="small" sx={{ m: 1, minWidth: 150 }}>
                    <Select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      // Disable the dropdown for the currently logged-in admin to prevent self-lockout
                      disabled={user._id === loggedInUser._id}
                    >
                      <MenuItem value={'End User'}>End User</MenuItem>
                      <MenuItem value={'Support Agent'}>Support Agent</MenuItem>
                      <MenuItem value={'Admin'}>Admin</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default UserAdmin;