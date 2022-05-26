import { KTSVG } from "../../resources/helpers/components/KTSVG";
import { Link } from "react-router-dom";

interface IconProps {
  /**
   * badge theme-color of icon from variable $theme-colors in src/resources/assets/sass/core/components/_variables.scss
   */
  badgeStyle?:
  | "bg-danger"
  | "bg-success"
  | "bg-primary"
  | "bg-secondary"
  | "bg-warning"
  | "bg-info"
  | "bg-light"
  | "bg-dark";
  /**
   * image source of icon component from public/media/icons/duotune/...
   */
  imgSrc?: string;
  /**
   * active color of icon component from $custom in src/resources/assets/sass/core/components/_variables.scss
   * icon will be active when currentLocation same as nav of icon
   */
  activeColor?: string;
  /**
   * current location of icon component, for check the location path 
   * if currentLocation same as nav it will change color of icon to custom color
   * if currentLocation not same with nav, icon color will be muted color
   */
  currentLocation?: string;
  /**
   * number badge element of icon component
   */
  number?: number;
  /**
   * size of icon
   */
  size?:
  | "1hx"
  | "2hx"
  | "3hx"
  | "4hx";
  /**
   * Navigate to this URI, when this component clicked
   */
  nav?: string;

  /**
   * prop of icon component
   */
  [propName: string]: any;
}

function Icon({
  imgSrc,
  badgeStyle,
  number,
  size,
  nav,
  currentLocation,
  activeColor,
  ...props
}: IconProps) {
  function badge() {
    return (
      <span className={badgeType()} style={style()}>
        {number}
      </span>
    );
  }
  function badgeType() {
    if (badgeStyle) {
      return `symbol-badge badge badge-circle ${badgeStyle}`;
    }
  }

  function style() {
    if (badgeStyle)
      return { top: "10px", marginLeft: "20px" }
  }

  function color() {
    if (currentLocation === nav) {
      return activeColor || "custom";
    } else {
      return "muted";
    }
  }

  return (
    <Link to={`${nav}`} {...props} className="symbol" style={{ marginLeft: "10px", marginRight: "10px" }}>
      <KTSVG
        path={`${imgSrc}`}
        className={`svg-icon-${color()} svg-icon-${size || "4hx"}`}
      />
      {number != null && number > 0 && badge()}
    </Link>
  );
}
export default Icon;
