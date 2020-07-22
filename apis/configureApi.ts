const CONTENT_TYPE = 'application/json';

export default function configureAPI(
  API_URL: string,
  { headerFunc = (h: any) => h, errorFunc = null }
): any {
  function fetchFromAPI(
    endpoint: string,
    { options = {}, image = false, json = true } = {}
  ) {
    const headers = headerFunc({
      Accept: CONTENT_TYPE,
    });
    if (!image) {
      headers['Content-Type'] = CONTENT_TYPE;
    }
    return fetch(
      API_URL + endpoint,
      Object.assign(
        {
          headers,
        },
        options
      )
    ).then((r) => {
      return json ? r.json().then((jsonVal) => jsonVal) : r;
    });
  }

  function postToAPI(endpoint: string, options = {}) {
    return fetchFromAPI(endpoint, {
      options: Object.assign({ method: 'post' }, options),
    });
  }

  function putToAPI(endpoint: string, options = {}) {
    return fetchFromAPI(endpoint, {
      options: Object.assign({ method: 'put' }, options),
      json: false,
    });
  }

  function deleteFromAPI(endpoint: string, options = {}) {
    return fetchFromAPI(endpoint, {
      options: Object.assign({ method: 'delete' }, options),
      json: false,
    });
  }

  return {
    fetchFromAPI,
    postToAPI,
    putToAPI,
    deleteFromAPI,
  };
}
