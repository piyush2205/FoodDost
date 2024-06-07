// UserSettings.js
import React, { useState } from 'react';

function UserSettings() {
    const [name, setName] = useState("John Doe");
    const [email, setEmail] = useState("johndoe@example.com");
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const toggleEditName = () => {
        setIsEditingName(!isEditingName);
    };

    const toggleEditEmail = () => {
        setIsEditingEmail(!isEditingEmail);
    };

    const saveChanges = () => {
        // Here you can implement the logic to save the changes to the server/database
        console.log("Saving changes...");
        // For demonstration purposes, let's just log the updated name and email
        console.log("Updated name:", name);
        console.log("Updated email:", email);
        // After saving changes, you may want to disable editing mode
        setIsEditingName(false);
        setIsEditingEmail(false);
    };

    return (
        <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-4">
                <h1 className="text-center text-3xl font-semibold mb-4">User Settings</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                    {isEditingName ? (
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            onBlur={saveChanges}
                        />
                    ) : (
                        <div className="flex items-center">
                            <span className="mr-2">{name}</span>
                            <button onClick={toggleEditName} className="text-sm">Edit</button>
                        </div>
                    )}
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                    {isEditingEmail ? (
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            onBlur={saveChanges}
                        />
                    ) : (
                        <div className="flex items-center">
                            <span className="mr-2">{email}</span>
                            <button onClick={toggleEditEmail} className="text-sm">Edit</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserSettings;
