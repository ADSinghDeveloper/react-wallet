export const userKey = "users";

export function addUser({name, email, password}){
  if(!name || !email || !password){
    return new Error("User data is missing.");
  }
  const newUser = {name, email, password};
  const userData = getUsers();
  Array.isArray(userData) && userData.push(newUser);
  localStorage.setItem(userKey,JSON.stringify(userData));
}

export function getUsers(){
  let val = localStorage.getItem(userKey);
  return !val || val.length < 1 ? [] : JSON.parse(val);
}

export function loginUser({email, password}){
  const usersData = getUsers();
  const userFound = usersData.filter(user => user.email === email && user.password === password);
  return userFound.length > 0;
}
