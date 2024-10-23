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

      // Store all authentication data in a single object in localStorage
      const authData = {
        accessToken: data.access,
        refreshToken: data.refresh,
        user: data.user
      };
      localStorage.setItem('authData', JSON.stringify(authData));  // Store the object

      window.location.reload(); // Reload the page to update the user state - can be replaced with a redirect later

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

    // Store all authentication data in a single object in localStorage
    const authData = {
      accessToken: data.access,
      refreshToken: data.refresh,
      user: data.user
    };
    localStorage.setItem('authData', JSON.stringify(authData));  // Store the object

    window.location.reload(); // Reload the page to update the user state - can be replaced with a redirect later

    return data;
  } catch (error) {
    console.error('Error during account creation:', error);
    return null;
  }
};

// Logout function to clear authData
export const logout = async () => {
  localStorage.removeItem('authData');  // Clear all authentication data

  // Optionally, you could redirect the user after logout
  // For example, if using Next.js, you could use Router to navigate
  // Router.push('/login'); // Un-comment this if you want to redirect

  // Alternatively, you could return a message indicating successful logout
  return 'User has been logged out successfully';
};

// Function to check if the access token is valid
export const checkToken = async () => {
  const storedAuthData = JSON.parse(localStorage.getItem('authData'));

  if (!storedAuthData || isTokenExpired(storedAuthData.accessToken)) {
    const newAccessToken = await refreshAccessToken();  // Refresh the token if expired
    if (newAccessToken) {
      // Update localStorage with the new access token
      storedAuthData.accessToken = newAccessToken;
      localStorage.setItem('authData', JSON.stringify(storedAuthData));
    } else {
      throw new Error('Failed to refresh token or user is not authenticated.');
    }
  }
};
