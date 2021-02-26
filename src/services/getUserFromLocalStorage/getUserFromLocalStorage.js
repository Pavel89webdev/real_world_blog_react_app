function getUserFromLocalStorage() {
  const email = JSON.parse(window.localStorage.getItem('userEmail'));
  const password = JSON.parse(window.localStorage.getItem('userPassword'));
  if (email === null || password === null) {
    // eslint-disable-next-line no-console
    console.log('no user in localStorage');
    return false;
  }
  return { email, password };
}

export default getUserFromLocalStorage;
