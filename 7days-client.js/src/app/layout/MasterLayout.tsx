import React, { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import { Navigate, Routes } from "react-router-dom";
import { Content } from "./Content";
import { toAbsoluteUrl } from "../../resources/helpers/AssetHelpers";
import TextInput from "../../styles/components/TextInput";
import Avatar from "../../styles/components/Avatar";
import { Dropdown } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import "bootstrap/dist/css/bootstrap.min.css";
import "@popperjs/core";
import "bootstrap";
import { useTranslation } from "react-i18next";
import { AsideDefault } from "./aside/AsideDefault";
import { DropdownDefault } from "./dropdown/DropdownDefault";
import { ShortcutBar } from "./Shorcut";
import { deleteUser } from "../modules/auth/redux/AuthSlice";
import { useDispatch } from "react-redux";
import { removeLC, LCName } from "../modules/localstorage/index";
import { logout } from "../../api/index";
import * as Log from "../../util/SDayslogger";
import { Toolbar } from "../layout/toolbar/Toolbar";
import { PageDataProvider } from "./core";
import { CustomHeader } from "./header/CustomHeader"

const MasterLayout = () => {
  const { t } = useTranslation();
  useEffect(() => {
    document.body.classList.add("bg-white");
    return () => {
      document.body.classList.remove("bg-white");
    };
  }, []);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 900px)",
  });

  const dispatch = useDispatch();
  const nav = useNavigate();

  function handleLogout() {
    logout()
      .then(() => {
        dispatch(deleteUser());
        removeLC(LCName.User);
        window.location.reload();
        console.log("succes logout");
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

  function LayoutWeb() {
    return (
      <PageDataProvider>
        <div className="page d-flex flex-column">
          <CustomHeader />
           <div
            className="d-flex flex-row"
            id="kt_wrapper"
          >
              <AsideDefault />
              <div
                id="kt_content"
                className="d-flex flex-column flex-column-fluid" //content 
              >
                
                <Toolbar />
                <div className="post d-flex flex-column-fluid" id="kt_post">
                   {/* <p>Ini content</p> */}
                   <Content>
                     <Outlet />
                   </Content>
                 </div>


              </div>
          </div>
        </div>
      </PageDataProvider>

      // <PageDataProvider>
        // <div className="page d-flex flex-row flex-column-fluid">
        //   <CustomHeader />
        //   <!--
        //   <div
        //     className="d-flex flex-column flex-row-fluid"
        //     id="kt_wrapper"
        //   >
            
        //     <div className="d-flex flex-row">
        //       <AsideDefault />
        //       <div
        //         id="kt_content"
        //         className="content d-flex flex-column flex-column-fluid"
        //       >
        //         {/* <p>Ini Toolbar</p> */}
        //         <Toolbar />

        //         <div className="post d-flex flex-column-fluid" id="kt_post">
        //           {/* <p>Ini content</p> */}
        //           <Content>
        //             <Outlet />
        //           </Content>
        //         </div>
        //       </div>
        //     </div>
        //     <p>Ini footer</p>
        //     {/* <Footer /> */}
        //   </div>
        // </div>
      // </PageDataProvider>
    );
  }

  function LayoutMobile() {
    return (
      // <PageDataProvider>
      <div className="container page d-flex flex-column flex-column-fluid">
        <div className="page d-flex flex-row flex-column-fluid">
          <div
            className="d-flex flex-column flex-row-fluid"
            id="kt_wrapper"
          >
            <nav className="navbar navbar-expand-lg navbar-light">
              <div className="d-flex flex-row list-inline">
                <div className="flex-fill mw-75">
                  <Link to="/dashboard" className="navbar-brand">
                    <img
                      alt="7days"
                      src={toAbsoluteUrl("/media/logos/icon-header-wb.png")}
                      className="img-fluid w-50"
                    ></img>
                  </Link>
                </div>
                <div className="flex-right w-auto">
                  <DropdownDefault />
                </div>
                <div className="flex-right w-auto">
                  <div className="navbar-nav text-right list-inline mb-4 mb-lg-1 d-flex flex-row justify-content-end flex-fill w-auto">
                    <div
                      className="nav-item mt-0 flex-fill w-auto"
                      style={{ display: "flex" }}
                    >
                      <Dropdown style={{ marginLeft: "auto" }}>
                        <Dropdown.Toggle
                          style={{ border: "none" }}
                          className="bg-white align-text-bottom mr-0 ml-auto border-start-0 "
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
                          <Dropdown.Item href="#">Profile</Dropdown.Item>
                          <Dropdown.Item href="#">Setting</Dropdown.Item>
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
                </div>
              </div>
            </nav>
            <div
              id="kt_content"
              className="content d-flex flex-column flex-column-fluid pt-0"
            >
              <div className="post d-flex flex-column-fluid" id="kt_post">
                {/* <p>Ini content</p> */}
                <Content>
                  <Outlet />
                </Content>
              </div>
            </div>
            <p>Ini footer</p>
            {/* <Footer /> */}
          </div>
        </div>

        <ShortcutBar />
      </div>

      //   {/* begin:: Drawers */}
      //   <ActivityDrawer />
      //   <RightToolbar />
      //   <DrawerMessenger />
      //   {/* end:: Drawers */}

      //   {/* begin:: Modals */}
      //   <Main />
      //   <InviteUsers />
      //   <UpgradePlan />
      //   {/* end:: Modals */}
      //   <ScrollTop />
      // </PageDataProvider>
    );
  }

  if (isDesktopOrLaptop) {
    return LayoutWeb();
  } else {
    return LayoutMobile();
  }
};

export { MasterLayout };
