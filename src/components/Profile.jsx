import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkTokenExpiry } from "./authutils";

export default function Profile() {
    const [userData, setUserData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({ username: '', email: '' });
    const navigate = useNavigate();

    // Check if user is authenticated and check if token expired
    useEffect(() => {
        const token = localStorage.getItem('token');
        const { valid, userID, email, name } = checkTokenExpiry(token);
        if (!valid) {
            alert('Session expired. Please login again.');
            localStorage.removeItem('token');
            navigate('/login');
            return;
        }

        setUserData({ username: name, email: email });
        setFormData({ username: name, email: email });
    }, [navigate]);

    // Handle input changes for editing profile
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle profile update submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Update user data with an API call (API endpoint should handle updates)
        fetch('/api/auth/update-profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Profile updated successfully') {
                    localStorage.setItem('token', data.token);
                    alert('Profile updated successfully');
                    setUserData(formData);
                    setEditMode(false);
                } else {
                    alert('Failed to update profile: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error updating profile:', error);
                alert('Error updating profile');
            });
    };

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (!userData) {
        return <div>Loading user data...</div>;
    }

    return (
        <div className="profile">
            <h2>User Profile</h2>
            {!editMode ? (
                <div>
                    <p><strong>Username:</strong> {userData.username}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <button onClick={() => setEditMode(true)}>Edit Profile</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Save Changes</button>
                    <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
                </form>
            )}
        </div>
    );
}
