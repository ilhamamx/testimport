import { FC } from "react";

interface ChatMediaProps {
  messageType: string;
  mediaURL: string;
  messageId: string;
//   modalId: string;
}

const ChatMediaPreview: FC<ChatMediaProps> = (props) => {
  const messageType = props.messageType;
  const mediaURL = props.mediaURL;
  const messageId = props.messageId;
//   const modalId = props.modalId;

    console.log("Preview Modal >> "+mediaURL);
    
  return (
    <div className="modal fade" tabIndex={-1} id="kt_modal_video">
      <div className="modal-dialog">
        <div
          className="modal-content position-absolute bg-dark bg-opacity-75"
          style={{ zIndex: 999 }}
        >
          <div className="modal-header" style={{ padding: "0px 0px 0px 0px" }}>
            <div
              className="btn btn-icon btn-sm"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i
                className="svg-icon svg-icon-2x bi bi-arrow-left"
                style={{ color: "white" }}
              ></i>
            </div>

            <div
              className="btn btn-icon btn-sm"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i
                className="svg-icon svg-icon-2x bi bi-download"
                style={{ color: "white" }}
              ></i>
            </div>
          </div>
          <video
            src={mediaURL}
            controls
          ></video>
          <div className="modal-header" style={{ padding: "0px 0px 0px 0px" }}>
            <div
              className="btn btn-icon btn-sm"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i
                className="svg-icon svg-icon-2x bi bi-arrow-left-circle-fill"
                style={{ color: "white" }}
              ></i>
            </div>

            <div
              className="btn btn-icon btn-sm"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i
                className="svg-icon svg-icon-2x bi bi-arrow-right-circle-fill"
                style={{ color: "white" }}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMediaPreview;
