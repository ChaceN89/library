import { API_BASE_URL } from '../globals';


// Function to log in and store tokens
export const getLoginCredentials = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();

      // Store access token, refresh token, and user data in separate localStorage keys
      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);
      localStorage.setItem('user', JSON.stringify(data.user));  // User data stored as JSON

      return data;
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    console.error('Error during login:', error);
    throw error;  // Re-throw to handle in the component
  }
};

// Function to handle account creation with a profile image
export const createAccount = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: formData, // Sends formData directly as multipart/form-data
    });

    if (!response.ok) {
      throw new Error('Failed to create account');
    }

    const data = await response.json();

    // Store access token, refresh token, and user data in separate localStorage keys
    localStorage.setItem('accessToken', data.access);
    localStorage.setItem('refreshToken', data.refresh);
    localStorage.setItem('user', JSON.stringify(data.user));  // User data stored as JSON

    window.location.reload(); // Reload the page to update the user state - can be replaced with a redirect later

    return data;
  } catch (error) {
    console.error('Error during account creation:', error);
    return null;
  }
};

// Logout function to clear all tokens and user data
export const logout = async () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');  // Clear user data

  // need to reload the page to update the user state upon a successful logout
  window.location.reload();  // Reload the page to update the user state - can be replaced with a redirect later

  return 'User has been logged out successfully';
};
