import jwtDecode from "jwt-decode";

export default function decodeJwt(token) {
    return jwtDecode(token);
}