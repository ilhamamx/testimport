import { FC, useEffect, useState } from "react";
import { saveMessageMedia } from "../../../../actions/chat";
import { useTranslation } from "react-i18next";
import { RootState } from '../../../../setup/redux/store'
import { useSelector } from "react-redux";

interface ChatMediaProps {
    messageType: string;
    mediaURL: string;
    messageId: string;
    mediaName: string;
    previousMedia:string;
    nextMedia:string;
    currentMedia:string;
  }

const mapState = (state: RootState) => ({ chat: state.Chat })

const ChatFileView: FC<ChatMediaProps> = (props) => {
  const {messageType, mediaURL, messageId, mediaName, nextMedia,currentMedia,previousMedia } = props;

  const { t } = useTranslation();
  useEffect(() => {
    document.body.classList.add('modal-open')
    return () => {
      document.body.classList.remove('modal-open')
    }
  }, [])

  const saveMedia = () => {
    if (mediaURL && mediaName) {
      return saveMessageMedia(mediaURL, mediaName);
    } else {
      return alert(t("HC.Error.FailedUpload"));
    }
  };

  let checkFirst = "justify-content-end";
  if(previousMedia!=="" && previousMedia!==undefined){
    checkFirst = ""
  } 
  console.log("MODAL ID : "+`kt_modal_${messageType}_${messageId}`);
  
  return (
    <div className="modal" tabIndex={-1} id={`kt_modal_${messageType}_${messageId}`}>
    <div className="modal-dialog">
      <div className="modal-content position-absolute bg-dark bg-opacity-75" style={{zIndex:999}}>

        {/* Modal Header */}
        <div className="modal-header" style={{padding: "0px 0px 0px 0px", borderBottom:"0px"}}>
          <div
            className="btn btn-icon btn-sm"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i className="svg-icon svg-icon-2x bi bi-arrow-left" style={{color:"white"}}></i>
          </div>

          <div
            className="btn btn-icon btn-sm"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={saveMedia}
          >
            <div className="svg-icon svg-icon-2x bi bi-download" style={{color:"white"}}></div>
          </div>
        </div>
        {/*End Of Modal Header */}
        
        {messageType === "image" &&
            <img
                className="image"
                src={mediaURL}
                alt={mediaName}
                />
        }
        {messageType === "video" &&
            <video
            src={mediaURL}
            controls
            className = "mh-400px  h-lg-auto w-lg-auto"
            ></video>
        }
        
        {/* Modal Footer */}
        <div className={`modal-header ${checkFirst}`} style={{padding: "0px 0px 0px 0px", borderBottom:"0px"}}>

          {previousMedia !== "" && previousMedia !== undefined && 
          <div
            className="btn btn-icon btn-sm justify-content-center"
            // data-bs-dismiss="modal"
            // aria-label="Close"
            data-bs-toggle="modal"
            data-bs-target={`#${previousMedia}`}
          >
            <i className="svg-icon svg-icon-2x bi bi-arrow-left-circle-fill" style={{color:"white"}}></i>
          </div>}

          {nextMedia !== "" && nextMedia!== undefined && 
          <div
            className="btn btn-icon btn-sm"
            // data-bs-dismiss="modal"
            // aria-label="Close"
            data-bs-toggle="modal"
            data-bs-target={`#${nextMedia}`}
          >
            <i className="svg-icon svg-icon-2x bi bi-arrow-right-circle-fill" style={{color:"white"}}></i>
          </div>}
        </div>
        {/* End Of Modal Footer */}

      </div>
    </div>
  </div>
)};

export { ChatFileView };