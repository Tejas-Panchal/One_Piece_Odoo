import axios from 'axios';

const API_URL = '/api/users/';

// Get all users
const getUsers = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL, config);
    return response.data;
};

// Update user role
const updateUserRole = async (userId, roleData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.put(API_URL + userId + '/role', roleData, config);
    return response.data;
};


const adminService = {
  getUsers,
  updateUserRole,
};

export default adminService;