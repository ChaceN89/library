import { API_BASE_URL } from '../globals';

// Check if the token is expired
export const isTokenExpired = (token, bufferTime = 60000) => {  // Buffer of 1 minute
  if (!token) return true;

  const decoded = JSON.parse(atob(token.split('.')[1]));
  const expTime = decoded.exp * 1000; // Convert to milliseconds

  // Check if current time is past the expiration time minus buffer
  return Date.now() > (expTime - bufferTime);  
};


// Check if the refresh token is expired
export const checkRefreshToken = () => {
  const refreshToken = sessionStorage.getItem('refresh_token');
  
  if (!refreshToken) return true;  // If no token, assume expired

  const decoded = JSON.parse(atob(refreshToken.split('.')[1]));
  const expTime = decoded.exp * 1000;  // Convert expiration time to milliseconds

  // Check if current time is past the expiration time (no buffer needed here)
  return Date.now() > expTime;
};


// Refresh the access token using the refresh token
export const refreshAccessToken = async () => {
  const refreshToken = sessionStorage.getItem('refresh_token');
  
  if (refreshToken) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/token/refresh/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem('access_token', data.access); // Update access token
        return data.access;
      } else {
        sessionStorage.clear(); // Clear session storage on failure
        throw new Error('Failed to refresh token');
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  }
};
