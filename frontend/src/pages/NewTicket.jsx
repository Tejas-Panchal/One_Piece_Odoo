import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createTicket, getCategories, reset } from '../features/tickets/ticketSlice';
import { Container, Typography, Box, TextField, Button, CircularProgress, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import BackButton from '../components/BackButton';
import axios from 'axios';

function NewTicket() {
    const { user } = useSelector((state) => state.auth);
    const { categories, isLoading, isError, message } = useSelector(
        (state) => state.tickets
    );
    const [attachmentUrl, setAttachmentUrl] = useState('');
    const [uploading, setUploading] = useState(false);

    const [category, setCategory] = useState('');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getCategories());
        if (isError) {
            toast.error(message);
        }
        return () => {
            dispatch(reset());
        }
    }, [dispatch, isError, message]);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('attachment', file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${user.token}`, // Get token from auth state
                },
            };

            const { data } = await axios.post('/api/upload', formData, config);
            setAttachmentUrl(data.url);
            toast.success(data.message);
            setUploading(false);
        } catch (error) {
            toast.error('File upload failed. Only JPG, JPEG, PNG are allowed.');
            setUploading(false);
        }
    };


    const onSubmit = (e) => {
        e.preventDefault();
        const ticketData = { category, subject, description, attachments: attachmentUrl ? [attachmentUrl] : [] };
        dispatch(createTicket(ticketData))
            .unwrap()
            .then(() => {
                toast.success('New ticket created!');
                // This is the fix! 'replace: true' will replace '/new-ticket' with '/tickets' in the history.
                navigate('/tickets', { replace: true });
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    if (isLoading && categories.length === 0) {
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
                <Typography variant="body1" color="text.secondary">{user.name}</Typography>
                <Typography variant="h6" sx={{ mt: 1 }}>Customer Email</Typography>
                <Typography variant="body1" color="text.secondary">{user.email}</Typography>
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

                <FormControl fullWidth margin="normal">
                    <Button
                        variant="contained"
                        component="label"
                        disabled={uploading}
                    >
                        {uploading ? 'Uploading...' : 'Upload Attachment'}
                        <input
                            type="file"
                            hidden
                            onChange={uploadFileHandler}
                        />
                    </Button>
                    {attachmentUrl && (
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            File Uploaded: <a href={attachmentUrl} target="_blank" rel="noopener noreferrer">{attachmentUrl.substring(0, 40)}...</a>
                        </Typography>
                    )}
                </FormControl>

                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} disabled={isLoading}>
                    {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
                </Button>
            </Box>
        </Container>
    );
}

export default NewTicket;