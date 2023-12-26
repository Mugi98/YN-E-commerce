export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/auth/signup", {
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
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "content-type": "application/json" },
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
      const response = await fetch("http://localhost:8080/auth/check");
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
  return new Promise(async (resolve) => {
    resolve({ data: "success" });
  });
}
