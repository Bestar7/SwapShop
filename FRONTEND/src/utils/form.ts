/**
 * Allow for custom warning messages to be displayed when a field is not valid
 * @param msg the warning message to be displayed, when the field is not valid
 * @returns the function to set the warning message
 * 
 * @example
 * <input type="email" :oninvalid.capture.prevent="setValidityWarning('Invalid email');">
 * // .capture.prevent prevent the spam when the field becomes valide
 */
function setValidityWarning(msg: string){
  const customValidity = (event: Event & {currentTarget:HTMLInputElement}) => {
    setCustomValidity(event, msg);
  };
  return customValidity;
}

const setCustomValidity = (event: Event & {currentTarget:HTMLInputElement}, msg: string) => {
  event.currentTarget.setCustomValidity(msg);
}

const checkvalidity = (event: Event & {currentTarget:HTMLInputElement}) => {
  setCustomValidity(event, ""); // Resets the warning msg so that it doesn't show up when the field is valid
  return event.currentTarget.checkValidity();
}

export { setCustomValidity, setValidityWarning, checkvalidity }