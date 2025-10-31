export function isLoggedIn(userType) {
  let session = getObject(userType) || "{}";
  // console.log("Raw session string 👉", session);

  try {
    session = JSON.parse(session);
  } catch (e) {
    console.error("Failed to parse session:", e);
    return "";
  }

  // jwtToken is inside data[0]
  let accessToken = session?.data?.[0]?.jwtToken || "";
  // console.log("Extracted Token ✅", accessToken);

  return accessToken;
}

export function getObject(key) {
  if (window && window.sessionStorage) {
    return window.sessionStorage.getItem(key);
  }
  return null;
}

  
//   export function getObject(key) {
//   if (window && window.sessionStorage) {
//     return window.sessionStorage.getItem(key);
//   }
// }