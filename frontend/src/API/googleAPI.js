import { API_BASE_URL } from '../globals';

export const loginWithGoogle = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/google-login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }), // Ensure `token` is sent correctly
    });

    if (!response.ok) {
      const errorDetails = await response.json().catch(() => ({
        detail: 'Unable to parse error response',
      }));
      throw new Error(
        `Google login failed. Status: ${response.status} - ${response.statusText}. Details: ${errorDetails.detail || 'No additional details'}`
      );
    }

    const data = await response.json();
    console.log('Google login response:', data);

    // Store the tokens and user details
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('user', JSON.stringify(data.user));

    return data;
  } catch (error) {
    console.error('Error during Google login:', error.message);
    throw error;
  }
};
