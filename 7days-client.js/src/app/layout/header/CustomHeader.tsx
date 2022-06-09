import React, {FC} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { toAbsoluteUrl } from "../../../resources/helpers/AssetHelpers";
import { useTranslation } from "react-i18next";
import { Dropdown } from "react-bootstrap";
import Avatar from "../../../../src/styles/components/Avatar";
import { useDispatch } from "react-redux";
import { logout } from "../../../api/index";
import * as Log from "../../../util/SDayslogger";
import { deleteUser, setAuth } from "../../modules/auth/redux/AuthSlice";
import * as lc from "../../modules/localstorage/index";
import { setUserOffline } from '../../../api/server/connection';

const CustomHeader: FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const nav = useNavigate();
  function handleLogout() {
    const currentUser = lc.getItemLC(lc.LCName.User);
    const sessionid = lc.getItemLC(lc.LCName.SessionID);
    if (currentUser === null || sessionid === null) {
      dispatch(setAuth(false));
      nav("/auth");
    } else {
      logout()
        .then(() => {
          setUserOffline(currentUser.uid, sessionid);
          dispatch(deleteUser());
          lc.removeSession();
          dispatch(setAuth(false));
          nav("/auth");
        })
        .catch((error) => {
          Log.SDayslogger(
            nav,
            "Testing Error Message",
            Log.SDLOGGER_INFO,
            false,
            true
          );
          console.log("failed logout");
        });
    }
  }
  
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
              <div className="flex-fill">
                <Link to="/dashboard" className="navbar-brand">
                  <img
                    alt="7days"
                    src={toAbsoluteUrl("/media/logos/icon-header-wb.png")}
                    className="img-fluid w-50"
                  ></img>
                </Link>
              </div>
              <div className="flex-fill">
                <div
                  className="collapse navbar-collapse "
                  id="navbarSupportedContent"
                >
                  <div className="d-flex flex-column flex-fill">
                    {/* <div className="flex-fill w-auto"> */}
                    <div className="navbar-nav text-right list-inline mb-4 mb-lg-1 d-flex flex-row justify-content-end flex-fill w-auto">
                      <div className="nav-item mt-4 flex-fill w-auto">
                        <Link
                          to="/dashboard"
                          className="nav-link me-5"
                          aria-current="page"
                          id="link-dashboard"
                        >
                          {t("HeaderBar.Button.Dashboard")}
                        </Link>
                      </div>
                      <div className="nav-item mt-4 flex-fill w-auto">
                        <Link to="/about" className="nav-link" id="link-about">
                          {t("HeaderBar.Button.About")}
                        </Link>
                      </div>
                      <div className="nav-item mt-4 flex-fill w-auto">
                        <Link to="/faq" className="nav-link" id="link-faq">
                          {t("HeaderBar.Button.FAQ")}
                        </Link>
                      </div>
                      <div
                        className="nav-item mt-0 flex-fill w-auto"
                        style={{ display: "flex" }}
                      >
                          <Dropdown style={{ marginLeft: "auto" }}>
                          <Dropdown.Toggle
                            style={{ border: "none" }}
                            className="bg-light align-text-bottom mr-0 ml-auto border-start-0 "
                            id="profile-dropdown"
                          >
                            <Avatar
                              data-testid="avatar"
                              height="30"
                              width="30"
                              imgRadius="0%"
                              imgSrc="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"
                            />
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item href="#" id="dropdwown-profile">
                              Profile
                            </Dropdown.Item>
                            <Dropdown.Item href="#" id="dropdwown-setting">
                              Setting
                            </Dropdown.Item>
                            <Dropdown.Item
                              href="#"
                              onClick={handleLogout}
                              id="dropdown-logout"
                            >
                              Log Out
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                    {/* </div> */}
                    <div className="d-flex flex-fill">
                      <div className="input-group">
                        <input
                          className="form-control border-end-0 border"
                          type="search"
                          placeholder={t("HeaderBar.Input.Search")}
                          id="example-search-input"
                        />
                        <span className="input-group-append">
                          <button
                            className="btn btn-outline-secondary bg-white border-start-0 border ms-n5"
                            type="button"
                          >
                            <i className="fa fa-search"></i>
                          </button>
                        </span>
                      </div>
                      {/* <form className="d-flex flex fill">
                      <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        width="20px"
                        height="20px"
                        // inlineImageLeft='search_icon'
                      />
  
                      <button
                        className="btn btn-outline-secondary ms-n3"
                        type="button"
                      >
                        <i className="fa fa-search"></i>
                      </button>
                    </form> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
    </>
  )
}

export { CustomHeader } ;