import fetch from 'isomorphic-fetch'

const getProps = {
  method: 'GET',
  /*credentials: 'include',*/
};
const postProps = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  /*credentials: 'include',*/
};

const fetchWrap = (path, props = postProps, data) => {
  let { apiHost } = app;
  apiHost = apiHost || '/';
  const initProps = Object.assign(props, { body: JSON.stringify(data) });
  let response;
  return fetch(`${apiHost}${path}`, initProps)
    .then(res => {
      response = res
      return response.json();
    })
    .then(json => {
      if (response.ok) {
        return { response: json }
      } else {
        return { error: json }
      }
    })
    .catch(error => {
      return { error: error }
    })
}

const fetchPOST = (path, data) => {
  return fetchWrap(path, postProps, data)
}

const fetchGET = (path, data) => {
  return fetchWrap(path, getProps, data)
}

export const all = (data) => {
  return fetchGET(`a/devices`, data)
}

export const add = (data) => {
  return fetchPOST(`a/devices/add`, data)
}

export const set = (data) => {
  return fetchPOST(`a/devices/set`, data)
}

export const remove = (data) => {
  return fetchPOST(`a/devices/remove`, data)
}

export const pos = (data) => {
  return fetchPOST(`a/devices/pos`, data)
}
