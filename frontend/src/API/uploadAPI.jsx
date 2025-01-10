import { API_BASE_URL } from '../globals';
import { checkAndRefreshAccessToken } from './tokenFetchAPI';  // Ensure the token is valid

export const uploadBook = async (data) => {
  console.log("Uploading book with the following data:");
  for (const [key, value] of data.entries()) {
    console.log(`${key}:`, value);
  }

  try {
    const accessToken = await checkAndRefreshAccessToken();  // Ensure valid token

    const response = await fetch(`${API_BASE_URL}/books/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      },
      body: data,  // Send form data
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Backend responded with:", errorResponse);
      throw new Error(`Failed to upload book: ${errorResponse.detail || 'Unknown error'}`);
    }

    return await response.json();  // Return the result
  } catch (error) {
    console.error("Upload error:", error);
    throw error;  // Throw error to handle it in the component
  }
};
