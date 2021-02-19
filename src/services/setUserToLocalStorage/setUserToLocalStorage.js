function setUserToLocalStorage(userObj) {
  if (userObj.errors) return;

  window.localStorage.setItem('user', JSON.stringify(userObj));
}

export default setUserToLocalStorage;
