// const pswStrengthRegex = (?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,});
export const minPasswordLength = 6;

export const validateEMail = (em) => {
    const emailValidRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailValidRegex.test(em)
}
// base64 encoder function to encode string into base64.
export function base64Encode(str) {
  const bytes = new TextEncoder().encode(str);
  const binString = String.fromCodePoint(...bytes);
  return btoa(binString);
}

const rwamKey = "rwam";

export function setLocalAuthKey(token) {
  localStorage.setItem(rwamKey, JSON.stringify(token));
}

export function getLocalAuthKey() {
  return JSON.parse(localStorage.getItem(rwamKey));
}

export function removeLocalAuthKey() {
  localStorage.removeItem(rwamKey);
}
