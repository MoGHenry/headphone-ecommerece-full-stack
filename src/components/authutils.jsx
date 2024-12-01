import jwtDecode from 'jwt-decode'; // Import jwt-decode

export const checkTokenExpiry = (token) => {
    if (!token) {
        return { valid: false, expired: true };
    }

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Current time in seconds

        // Check if token is expired
        if (decoded.exp < currentTime) {
            return { valid: false, expired: true };
        }

        return { valid: true, userID: decoded.userID, email: decoded.email }; // Return validity and userID
    } catch (error) {
        console.error('Token is invalid', error);
        return { valid: false, expired: true }; // Return invalid status
    }
};
