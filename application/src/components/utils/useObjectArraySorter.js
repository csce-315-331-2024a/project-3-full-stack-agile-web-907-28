import {useEffect, useState} from "react";

/**
 * React hook to keep an array of objects sorted by one of the object properties.
 * @param array {[Object]} The array.
 * @param onArrayChange {(array: [Object]) => void} Callback function for when the array is re-sorted.
 * @param initialSortKey {string} The initial object property to sort by.
 */
export default function useObjectArraySorter(array, onArrayChange, initialSortKey) {
  const [sortProps, setSortProps] = useState({key: initialSortKey, order: "asc", enable: true});

  useEffect(() => {
    if (sortProps.enable) {
      const newArray = array.slice();
      const cmpSign = sortProps.order === "asc" ? -1 : 1;
      newArray.sort((a, b) => {
        const a_val = a[sortProps.key];
        const b_val = b[sortProps.key];
        return (a_val < b_val) ? cmpSign : ((a_val > b_val) ? -cmpSign : 0);
      });
      onArrayChange(newArray);
      setSortProps({key: sortProps.key, order: sortProps.order, enable: false});
    }
  }, [array, onArrayChange, sortProps]);

  return [sortProps, setSortProps];
}
