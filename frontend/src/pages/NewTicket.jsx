import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createTicket, getCategories, reset } from '../features/tickets/ticketSlice';
import { Container, Typography, Box, TextField, Button, CircularProgress, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import BackButton from '../components/BackButton';

function NewTicket() {
  const { user } = useSelector((state) => state.auth);
  const { categories, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tickets
  );

  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [category, setCategory] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories on component mount
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
      navigate('/tickets');
    }

    return () => {
        dispatch(reset());
    }
  }, [dispatch, isError, isSuccess, navigate, message]);


  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createTicket({ category, subject, description }));
  };

  if (isLoading) {
    return <CircularProgress sx={{ display: 'block', margin: '100px auto' }} />;
  }

  return (
    <Container maxWidth="sm">
        <BackButton />
        <Box component="section" sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" component="h1">Create New Ticket</Typography>
            <Typography variant="body1" color="text.secondary">Please fill out the form below</Typography>
        </Box>

        <Box component="section" sx={{ mb: 4 }}>
            <Typography variant="h6">Customer Name</Typography>
            <Typography variant="body1" color="text.secondary">{name}</Typography>
            <Typography variant="h6" sx={{ mt: 1 }}>Customer Email</Typography>
            <Typography variant="body1" color="text.secondary">{email}</Typography>
        </Box>

        <Box component="form" onSubmit={onSubmit}>
            <FormControl fullWidth margin="normal">
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                    labelId="category-select-label"
                    id="category"
                    value={category}
                    label="Category"
                    onChange={(e) => setCategory(e.target.value)}
                    required
                >
                    {categories.map((cat) => (
                        <MenuItem key={cat._id} value={cat._id}>{cat.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField label="Subject" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} fullWidth margin="normal" required />
            <TextField label="Description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth margin="normal" multiline rows={4} required />

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                Submit
            </Button>
        </Box>
    </Container>
  );
}

export default NewTicket;