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

      // Store access, refresh tokens and user data in localStorage
      localStorage.setItem('access_token', data.access); // Store access token
      localStorage.setItem('refresh_token', data.refresh); // Store refresh token
      localStorage.setItem('user', JSON.stringify(data.user)); // Store user data

      window.location.reload(); // Reload the page to update the user state - need to replace this later with a redirect off the page 

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

    // Store access, refresh tokens and user data in localStorage
    localStorage.setItem('access_token', data.access); // Store access token
    localStorage.setItem('refresh_token', data.refresh); // Store refresh token
    localStorage.setItem('user', JSON.stringify(data.user)); // Store user data

    window.location.reload(); // Reload the page to update the user state - need to replace this later with a redirect off the page 

    return data;
  } catch (error) {
    console.error('Error during account creation:', error);
    return null;
  }
};

export const logout = async () => {
  // Clear session storage for access token, refresh token, and user data
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');

  // Optionally, you could redirect the user after logout
  // For example, if using Next.js, you could use Router to navigate
  // Router.push('/login'); // Un-comment this if you want to redirect

  // Alternatively, you could return a message indicating successful logout
  return 'User has been logged out successfully';
};

export const checkToken = async () => {
  const accessToken = localStorage.getItem('access_token');

  if (!accessToken || isTokenExpired(accessToken)) {
    const newAccessToken = await refreshAccessToken();  // Refresh the token if expired
    if (!newAccessToken) {
      throw new Error('Failed to refresh token or user is not authenticated.');
    }
  }
};
