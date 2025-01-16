/**
 * @file EmailSection.jsx
 * @module EmailSection
 * @description 
 *   Component for managing and updating the user's email. Includes an editable field 
 *   and saves updates via API calls.
 *
 * @requires React
 * @requires InputField - Reusable input component.
 * @requires updateProfileField - API function for updating profile fields.
 * @requires toast - Library for displaying success/error notifications.
 *
 * @component
 * @param {Object} userData - The user's current profile data.
 * @param {string} editField - Field currently being edited.
 * @param {Function} setEditField - Function to set the currently edited field.
 * @param {Function} onUpdate - Callback for updating the profile after changes.
 *
 * @example
 * <EmailSection userData={user} editField="email" setEditField={setEditField} onUpdate={reloadProfile} />
 * 
 * @exports EmailSection
 * @created 2025-01-16
 */

import React from "react";
import InputField from "@/components/general/inputs/InputField";
import { updateProfileField } from "@/API/editProfileAPI";
import { toast } from "react-hot-toast";

function EmailSection({ userData, editField, setEditField, onUpdate }) {
  const [email, setEmail] = React.useState(userData?.email || "");

  const handleUpdate = async () => {
    try {
      await updateProfileField("email", email);
      toast.success("Email updated successfully");
      await onUpdate();
      setEditField(null);
    } catch (error) {
      toast.error(error.message || "Failed to update email");
    }
  };

  return (
    <div>
      <label className="block font-medium">Email</label>
      {editField === "email" ? (
        <div className="flex space-x-2">
          <InputField
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="bg-blue-500 text-white px-4 py-2" onClick={handleUpdate}>
            Save
          </button>
          <button className="bg-gray-500 text-white px-4 py-2" onClick={() => setEditField(null)}>
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <p>{userData?.email}</p>
          <button className="text-blue-500" onClick={() => setEditField("email")}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
}

export default EmailSection;
