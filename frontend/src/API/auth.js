import { API_BASE_URL } from '../globals';
import { refreshAccessToken, isTokenExpired } from './tokenFetch';  // Import from tokenFetch.js

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
      sessionStorage.setItem('access_token', data.access); // Store access token
      sessionStorage.setItem('refresh_token', data.refresh); // Store refresh token

      return data;
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    console.error('Error during login:', error);
    throw error;  // Re-throw to handle in the component
  }
};

// Function to fetch user data using access token
export const getUserData = async () => {
  const accessToken = sessionStorage.getItem('access_token');

  if (!accessToken || isTokenExpired(accessToken)) {  // Check if token is expired before making the request
    const newAccessToken = await refreshAccessToken();  // Refresh the token if expired
    if (!newAccessToken) {
      throw new Error('Failed to refresh token or user is not authenticated.');
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/users/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`, // Use (potentially new) access token
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const userData = await response.json();
      sessionStorage.setItem('user', JSON.stringify(userData[0])); // Store user data
      return userData[0]; // Return user data
    } else {
      throw new Error('Failed to fetch user data');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
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
    return data;
  } catch (error) {
    console.error('Error during account creation:', error);
    return null;
  }
};


export const logout = async () => {
  // Clear session storage for access token, refresh token, and user data
  sessionStorage.removeItem('access_token');
  sessionStorage.removeItem('refresh_token');
  sessionStorage.removeItem('user');

  // Optionally, you could redirect the user after logout
  // For example, if using Next.js, you could use Router to navigate
  // Router.push('/login'); // Un-comment this if you want to redirect

  // Alternatively, you could return a message indicating successful logout
  return 'User has been logged out successfully';
};


export const checkToken = async () => {

}