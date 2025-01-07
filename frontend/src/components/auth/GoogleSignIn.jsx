import { GoogleLogin } from '@react-oauth/google';
import { loginWithGoogle } from '@/API/googleAPI'; // Correctly import the API function

export default function GoogleSignIn() {
  const handleLoginSuccess = async (credentialResponse) => {
    console.log('Login Success:', credentialResponse);

    try {
      // Pass the credential to your backend API for authentication
      await loginWithGoogle(credentialResponse.credential);

      // Handle post-login UI updates (e.g., redirect, show success message)
    } catch (error) {
      console.error('Google login failed:', error.message);
      alert('Google login failed. Please try again.');
    }
  };

  const handleLoginFailure = (error) => {
    console.error('????Login Failed:', error);
    alert('??Google login failed. Please try again.');
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
      />
    </div>
  );
}
