// const pswStrengthRegex = (?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,});
export const minPasswordLength = 6;

export const validateEMail = (em) => {
    const emailValidRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailValidRegex.test(em)
}

export function base64Encode(str) {
  const bytes = new TextEncoder().encode(str);
  const binString = String.fromCodePoint(...bytes);
  return btoa(binString);
}

export const rwamKey = "rwam";

window.addEventListener("beforeunload", (e) => {
  if (window.hasOwnProperty(rwamKey)) {
    localStorage.setItem(rwamKey, JSON.stringify(window[rwamKey]));
  }
});

export function getLocalAuthKey() {
  return JSON.parse(localStorage.getItem(rwamKey));
}

export function removeLocalAuthKey() {
  localStorage.removeItem(rwamKey);
}

export function setBrowserAuthKey(token) {
  window[rwamKey] = token;
}

export function delBrowserAuthKey() {
  delete window[rwamKey];
}