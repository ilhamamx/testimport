import clsx from "clsx";
import React from "react";

interface InputProps {
  /**
   * form control of input defined with form-control from src/resources/assets/sass/core/components/forms/_form-control.scss
   */
  formcontrol?: "solid" | "transparent" | "white" | "flush";
  /**
   * form control size of input defined with form-control from src/resources/assets/sass/core/vendor/plugins/_tagify.scss
   */
  formcontrolsize?: "lg" | "sm";
  /**
   * validation of input, indicate that input of user is valid or invalid
   */
  isvalid?: true | false;
  /**
   * className of input
   */
  cName?: string;
  /**
   * props for the input
   */
  [propName: string]: any;
}

/**
 * Primary UI component for text input model
 */
function TextInput({
  isvalid,
  formcontrol,
  formcontrolsize,
  cName,
  ...props
}: InputProps) {
  function styleSelect(): string {
    if (formcontrol) {
      return `form-control form-control-${formcontrol}`;
    }
    if (formcontrolsize) {
      if (formcontrol) {
        return `form-control form-control-${formcontrolsize} form-control-${formcontrol}`;
      }
      return `form-control form-control-${formcontrolsize}`;
    }
    return `form-control`;
  }
  function validation() {
    if (isvalid === true) {
      return `is-valid`;
    }
    if (isvalid === false) {
      return `is-invalid`;
    }
  }
  return <input className={clsx(styleSelect(), validation(), cName)} {...props} />;
}

export default TextInput;
