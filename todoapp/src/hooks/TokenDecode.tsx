function parseJWT(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

export default function getTokenInfo(token: string | null) {
    try {
        if (token != null) {
            const decodedToken = parseJWT(token);
            console.log("token:", decodedToken.email);
            return decodedToken;
        }
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
}
