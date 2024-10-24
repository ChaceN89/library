import { API_BASE_URL } from '../globals';
import { logout } from './auth';

// Function to check the validity of the access token, refresh it if necessary, or log out
// Function to check and return a valid access token or throw an error if user needs to sign in
export const checkAndRefreshAccessToken = async () => {
  try {
    // Ensure access token and refresh token exist in localStorage
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accessToken || !refreshToken) {
      // If either token is missing, log out the user and throw an error
      console.error('Access or refresh token missing from localStorage.');
      logout();
      throw new Error('Missing tokens. Please sign in again.');
    }

    // Check if the access token is expired
    if (!isTokenExpired(accessToken)) {
      return accessToken;  // Access token is still valid, return it
    }

    // Access token is expired, now check and refresh the token using the refresh token
    if (!checkRefreshToken()) {
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        return newAccessToken;  // Return the new access token
      }
    }

    // If we can't refresh the access token, log out and throw an error
    logout();
    throw new Error('Session expired. Please sign in again.');
  } catch (error) {
    console.error('Error checking and refreshing token:', error);
    throw new Error('Please sign in again.');
  }
};


// Check if the token is expired
export const isTokenExpired = (token, bufferTime = 0) => {  // Buffer of 1 minute
  if (!token) return true;

  const decoded = JSON.parse(atob(token.split('.')[1]));
  const expTime = decoded.exp * 1000; // Convert to milliseconds

  // Check if current time is past the expiration time minus buffer
  return Date.now() > (expTime - bufferTime);  
};

// Check if the refresh token is expired
export const checkRefreshToken = () => {
  const refreshToken = localStorage.getItem('refreshToken');  // Get refresh token from localStorage
  if (!refreshToken) return true;  // If no token, assume expired

  const decoded = JSON.parse(atob(refreshToken.split('.')[1]));
  const expTime = decoded.exp * 1000;  // Convert expiration time to milliseconds

  // Check if current time is past the expiration time (no buffer needed here)
  return Date.now() > expTime;
};

// Refresh the access token using the refresh token
export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');  // Get refresh token from localStorage
  
  if (refreshToken) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/token/refresh/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),  // Send only refresh token
      });

      if (response.ok) {
        const data = await response.json();
        // Update access token in localStorage
        localStorage.setItem('accessToken', data.access);
        return data.access;
      } else {
        // Clear tokens on failure
        // call signout function

        logout();
        throw new Error('Failed to refresh token');
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  }
};
