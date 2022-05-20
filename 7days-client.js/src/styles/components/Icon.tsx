import { toAbsoluteUrl } from "../../resources/helpers/AssetHelpers";
import { KTSVG } from "../../resources/helpers/components/KTSVG";

interface IconProps {
  /**
   * badge theme-color of icon
   */
  badge?:
    | "bg-danger"
    | "bg-success"
    | "bg-primary"
    | "bg-secondary"
    | "bg-warning"
    | "bg-info"
    | "bg-light"
    | "bg-dark";
  /**
   * image source of icon component
   */
  imgSrc?: string;
  /**
   * active color of icon component
   */
  activeColor?: string;
  /**
   * current location of icon component
   */
  currentLocation?: string;
  /**
   * number badge element of icon component
   */
  number?: number;
  /**
   * navigation when icon component clicked
   */
  nav?: string;
  /**
   * prop of icon component
   */

  [propName: string]: any;
}

function Icon({
  imgSrc,
  badge,
  number,
  size,
  nav,
  currentLocation,
  activeColor,
  ...props
}: IconProps) {
  function havebadge(){
    return (
      <span className={badgeType()} style={style()}>
        {number}
      </span>
    );
  }
  function badgeType() {
    if (badge) {
      return `symbol-badge badge badge-circle ${badge}`;
    }
  }

  function style(){
    if (badge)
      return {top: 10, left: 70}
  }

  function color() {
    if (currentLocation === nav) {
      return activeColor || "custom";
    } else {
      return "muted";
    }
  }

  return (
    <a href={nav} {...props} className="symbol w-25">
      <KTSVG
        path={`${imgSrc}`}
        className={`svg-icon-${color()} svg-icon-${size || "4hx"}`}
      />
      {/* <span className={badgeType()} style={style()}>{number}</span> */}
      {badgeType() && havebadge()}
    </a>
  );
}
export default Icon;
