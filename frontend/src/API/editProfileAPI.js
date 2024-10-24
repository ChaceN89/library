import { API_BASE_URL } from '../globals';
import { checkAndRefreshAccessToken } from './tokenFetchAPI';

// Function to edit profile picture
export const editProfile = async (data) => {
  try {
    // Retrieve a valid access token or throw an error
    const accessToken = await checkAndRefreshAccessToken();

    const response = await fetch(`${API_BASE_URL}/profile-picture/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json'
      },
      body: data
    });

    if (!response.ok) {
      throw new Error('Failed to update profile picture');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    // Re-throw to handle it in the functional component
    throw error 
  }
};



// Function to get user profile from the API and update local storage
export const getUserProfileForLocalStorage = async () => {
  try {
    // Retrieve a valid access token or throw an error
    const accessToken = await checkAndRefreshAccessToken();

    const response = await fetch(`${API_BASE_URL}/users/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }

    const data = await response.json();

    // Assuming the API returns an array, we'll use the first user object for now
    if (data && data.length > 0) {
      const userProfile = data[0];

      // Store the user profile in localStorage
      localStorage.setItem('user', JSON.stringify(userProfile));

      console.log('User profile successfully updated in local storage');
      return userProfile;
    } else {
      throw new Error('No user profile data found');
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;  // Re-throw to handle it in the functional component
  }
};
