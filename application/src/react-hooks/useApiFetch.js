import {useEffect, useState} from "react";


/**
 * React hook to use state resulting from an API fetch request.
 * @param url {string} The URL to fetch from.
 * @param initialResult {Object} The initial state.
 * @param transformFn {(responseJson: Object) => Object} Function to convert the response JSON to the desired output.
 * @returns {[Object, () => void]} [ (The response JSON), (Function to trigger a refresh) ]
 */
export function useApiFetch(url, initialResult, transformFn=x=>x) {
  const [result, setResult] = useState(initialResult);
  const [fetchTrigger, setFetchTrigger] = useState(true);

  const refresh = () => setFetchTrigger(true);

  useEffect(() => {
    if (fetchTrigger) {
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw response;
          }
        })
        .then(data => {
          console.log("Fetched", url, data);
          setResult(transformFn(data));
        })
        .catch(e => {
          console.error("Error fetching", url, e);
        });
      setFetchTrigger(false);
    }
  }, [fetchTrigger, setResult, transformFn, url]);

  return [result, refresh];
}
