import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getTicket, updateTicket, reset } from '../features/tickets/ticketSlice';
import { Container, Typography, Box, CircularProgress, Card, CardContent, Chip, Button, Divider, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import BackButton from '../components/BackButton';

function Ticket() {
    const { ticket, isLoading, isError, message } = useSelector((state) => state.tickets);
    const { user } = useSelector((state) => state.auth);

    const [commentText, setCommentText] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { ticketId } = useParams();

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        dispatch(getTicket(ticketId));
        return () => {
            dispatch(reset());
        }
    }, [isError, message, ticketId]);

    const onAssignTicket = () => {
        dispatch(updateTicket({ ticketId, updateData: { assignedTo: user._id } }))
            .unwrap()
            .then(() => toast.success('Ticket assigned to you'))
            .catch(toast.error);
    }

    // --- AGENT ACTION: Update status ---
    const onStatusChange = (newStatus) => {
        dispatch(updateTicket({ ticketId, updateData: { status: newStatus } }))
            .unwrap()
            .then(() => toast.success('Status updated'))
            .catch(toast.error);
    }

    // Close ticket
    const onTicketClose = () => {
        dispatch(updateTicket({ ticketId, updateData: { status: 'Closed' } }))
            .unwrap()
            .then(() => {
                toast.success('Ticket Closed');
                navigate('/tickets');
            })
            .catch(toast.error);
    };

    // Add comment
    const onCommentSubmit = (e) => {
        e.preventDefault();
        dispatch(updateTicket({ ticketId, updateData: { comment: commentText } }))
            .unwrap()
            .then(() => {
                setCommentText('');
                toast.success('Comment Added');
            })
            .catch(toast.error);
    }


    if (isLoading || !ticket.user) {
        return <CircularProgress sx={{ display: 'block', margin: '100px auto' }} />;
    }

    if (isError) {
        return <Typography variant="h5" color="error">Something Went Wrong</Typography>
    }

    return (
        <Container maxWidth="md">
            <BackButton />
            <Card>
                <CardContent>
                    {/* --- AGENT/ADMIN CONTROLS --- */}
                    {(user.role === 'Support Agent' || user.role === 'Admin') && (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            {!ticket.assignedTo && ticket.status !== 'Closed' && (
                                <Button variant="outlined" onClick={onAssignTicket}>Assign to Me</Button>
                            )}
                            <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                                <InputLabel id="status-select-label">Status</InputLabel>
                                <Select
                                    labelId="status-select-label"
                                    value={ticket.status}
                                    label="Status"
                                    onChange={(e) => onStatusChange(e.target.value)}
                                >
                                    <MenuItem value={'Open'}>Open</MenuItem>
                                    <MenuItem value={'In Progress'}>In Progress</MenuItem>
                                    <MenuItem value={'Resolved'}>Resolved</MenuItem>
                                    <MenuItem value={'Closed'}>Closed</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    )}
                    {/* --- END AGENT/ADMIN CONTROLS --- */}
                    <Typography variant="h5" component="h1" gutterBottom>
                        Ticket Details
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Ticket ID: {ticket._id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" gutterBottom>Subject: {ticket.subject}</Typography>
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', bgcolor: 'grey.100', p: 2, borderRadius: 1 }}>{ticket.description}</Typography>

                    {/* --- DISPLAY ATTACHMENTS --- */}
                    {ticket.attachments && ticket.attachments.length > 0 && (
                        <Box mt={3}>
                            <Typography variant="h6" gutterBottom>Attachments</Typography>
                            {ticket.attachments.map((url, index) => (
                                <Box key={index} my={1}>
                                    <a href={url} target="_blank" rel="noopener noreferrer">
                                        <img src={url} alt={`Attachment ${index + 1}`} style={{ maxWidth: '100%', maxHeight: '400px', border: '1px solid #ddd', borderRadius: '4px' }} />
                                    </a>
                                </Box>
                            ))}
                        </Box>
                    )}
                    <Box sx={{ my: 2 }}>
                        <Typography variant="overline">Status: </Typography>
                        <Chip label={ticket.status} color={ticket.status === 'Open' ? 'success' : 'default'} size="small" />
                    </Box>
                </CardContent>
            </Card>

            <Box mt={4}>
                <Typography variant="h5" gutterBottom>Conversation History</Typography>
                {ticket.comments.map((comment) => (
                    <Card key={comment._id} sx={{ mb: 2, bgcolor: comment.user === user._id ? 'primary.lighter' : 'grey.200' }}>
                        <CardContent>
                            <Typography variant="subtitle2">
                                Comment from {comment.user === user._id ? 'You' : 'Support'} on {new Date(comment.createdAt).toLocaleString('en-US')}
                            </Typography>
                            <Typography variant="body1">{comment.text}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            {ticket.status !== 'Closed' && (
                <Box mt={4} component="form" onSubmit={onCommentSubmit}>
                    <Typography variant="h6" gutterBottom>Add a Comment</Typography>
                    <TextField fullWidth multiline rows={3} value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Type your comment here..." />
                    <Button type="submit" variant="contained" sx={{ mt: 2 }}>Submit Comment</Button>
                </Box>
            )}

            {ticket.status !== 'Closed' && (
                <Button onClick={onTicketClose} variant="contained" color="error" sx={{ mt: 4, width: '100%' }}>
                    Close Ticket
                </Button>
            )}
        </Container>
    );
}

export default Ticket;