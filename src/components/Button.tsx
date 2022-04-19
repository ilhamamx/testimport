import React from "react";
import clsx from "clsx";

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
   * className to be added to the button
   */
  cName?: string;
  /**
   * props for the button
   */
  [propName: string]: any;
  
}

/**
 * Primary UI component for user interaction
 */
function Button({ 
  btnbs,
  btnlg,
  btnbg,
  cName,
  ...props
}: ButtonProps) {
  function styleSelect(): string{
    if(btnbs){
      return `btn btn-${btnbs}`
    }
    if(btnlg){
      return `btn btn-lg btn-${btnlg}`
    }
    if(btnbg){
      return `btn btn-bg-${btnbg}`
    }
    return `btn`
  }
  return (
    <button
      className={clsx(styleSelect(), cName)}
      {...props}
    >
      {props.children}
    </button>
  );
}

export default Button;
