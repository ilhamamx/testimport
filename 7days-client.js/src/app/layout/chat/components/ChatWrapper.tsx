import { FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { KTSVG } from "../../../../resources/helpers/components/KTSVG";
import { useSelector } from "react-redux";
import ChatList from "./ChatList";
import ChatInner from "./ChatInner";
import { useDispatch } from "react-redux";
import { RootState } from "../../../../setup/redux/store";
import * as chat from "../../../modules/chat/redux/ChatSlice";
import { toAbsoluteUrl } from "../../../../resources/helpers";

const ChatWrapper: FC = () => {
  const { t } = useTranslation();
  const [userName, setUserName] = useState("");
  const avatarIcon = "/media/icons/avatar/";

  const selectedChat = useSelector(
    (state: RootState) => state.Chat.selectedChat
  );
  const collabbls = useSelector((state: RootState) => state.Chat.chatList);
  console.log("selected Chat: " + selectedChat);
  console.log("Collaboration List : " + JSON.stringify(collabbls));
  const colabs = collabbls.find((obj) => {
    return obj.id === selectedChat;
  });
  console.log("Selected Colaboration : " + JSON.stringify(colabs));

  useEffect(() => {
    setUserName("Testing");
  }, [userName]);

  return (
    <div className="d-flex flex-column flex-lg-row">
      {/***
       * Chat List Sebelah Kiri
       */}
      <div
        // className="flex-column flex-lg-row-auto w-100 w-lg-300px w-xl-400px mb-10 mb-lg-0"
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
                // placeholder="Search by username or email..."
                placeholder={t("HC.Input.Search")}
                style={{ background: "#FFFFFF" }}
              />
            </form>
          </div>
          <ChatList />
        </div>
      </div>

      {/***
       * Chat List Sebelah Kanan
       */}

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
            {colabs !== undefined && (
              <div className="card-title">
                <span
                  className="symbol symbol-45px symbol-circle"
                  style={{ paddingRight: "10px" }}
                >
                  {
                    colabs?.customerModel?.avatar !== undefined && 
                      <img
                        alt="custom"
                        src={toAbsoluteUrl(`${colabs?.customerModel?.avatar}`)}
                      />
                  }
                  {
                    colabs?.customerModel?.avatar === undefined && (colabs?.customerModel?.gender === undefined || "male" ) &&
                    <img
                      alt="Pic"
                      src={toAbsoluteUrl(`${avatarIcon}m-avatar.png`)}
                    />
                  }
                  {
                    colabs?.customerModel?.avatar === undefined && (colabs?.customerModel?.gender === "female" ) &&
                    <img
                      alt="Pic"
                      src={toAbsoluteUrl(`${avatarIcon}f-avatar.png`)}
                    />
                  }

                  
                </span>
                <div className="d-flex justify-content-center flex-column me-3">
                  <a
                    href="#"
                    className="fs-4 fw-bolder text-gray-900 text-hover-primary me-1 lh-1"
                  >
                    {colabs?.customerModel?.firstName === undefined && `+${colabs?.customerModel?.phoneNumber}`}
                    {colabs?.customerModel?.firstName !== undefined && `${colabs?.customerModel?.firstName} ${colabs?.customerModel?.lastName}`}
                  </a>
                </div>
              </div>
            )}
            {colabs !== undefined && (
              <div className="card-toolbar">
                <div className="me-n3">
                  <button className="btn btn-primary">
                    {
                      colabs?.customerModel?.firstName !== undefined ? (
                        <span><i className="fas fa-plus fs-4 me-2"></i>{t("HC.Button.EditContact")}</span>
                      ) : (
                        <span><i className="bi bi-pencil-fill"></i>{t("HC.Button.AddToContact")}</span>
                      )
                    }
                  </button>
                </div>
              </div>
            )}
          </div>
          {colabs !== undefined && <ChatInner />}
        </div>
      </div>
    </div>
  );
};

export default ChatWrapper;
