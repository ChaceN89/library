import React from 'react';

const GoogleSignIn = () => {
  // Function to open a new popup window for Google Sign-In
  const openGoogleSignInPopup = () => {
    const popupWidth = 500;
    const popupHeight = 600;
    const left = (window.innerWidth - popupWidth) / 2;
    const top = (window.innerHeight - popupHeight) / 2;

    const popup = window.open(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/accounts/google/login/`,
      'googleSignIn',
      `width=${popupWidth},height=${popupHeight},top=${top},left=${left}`
    );

    if (popup) {
      const interval = setInterval(() => {
        try {
          if (popup.closed) {
            clearInterval(interval);
            // Handle post-login (e.g., check session storage for tokens)
            console.log('Google login popup closed');
          }
        } catch (error) {
          console.error('Error during Google login popup handling:', error);
        }
      }, 500);
    }
  };

  return (
    <div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        onClick={openGoogleSignInPopup}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default GoogleSignIn;
