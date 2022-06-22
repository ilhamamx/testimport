import react from 'react';
import { KTSVG } from '../../../resources/helpers';

function AlertModal()  {

  console.log("AlertModal");
  return (
<div className="modal fade" tabIndex={-1} id="modal_broadcast_alert">
  <div className="modal-dialog">
    <div className="modal-content">
      {/* <div className="modal-header">
        <h5 className="modal-title">Modal title</h5>
        <div
          className="btn btn-icon btn-sm btn-active-light-primary ms-2"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <KTSVG
            path="/media/icons/duotune/arrows/arr061.svg"
            className="svg-icon svg-icon-2x"
          />
        </div>
      </div> */}
      <div className="modal-body">
        <i className="bi bi-checklis-circle fs-2x"></i>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-light"
          data-bs-dismiss="modal"
        >
          Your Message has been succesfully sent!
        </button>
        {/* <button type="button" className="btn btn-primary">
          Save changes
        </button> */}
      </div>
    </div>
  </div>
</div>
)
}

export default AlertModal;