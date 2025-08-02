import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getCategories, createCategory, deleteCategory, reset } from '../../features/tickets/ticketSlice';
import { Container, Typography, Box, TextField, Button, CircularProgress, List, ListItem, ListItemText, IconButton, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BackButton from '../../components/BackButton';

function CategoryAdmin() {
  // Get state from Redux store
  const { categories, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tickets
  );
  const dispatch = useDispatch();

  // Local state for the form input
  const [newCategoryName, setNewCategoryName] = useState('');

  // Effect for handling notifications and side-effects after an action
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // If a create or delete was successful, show toast and clear form
    if (isSuccess && message) {
        toast.success(message);
        setNewCategoryName('');
    }

    // Crucially, reset the status flags (isError, isSuccess) after handling them
    // This prevents the effect from re-running with stale status
    if(isError || isSuccess) {
        dispatch(reset());
    }

  }, [isError, isSuccess, message, dispatch]);


  // Effect for fetching initial categories ONLY on component mount
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);


  const handleCreateCategory = (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) {
        toast.error('Category name cannot be empty');
        return;
    }
    // Dispatch the create action
    dispatch(createCategory({ name: newCategoryName }));
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
        // Dispatch the delete action
        dispatch(deleteCategory(id));
    }
  };

  // Show a global spinner only on initial load
  if (isLoading && categories.length === 0) {
    return <CircularProgress sx={{ display: 'block', margin: '100px auto' }} />;
  }

  return (
    <Container maxWidth="sm">
      <BackButton />
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Manage Categories
      </Typography>

      <Paper sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Create New Category</Typography>
        <Box component="form" onSubmit={handleCreateCategory} sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="New Category Name"
            variant="outlined"
            size="small"
            fullWidth
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          {/* Disable button only when the specific 'create' action is loading */}
          <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? <CircularProgress color="inherit" size={24} /> : 'Create'}
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>Existing Categories</Typography>
        <List>
          {categories.map((category) => (
            <ListItem
              key={category._id}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteCategory(category._id)} disabled={isLoading}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={category.name} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default CategoryAdmin;