import React, { useState } from 'react';
import { deleteAccount } from '@/API/deleteAccountAPI';
import { toast } from 'react-hot-toast';

function DeleteAccount({ userID, triggerProfileReload }) {
  const [showConfirmation, setShowConfirmation] = useState(false); // Track confirmation state

  const handleDelete = async () => {
    try {
      await deleteAccount(userID);
      toast.success('Account deleted successfully');
      triggerProfileReload(); // Reload profile context after account deletion
    } catch (error) {
      toast.error(error.message || 'Failed to delete account');
    }
  };

  return (
    <div className="mt-6">
      <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={() => setShowConfirmation(true)}
      >
        Delete Account
      </button>

      {showConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Are you sure?</h2>
            <p className="text-gray-700 mb-4">
              This action cannot be undone. Your account and all related data will be permanently deleted.
            </p>
            <div className="flex justify-between">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteAccount;
