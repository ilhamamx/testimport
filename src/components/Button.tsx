import React from "react";

interface ButtonProps {
  /**
   * base color of the button with hover, defined with $theme-colors mapped in src/assets/sass/core/components/_variables.scss
   */
  btnbs?: 'white' | 'primary' | 'light' | 'secondary' | 'success' | 'info' | 'warning' |  'danger' | 'dark';
  /**
   * light style color of the button with hover, defined with $theme-light-colors mapped in src/assets/sass/core/components/_variables.scss
   */
  btnlg?: 'primary' | 'success' | 'info' | 'warning' |  'danger' | 'dark';
  /**
   * background style color of the button without hover, defined with $theme-colors mapped in src/assets/sass/core/components/_variables.scss
   */
  btnbg?: 'white' | 'primary' | 'light' | 'secondary' | 'success' | 'info' | 'warning' |  'danger' | 'dark';
  /**
   * props for the button
   */
  [propName: string]: any;
  
}

/**
 * Primary UI component for user interaction
 */
function Button({
  ...props
}: ButtonProps) {
  function styleSelect(): string{
    if(props.btnbs){
      return `btn btn-${props.btnbs}`
    }
    if(props.btnlg){
      return `btn btn-lg btn-${props.btnlg}`
    }
    if(props.btnbg){
      return `btn btn-bg-${props.btnbg}`
    }
    return `btn`
  }
  return (
    <button
      className={styleSelect()}
      {...props}
    >
      {props.children}
    </button>
  );
}

export default Button;
