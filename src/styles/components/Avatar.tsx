import React from "react";

interface AvatarProps {
  /**
   * width of avatar
   */
  width?:string
  /**
   * height of avatar
   */
  height?:string
  /**
  * image source of image component
  */
  imgSrc?: string;
  /**
   * image radius of image component
  */
  imgRadius?:
   | "0%"
   | "10%"
   | "20%"
   | "30%"
   | "40%"
   | "50%";
  /**
   * className of image component
   */
  cName?: string;
  /**
   * props for the image component
   */
  [propName: string]: any;
}

/**
 * Primary UI component for image model
 */
function Avatar({ width, height, imgSrc,imgRadius, ...props }: AvatarProps) {
  function styleSelect(): any {
    if (width) {
      return `${width}px`;
    }
    if (height) {
      return `${height}px`;
    }
    if (imgRadius) {
      return `${imgRadius}`;
    }
    if (imgSrc) {
      return `${imgSrc}`;
    }
  }
  
  return (
    <img
      src={imgSrc}
      alt="test"
      // className="img-fluid"
      style={{height: styleSelect(), width: styleSelect(), borderRadius: imgRadius,}}
    />
  );
}

export default Avatar;
