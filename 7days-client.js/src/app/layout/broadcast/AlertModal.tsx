import react from 'react';
import { KTSVG } from '../../../resources/helpers';

function AlertModal()  {

  console.log("AlertModal");
  return (
<div className="modal fade" tabIndex={-1} id="modal_broadcast_alert">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-body row align-items-center justify-content-center">
        <i className="bi bi-check-circle fs-5x text-success text-center"></i>
        <div  >
          <h6 className='text-center py-2'>Your Message has been succesfully sent !</h6>
        </div>
        <div className='text-center'>
        <button
          type="button"
          className="btn btn-primary btn-sm fs-5 text py-1"
          data-bs-dismiss="modal"
        >
          Ok, Got it!
        </button>
        </div>
      </div>
      {/* <div className="modal-footer row align-items-center justify-content-center"  > */}
        
        {/* <button type="button" className="btn btn-primary">
          Save changes
        </button> */}
      {/* </div> */}
    </div>
  </div>
</div>
)
}

export default AlertModal;