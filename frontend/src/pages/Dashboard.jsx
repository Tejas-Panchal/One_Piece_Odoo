import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, Button, Typography, Container } from '@mui/material';
import AddTicketIcon from '@mui/icons-material/PostAdd';
import ViewTicketsIcon from '@mui/icons-material/ListAlt';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GroupIcon from '@mui/icons-material/Group';

function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4" gutterBottom>
          Welcome, {user && user.name}
        </Typography>
        <Typography component="p" variant="h6" color="text.secondary">
            You are logged in as a: <strong>{user.role}</strong>
        </Typography>

        <Box sx={{ mt: 5, width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 4 }}>
          {/* --- ROLE-BASED NAVIGATION --- */}
          {user.role === 'End User' ? (
            // --- End User View ---
            <>
              <Button
                component={Link}
                to="/new-ticket"  // <-- This path should be correct.
                variant="contained"
                size="large"
                startIcon={<AddTicketIcon />}
                sx={{ py: 2, px: 4 }}
              >
                Create New Ticket
              </Button>
              <Button
                component={Link}
                to="/tickets" // This path is for viewing tickets.
                variant="outlined"
                size="large"
                startIcon={<ViewTicketsIcon />}
                sx={{ py: 2, px: 4 }}
              >
                View My Tickets
              </Button>
            </>
          ) : (
            // --- Agent & Admin View ---
            <>
                <Button
                    component={Link}
                    to="/tickets"
                    variant="contained"
                    size="large"
                    startIcon={<ViewTicketsIcon />}
                    sx={{ py: 2, px: 4 }}
                >
                    View All Tickets
                </Button>

                {/* --- ADMIN ONLY BUTTONS --- */}
                {user.role === 'Admin' && (
                    <>
                        <Button component={Link} to="/admin/users" variant="outlined" size="large" startIcon={<GroupIcon />} sx={{ py: 2, px: 4 }}>
                            Manage Users
                        </Button>
                        <Button component={Link} to="/admin/categories" variant="outlined" size="large" startIcon={<AdminPanelSettingsIcon />} sx={{ py: 2, px: 4 }}>
                            Manage Categories
                        </Button>
                    </>
                )}
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default Dashboard;