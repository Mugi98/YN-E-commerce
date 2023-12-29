export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}

export function loginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(loginInfo),
      });
      if (response?.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const err = await response.json();
        reject(err);
      }
    } catch (err) {
      reject(err);
    }

    // TODO: on server it will only return some info of user (not password)
  });
}

export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/check");
      if (response?.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const err = await response.json();
        reject(err);
      }
    } catch (err) {
      reject(err);
    }

    // TODO: on server it will only return some info of user (not password)
  });
}

export function signOut(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/logout");
      if (response?.ok) {
        resolve({ data: "success" });
      } else {
        const err = await response.text();
        reject(err);
      }
    } catch (err) {
      reject(err);
    }

    // TODO: on server it will only return some info of user (not password)
  });
}

export function resetPasswordRequest(email) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        "/auth/reset-password-request",
        {
          method: "POST",
          body: JSON.stringify({ email }),
          headers: { "content-type": "application/json" },
        }
      );
      if (response?.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const err = await response.json();
        reject(err);
      }
    } catch (err) {
      reject(err);
    }
  });
}

export function resetPassword(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        "/auth/reset-password",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (response?.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const err = await response.json();
        reject(err);
      }
    } catch (err) {
      reject(err);
    }
  });
}
