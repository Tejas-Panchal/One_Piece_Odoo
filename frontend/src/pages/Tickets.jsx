import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTickets, reset } from '../features/tickets/ticketSlice';
import { Container, Typography, Box, CircularProgress, Grid } from '@mui/material';
import BackButton from '../components/BackButton';
import TicketItem from '../components/TicketItem';

function Tickets() {
    const { tickets, isLoading, isSuccess } = useSelector((state) => state.tickets);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            if (isSuccess) {
                dispatch(reset());
            }
        };
    }, [dispatch, isSuccess]);

    useEffect(() => {
        dispatch(getTickets());
        return () => {
            dispatch(reset());
        };
    }, [dispatch]);

    if (isLoading) {
        return <CircularProgress sx={{ display: 'block', margin: '100px auto' }} />;
    }

    return (
    <Container maxWidth="lg">
      <BackButton />
      {/* --- DYNAMIC TITLE --- */}
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        {user.role === 'End User' ? 'My Tickets' : 'All Support Tickets'}
      </Typography>

      <Box>
        <Grid container spacing={2}>
            {tickets.map((ticket) => (
                <TicketItem key={ticket._id} ticket={ticket} />
            ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default Tickets;