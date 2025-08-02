import axios from 'axios';

const API_URL = '/api/tickets/';
const CATEGORY_API_URL = '/api/categories/';

// Get all categories
const getCategories = async () => {
    const response = await axios.get(CATEGORY_API_URL);
    return response.data;
}

// Create new ticket
const createTicket = async (ticketData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL, ticketData, config);
    return response.data;
};

const getTickets = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL, config);
    return response.data;
}

// Get single ticket
const getTicket = async (ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL + ticketId, config);
    return response.data;
}

// Update ticket (e.g., add comment, change status)
const updateTicket = async (ticketId, updateData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.put(API_URL + ticketId, updateData, config);
    return response.data;
}

const deleteCategory = async (categoryId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.delete(CATEGORY_API_URL + categoryId, config);
    return response.data;
}
const createCategory = async (categoryData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(CATEGORY_API_URL, categoryData, config);
    return response.data;
}

const ticketService = {
    createTicket,
    getCategories,
    getTickets,
    getTicket,
    updateTicket,
    deleteCategory,
    createCategory,
};

export default ticketService;