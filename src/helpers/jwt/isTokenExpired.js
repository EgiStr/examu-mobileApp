import jwtDecode from "jwt-decode";

// check jwt token is expired or not
export default function isTokenExpired (token)  {
  try {
    const decoded = jwtDecode(token);
    if (decoded.exp < Date.now() / 1000) {
      return true;
    } else return false;
  } catch (err) {
    return false;
  }
};
