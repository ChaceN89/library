/**
 * @file NameSection.jsx
 * @module NameSection
 * @description 
 *   Component for managing and updating the user's first and last name. Provides editable 
 *   fields and saves updates via API calls.
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
 * <NameSection userData={user} editField="name" setEditField={setEditField} onUpdate={reloadProfile} />
 * 
 * @exports NameSection
 * @created 2025-01-16
 */

import React from "react";
import InputField from "@/components/general/inputs/InputField";
import { updateProfileField } from "@/API/editProfileAPI";
import { toast } from "react-hot-toast";

function NameSection({ userData, editField, setEditField, onUpdate }) {
  const [firstName, setFirstName] = React.useState(userData?.first_name || "");
  const [lastName, setLastName] = React.useState(userData?.last_name || "");

  const handleUpdate = async () => {
    try {
      await updateProfileField("first_name", firstName);
      await updateProfileField("last_name", lastName);
      toast.success("Name updated successfully");
      await onUpdate();
      setEditField(null);
    } catch (error) {
      toast.error(error.message || "Failed to update name");
    }
  };

  return (
    <div>
      <label className="block font-medium">First and Last Name</label>
      {editField === "name" ? (
        <div className="space-y-2">
          <InputField
            type="text"
            name="firstName"
            value={firstName}
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <InputField
            type="text"
            name="lastName"
            value={lastName}
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
          <div className="flex space-x-2">
            <button className="bg-blue-500 text-white px-4 py-2" onClick={handleUpdate}>
              Save
            </button>
            <button className="bg-gray-500 text-white px-4 py-2" onClick={() => setEditField(null)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <p>{userData?.first_name} {userData?.last_name}</p>
          <button className="text-blue-500" onClick={() => setEditField("name")}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
}

export default NameSection;
