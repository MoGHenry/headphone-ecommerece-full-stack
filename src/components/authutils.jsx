import {jwtDecode} from 'jwt-decode';

export const checkTokenExpiry = (token) => {
    if (!token) {
        return { valid: false, expired: true };
    }

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Current time in seconds
        console.log("decoded and currentTime", decoded, currentTime)

        // Check if token is expired
        if (decoded.exp < currentTime) {
            console.log("Token expired");
            return { valid: false, expired: true };
        }
        console.log("Token is valid", decoded.userID, decoded.email, decoded.name);
        return { valid: true, userID: decoded.userID, email: decoded.email, name: decoded.name }; // Return validity and userID
    } catch (error) {
        console.error('Token is invalid', error);
        return { valid: false, expired: true }; // Return invalid status
    }
};
