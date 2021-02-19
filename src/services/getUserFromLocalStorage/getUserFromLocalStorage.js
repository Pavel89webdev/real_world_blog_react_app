function getUserFromLocalStorage() {
  const user = JSON.parse(window.localStorage.getItem('user'));
  if (!user) {
    // eslint-disable-next-line no-console
    console.log('no user in localStorage');
    return false;
  }
  return user;
}

export default getUserFromLocalStorage;
