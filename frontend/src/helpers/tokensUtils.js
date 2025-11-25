import { jwtDecode } from "jwt-decode";

export function getTokensFromLocalStorage() {
  const tokens = localStorage.getItem("tokens");
  return tokens ? JSON.parse(tokens) : null;
}

export function saveTokensToLocalStorage(tokens) {
  localStorage.setItem("tokens", JSON.stringify(tokens));
}

export function removeTokensFromLocalStorage() {
  localStorage.removeItem("tokens");
}

export function getUserIdFromToken(token) {
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    const userId =
      decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ];
    return parseInt(userId);
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
}
