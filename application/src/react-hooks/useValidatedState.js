import {useMemo, useState} from "react";


/**
 * React hook combining useState and useMemo for input fields with validated input.
 * @param initialState The initial state.
 * @param validationFn {(unknown) => boolean} A function which returns true when the state is valid, false otherwise.
 * @returns {[unknown,(value: unknown) => void,() => void,boolean,boolean]} [state, setState, resetState, isStateValid, isStateChanged]:
 * - state is the stateful value returned by useState.
 * - setState is a function to set the state, setting the isStateChanged flag.
 * - resetState is a function to reset the state to initialState & reset the isStateChanged flag.
 * - isStateValid is whether the current state passes validation.
 * - isStateChanged is whether the state has been modified.
 */
export default function useValidatedState(initialState, validationFn) {
  const [changed, setChanged] = useState(false);
  const [state, setState] = useState(initialState);

  /**
   * This function handles the validation of the state. It uses the validation function to validate the state.
   * @returns {boolean} - The validation status.
   */
  const isStateValid = useMemo(() => {
    return validationFn(state);
  }, [state, validationFn]);

  /**
   * This function handles the setting of the state. It sets the state and sets the changed flag to true.
   * @param {unknown} s - The state to be set.
   */
  const stateSetter = (s) => {
    setState(s);
    setChanged(true);
  };

  /**
   * This function handles the resetting of the state. It resets the state to the initial state and sets the changed flag to false.
   */
  const stateResetter = () => {
    setState(initialState);
    setChanged(false);
  }

  return [state, stateSetter, stateResetter, isStateValid, changed];
}
