import { useAuthStore } from "../stores/auth";

export const myfetch = async (method, query, body) => {
  return fetch("http://localhost:3000/api" + query, {
    method,
    body: body && JSON.stringify(body),
    headers: { "content-type": "application/json; charset=utf-8" },
  }).then((res) =>
    res.headers.get("Content-Type").startsWith("application/json")
      ? res.json()
      : res.text()
  );
};

/**
 * fetch Promises wrapper 
 */
export const fetchWrapper = {
  get: request("GET"),
  post: request("POST"),
  postfile: requestFile("POST"),
  patch: request("PATCH"),
  patchfile: requestFile("PATCH"),
  put: request("PUT"),
  delete: request("DELETE"),
};

/**
 * Fetch method with a content-type application/json
 * @param {*} method fetch query
 * @returns fetch Promise with API url and body  
 */
function request(method) {
  return (url, body) => {
    const requestOptions = {
      method,
      headers: authHeader(url),
    };
    if (body) {
      requestOptions.headers["Content-Type"] = "application/json";
      requestOptions.body = JSON.stringify(body);
    }

    return fetch(url, requestOptions).then(handleResponse);
  };
}

/**
 * Fetch method multipart/form-data 
 * @param {*} method fetch query  
 * @returns fetch Promise with API url and body  
 */
function requestFile(method) {
  return (url, body) => {
    const requestOptions = {
      method,
      headers: authHeader(url),
    };
    if (body) {
      requestOptions.body = body;
    }
    return fetch(url, requestOptions).then(handleResponse);
  };
}

/** 
 * Function authorization Headers 
 * @param {String} url   request API url 
 * @returns Headers authorization token or empty object
 */
function authHeader(url) {
  const { userData } = useAuthStore();
  const isLoggedIn = !!userData?.token;
  const isApiUrl = url.startsWith("http://localhost:3000/api");

  if (isLoggedIn && isApiUrl) {
    return { Authorization: `Bearer ${userData.token}` };
  } else {
    return {};
  }
}

/**
 *  Function Handling response  
 * @param {*} response response of a fetch request
 * @returns Promise response data or auth store logout()
 */
function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {

      const { userData, logout } = useAuthStore();
      if ([401, 403].includes(response.status) && userData) {
        logout();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
