import { FC } from "react";
import { useTranslation } from "react-i18next";
import { KTSVG } from "../../../../resources/helpers/components/KTSVG";

import ChatList from "./ChatList";
import { ChatInner } from "./ChatInner";

const ChatWrapper: FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="d-flex flex-column flex-lg-row">
      <div
        className="flex-column flex-lg-row-auto w-100 w-lg-300px w-xl-400px mb-10 mb-lg-0"
        style={{
          backgroundColor: "#F5F7F8",
          border: "1px solid #CDCDDE",
          borderRadius: "8.125px",
        }}
      >
        <div className="card card-flush" style={{ backgroundColor: "#F5F7F8" }}>
          <div className="card-header pt-7" id="kt_chat_contacts_header">
            <form className="w-100 position-relative" autoComplete="off">
              <KTSVG
                path="/media/icons/duotune/general/gen021.svg"
                className="svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 ms-5 translate-middle-y"
              />

              <input
                type="text"
                className="form-control form-control-solid px-15"
                name="search"
                placeholder="Search by username or email..."
                style={{ background: "#FFFFFF" }}
              />
            </form>
          </div>
          <ChatList />
        </div>
      </div>

      <div className="flex-lg-row-fluid ms-lg-7 ms-xl-10">
        <div
          className="card"
          id="kt_chat_messenger"
          style={{
            backgroundColor: "#F5F7F8",
            border: "1px solid #CDCDDE",
            borderRadius: "8.125px",
          }}
        >
          <div className="card-header" id="kt_chat_messenger_header">
            <div className="card-title">
              <div className="symbol-group symbol-hover"></div>
              <div className="d-flex justify-content-center flex-column me-3">
                <a
                  href="#"
                  className="fs-4 fw-bolder text-gray-900 text-hover-primary me-1 mb-2 lh-1"
                >
                  Brian Cox
                </a>
              </div>
            </div>

            <div className="card-toolbar">
              <div className="me-n3">
                <button className="btn btn-primary">
                  <i className="fas fa-plus fs-4 me-2"></i>
                  {t("Chat.Button.AddToContact")}
                </button>
              </div>
            </div>
          </div>
          <ChatInner />
        </div>
      </div>
    </div>
  );
};

export default ChatWrapper;
