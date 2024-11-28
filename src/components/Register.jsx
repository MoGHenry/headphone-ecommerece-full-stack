// This component is created by ChatGPT
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

export default function UserRegistration() {
    const [formData, setFormData] = useState({
        username: '', // Changed from 'name' to 'username'
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Basic form validation
    const validateForm = () => {
        let formErrors = {};
        if (!formData.username) formErrors.username = 'Username is required'; // Updated for 'username'
        if (!formData.email) {
            formErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formErrors.email = 'Email address is invalid';
        }
        if (!formData.password) {
            formErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            formErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Make an API call to register the user
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            };
            fetch('/api/auth/register', requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.message === 'User created successfully') {
                        alert('Registration successful');
                        navigate('/login');
                    } else if (data.message === 'User with this email already exists') {
                        alert('User with this email already exists');
                        navigate('/login');
                    } else {
                        alert('Registration failed: ' + data.message);
                    }
                })
                .catch(error => {
                    console.error('Error during registration:', error);
                    alert('Error during registration');
                });
        }
    };

    return (
        <div className="user-registration">
            <h2>User Registration</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label> {/* Changed from 'Name' to 'Username' */}
                    <input
                        type="text"
                        name="username" // Updated to 'username'
                        value={formData.username} // Updated to 'username'
                        onChange={handleChange}
                    />
                    {errors.username && <span className="error">{errors.username}</span>} {/* Updated for 'username' */}
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}
