import clsx from "clsx";
import React from "react";

interface InputProps {
  /**
   * form control of input defined with form-control from src/resources/assets/sass/core/components/forms/_form-control.scss
   */
  formcontrol?: "solid" | "transparent" | "white" | "flush";

  /**
   * validation of input, indicate that input of user is valid or invalid 
   */
  isvalid?: true | false;
  /**
   * props for the input
   */
  [propName: string]: any;
}

function TextInput({ ...props }: InputProps) {
  function styleSelect(): string {
    if (props.formcontrol) {
      return `form-control form-control-bs form-control-${props.formcontrol}`;
    }
    return `form-control`;
  }
  function validation(): string{
    if(props.isvalid === true){
      return `is-valid`;
    }
    if(props.isvalid === false){
      return `is-invalid`;
    }
    return `is-valid`;
  }
  return <input className={clsx(styleSelect(), validation())} {...props} />;
}

export default TextInput;
