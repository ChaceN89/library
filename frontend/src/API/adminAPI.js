import { API_BASE_URL } from '../globals';
import { checkAndRefreshAccessToken } from './tokenFetchAPI';

// Fetch all users (admin only)
export const fetchAllUsers = async () => {
  try {
    const accessToken = await checkAndRefreshAccessToken();
    const response = await fetch(`${API_BASE_URL}/admin/users/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// Edit user details (admin only)
export const editUser = async (userId, userData) => {
  try {
    const accessToken = await checkAndRefreshAccessToken();
    const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Failed to edit user');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// Delete user (admin only)
export const deleteUser = async (userId) => {
  try {
    const accessToken = await checkAndRefreshAccessToken();
    const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
    return response.status === 204 ? { detail: 'User deleted successfully' } : await response.json();
  } catch (error) {
    throw error;
  }
};
