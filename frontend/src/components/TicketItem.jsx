import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Grid, Chip } from '@mui/material';

function TicketItem({ ticket }) {
  const getStatusColor = (status) => {
      switch (status) {
          case 'Open': return 'success';
          case 'In Progress': return 'warning';
          case 'Closed':
          case 'Resolved': return 'error';
          default: return 'default';
      }
  }

  return (
    <Grid item xs={12} md={6} lg={4}>
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="body2" color="text.secondary">
                    {new Date(ticket.createdAt).toLocaleString('en-US')}
                </Typography>
                <Typography variant="h6" component="div" sx={{ my: 1 }}>
                    {ticket.subject}
                </Typography>
                <Chip label={ticket.status} color={getStatusColor(ticket.status)} size="small" />
            </CardContent>
            <Button component={Link} to={`/ticket/${ticket._id}`} size="small" sx={{ m: 1, alignSelf: 'flex-start' }}>
                View Details
            </Button>
        </Card>
    </Grid>
  );
}

export default TicketItem;