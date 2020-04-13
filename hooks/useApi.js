import React from 'react';

function useApi(api, { onConfirm, onError } = {}) {
  const [requested, setRequested] = React.useState(false);
  const [confirmed, setConfirmed] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const [data, setData] = React.useState(undefined);
  const [error, setError] = React.useState(undefined);

  return {
    call: async (params) => {
      setRequested(true);

      api(params)
        .then((json) => {
          setRequested(false);
          if (json.error) {
            setFailed(true);
            setError(json.error);
            onError?.(json.error);
          } else {
            setError(undefined);
            setFailed(false);
            setConfirmed(true);
            setData(json);
            onConfirm?.(json);
          }
        })
        .catch((e) => {
          setError(e);
          setFailed(true);
          setRequested(false);
          setConfirmed(false);
          onError?.(e);
        });
    },
    req: {
      requested,
      confirmed,
      failed,
      data,
      error,
    },
  };
}

export default useApi;
