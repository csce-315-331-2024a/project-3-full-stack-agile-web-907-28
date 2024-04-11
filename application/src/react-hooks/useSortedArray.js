import {useEffect, useState} from "react";


/**
 * Class representing the manner in which an array is sorted.
 * @member key The sort criterion.
 * @member order The sort order.
 * @method compareFn Function to compare two array items.
 */
export class SortProperties {
  /**
   * Constructs the sort key using a comparison function.
   * @param compareFn {((a: Object, b: Object) => number)} (optional) A comparison function returning:
   * - A negative number, if a < b,
   * - A positive number, if a > b,
   * - Zero, if a == b.
   * @param key The unique identifier for the sort criterion.
   * @param order {"asc" | "desc"} The sort order.
   * @returns {SortProperties}
   */
  constructor(compareFn, key, order = "asc") {
    this.key = key;
    this.order = order;
    const cmpSign = order === "asc" ? 1 : -1;
    this.compareFn = (a, b) => cmpSign * compareFn(a, b);
  }

  /**
   * Constructs a sort key which compares key values.
   * @param keyFn {(value: Object) => Object} Function converting an array object to its key.
   * @param id The unique identifier for the sort key.
   * @param order {"asc" | "desc"} The sort order.
   * @returns {SortProperties}
   */
  static byKeyFn(keyFn, id, order = "asc") {
    return new SortProperties((a, b) => {
      const a_val = keyFn(a);
      const b_val = keyFn(b);
      return (a_val < b_val) ? -1 : ((a_val > b_val) ? 1 : 0)
    }, id, order);
  }

  /**
   * Constructs a sort key which compares object properties.
   * @param propertyName {string} The name of the object property to compare.
   * @param order {"asc" | "desc"} The sort order.
   * @returns {SortProperties}
   */
  static byProperty(propertyName, order = "asc") {
    return SortProperties.byKeyFn(x => x[propertyName], propertyName, order);
  }
}


/**
 * React hook to keep an array of objects sorted by one of the object properties.
 * @param array {[Object]} The array.
 * @param initialSortProperties {SortProperties} The initial sort properties.
 * @returns {[*[],SortProperties,(value: (((prevState: SortProperties) => SortProperties) | SortProperties)) => void]} An array containing:
 * - The sorted array,
 * - The sort properties, and
 * - A function to set the sort properties.
 */
export default function useSortedArray(array, initialSortProperties) {
  const [sortedArray, setSortedArray] = useState([]);
  const [sortProps, setSortProps] = useState(initialSortProperties);

  useEffect(() => {
    const newSortedArray = array.slice();
    newSortedArray.sort(sortProps.compareFn);
    setSortedArray(newSortedArray);
  }, [array, sortProps]);

  return [sortedArray, sortProps, setSortProps];
}
