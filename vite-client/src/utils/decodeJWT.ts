import { jwtDecode, JwtPayload } from 'jwt-decode';

interface DecodedJWT extends JwtPayload {
    username: string;
    avatar: string;
}

const decodeJWT = (token: string) => {
    const decoded = jwtDecode<DecodedJWT>(token);
    return decoded;
};

export default decodeJWT;
