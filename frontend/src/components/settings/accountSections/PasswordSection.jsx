/**
 * @file PasswordSection.jsx
 * @module PasswordSection
 * @description 
 *   Component for managing and updating the user's password. Includes fields for 
 *   old and new passwords and validates password confirmation.
 *
 * @requires React
 * @requires InputField - Reusable input component.
 * @requires updatePassword - API function for updating passwords.
 * @requires toast - Library for displaying success/error notifications.
 *
 * @component
 * @param {string} editField - Field currently being edited.
 * @param {Function} setEditField - Function to set the currently edited field.
 *
 * @example
 * <PasswordSection editField="password" setEditField={setEditField} />
 * 
 * @exports PasswordSection
 * @created 2025-01-16
 */

import React from "react";
import InputField from "@/components/general/inputs/InputField";
import { updatePassword } from "@/API/editProfileAPI";
import { toast } from "react-hot-toast";

function PasswordSection({ editField, setEditField }) {
  const [formData, setFormData] = React.useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await updatePassword(formData.oldPassword, formData.newPassword);
      toast.success("Password updated successfully");
      setEditField(null);
    } catch (error) {
      toast.error(error.message || "Failed to update password");
    }
  };

  return (
    <div>
      <label className="block font-medium">Password</label>
      {editField === "password" ? (
        <div className="space-y-2">
          <p className="pt-2">Enter Old Password</p>
          <InputField
            type="password"
            name="oldPassword"
            value={formData.oldPassword}
            placeholder="Old Password"
            onChange={handleChange}
          />
          <p className="pt-2">Set New Password</p>
          <InputField
            type="password"
            name="newPassword"
            value={formData.newPassword}
            placeholder="New Password"
            onChange={handleChange}
          />
          <InputField
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            placeholder="Confirm New Password"
            onChange={handleChange}
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
          <p>********</p>
          <button className="text-blue-500" onClick={() => setEditField("password")}>
            Change Password
          </button>
        </div>
      )}
    </div>
  );
}

export default PasswordSection;
