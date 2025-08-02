import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, Button, Typography, Container } from '@mui/material';
import AddTicketIcon from '@mui/icons-material/PostAdd';
import ViewTicketsIcon from '@mui/icons-material/ListAlt';

function Dashboard() {
  // Get the user's name from the Redux auth state
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
          What would you like to do today?
        </Typography>

        <Box sx={{ mt: 5, width: '100%', display: 'flex', justifyContent: 'center', gap: 4 }}>
          <Button
            component={Link}
            to="/new-ticket"
            variant="contained"
            size="large"
            startIcon={<AddTicketIcon />}
            sx={{ py: 2, px: 4 }}
          >
            Create New Ticket
          </Button>

          <Button
            component={Link}
            to="/tickets"
            variant="outlined"
            size="large"
            startIcon={<ViewTicketsIcon />}
            sx={{ py: 2, px: 4 }}
          >
            View My Tickets
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Dashboard;