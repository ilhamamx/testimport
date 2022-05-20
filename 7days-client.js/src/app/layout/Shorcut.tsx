import { useLocation } from "react-router-dom";
import Icon from "../../styles/components/Icon";
export function ShortcutBar(){
    const location = useLocation();
    function getLocation(): string {
      return location.pathname;
    }
    return (
      <div className="d-flex flex-row align-items-end text-center">
        <div className="justify-content-center position-fixed fixed-bottom bg-white pt-5 pb-5 w-100 border top-3">
          <Icon
            id="icon-handle-customer"
            imgSrc="/media/icons/duotune/communication/com002.svg"
            currentLocation={`${getLocation()}`}
            size="4hx"
            badge="bg-danger"
            number={9}
            nav="/handled-customer"
          ></Icon>
          <Icon
            id="icon-unhandle-customer"
            currentLocation={`${getLocation()}`}
            imgSrc="/media/icons/duotune/communication/com010.svg"
            badge="bg-success"
            number={9}
            nav="/customer-in-queue"
          ></Icon>
          <Icon
            id="icon-dashboard"
            currentLocation={`${getLocation()}`}
            imgSrc="/media/icons/duotune/general/gen024.svg"
            nav="/dashboard"
            size="4hx"
          ></Icon>
          <Icon
            id="icon-contact"
            currentLocation={`${getLocation()}`}
            imgSrc="/media/icons/duotune/communication/com005.svg"
            activeColor=""
            nav="/contact"
          ></Icon>
        </div>
      </div>
    );
}
