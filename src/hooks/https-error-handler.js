import { useState, useEffect } from 'react';

export default (httpClient) => {
  const [error, setError] = useState(null);

  const resIntercept = httpClient.interceptors.response.use(
    (res) => res,
    (error) => {
      setError(error);
    }
  );
  const reqIntercept = httpClient.interceptors.request.use(
    (req) => req,
    (error) => {
      setError(error);
    }
  );

  useEffect(() => {
    return () => {
      httpClient.interceptors.request.eject(reqIntercept);
      httpClient.interceptors.response.eject(resIntercept);
    };
  }, [reqIntercept, resIntercept]);

  const errorConfirmedHandler = () => {
    setError(null);
  };
  return [error, errorConfirmedHandler];
};
