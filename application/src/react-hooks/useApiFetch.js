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

  /**
   * This function handles the refresh of the data. It sets the fetchTrigger to true.
   */
  const refresh = () => setFetchTrigger(true);

  useEffect(() => {
    refresh();
  }, [url]);

  useEffect(() => {
    if (fetchTrigger && url !== "") {
      const handleFetch = async () => {
        const data = await
          fetch(url, initialResult)
            .then(response => {
              if (response.ok) {
                return response.json();
              } else {
                throw response;
              }
            })
            .then(data => {
              console.log("Fetched", url, data);
              return data;
            })
            .catch(e => {
              console.error("Error fetching", url, e);
              throw new Error('Network Error');
            });
        let transformedData;
        try {
          transformedData = transformFn(data);
          if (transformedData !== data) {
            console.log("Transformed data from", url, transformedData);
          }
        } catch (e) {
          console.error("Error transforming data from", url, e);
          throw e;
        }
        setResult(transformedData);
      }
      handleFetch();
      setFetchTrigger(false);
    }
  }, [fetchTrigger, initialResult, setResult, transformFn, url]);

  return [result, refresh];
}
