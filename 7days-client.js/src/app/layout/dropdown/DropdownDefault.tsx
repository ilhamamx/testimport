import React, {useEffect} from "react";
import { KTSVG } from "../../../resources/helpers";
import "../../../styles/css/margin.css";
import clsx from "clsx";
import { DropdownMenu } from "./DropdownMenu";
import { MenuComponent } from "../../../resources/assets/ts/components";

export function DropdownDefault() {
  function onClickTest() {
    document.getElementById("myDropdown")?.classList.toggle("show");
  }
  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [])

  const toolbarButtonMarginClass = "ms-1 ms-lg-3",
    toolbarUserAvatarHeightClass = "symbol-30px symbol-md-40px";

  return (
    <div
      className={clsx("d-flex align-items-center", toolbarButtonMarginClass)}
      id="kt_header_user_menu_toggle"
    >
      {/* begin::Toggle */}
      <div
        className={clsx("cursor-pointer symbol", toolbarUserAvatarHeightClass)}
        data-kt-menu-trigger="click"
        data-kt-menu-attach="parent"
        data-kt-menu-placement="bottom-end"
        data-kt-menu-flip="bottom"
      >
        <KTSVG path="/media/icons/duotune/abstract/abs015.svg" className="svg-icon-muted svg-icon-2hx" svgClassName="mt-30" />
      </div>
      <DropdownMenu/>
    </div>
  );
}
