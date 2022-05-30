import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Content } from "./Content";
import { toAbsoluteUrl } from "../../resources/helpers/AssetHelpers";
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
import { deleteUser, setAuth } from "../modules/auth/redux/AuthSlice";
import { useDispatch } from "react-redux";
import { logout } from "../../api/index";
import * as Log from "../../util/SDayslogger";
import { setUserOffline } from '../../api/server/connection';
import * as lc from '../modules/localstorage/index';

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
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 900px)" });
  // const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  // const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });
  const dispatch = useDispatch();
  const nav = useNavigate();

  function handleLogout() {
    const currentUser = lc.getItemLC(lc.LCName.User);
    const sessionid = lc.getItemLC(lc.LCName.SessionID);
    if (currentUser === null || sessionid === null) {
      dispatch(setAuth(false));
      nav("/auth")
    }else{
      logout()
        .then(() => {
          setUserOffline(currentUser.uid, sessionid);
          dispatch(deleteUser());
          lc.removeSession()
          dispatch(setAuth(false));
          nav("/auth")
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

  function LayoutWeb() {
    return (
      // <PageDataProvider>
      <div className="page d-flex flex-row flex-column-fluid">
        {/* <h3>{'>>'}</h3> */}
        <div
          className="wrapper d-flex flex-column flex-row-fluid"
          id="kt_wrapper"
        >
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

          <div className="d-flex flex-row">
            <AsideDefault />
            <div
              id="kt_content"
              className="content d-flex flex-column flex-column-fluid"
            >
              <div className="d-flex flex-row-fluid"></div>

              <div>
                {/* <p>Ini Toolbar</p> */}
                {/* <Toolbar /> */}
                <h3>Device Test!</h3>
                {isDesktopOrLaptop && <p>You are a desktop or laptop</p>}
                {isBigScreen && <p>You have a huge screen</p>}
                {isTabletOrMobile && <p>You are a tablet or mobile phone</p>}
                {/* <p>Your are in {isPortrait ? "portrait" : "landscape"} orientation</p> */}
                {/* {isRetina && <p>You are retina</p>} */}
                <div className="post d-flex flex-column-fluid" id="kt_post">
                  {/* <p>Ini content</p> */}
                  <Content>
                    <Outlet />
                  </Content>
                </div>
              </div>
            </div>
          </div>
          <p>Ini footer</p>
          {/* <Footer /> */}
        </div>
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

  function LayoutMobile() {
    return (
      // <PageDataProvider>
      <div className="container page d-flex flex-column flex-column-fluid">
        <div className="page d-flex flex-row flex-column-fluid">
          <div
            className="wrapper d-flex flex-column flex-row-fluid"
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
                <DropdownDefault/>
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
              className="content d-flex flex-column flex-column-fluid"
            >
              {/* <p>Ini Toolbar</p> */}
              {/* <Toolbar /> */}
              <h3>Device Test!</h3>
              {isDesktopOrLaptop && <p>You are a desktop or laptop</p>}
              {isBigScreen && <p>You have a huge screen</p>}
              {isTabletOrMobile && <p>You are a tablet or mobile phone</p>}
              {/* <p>Your are in {isPortrait ? "portrait" : "landscape"} orientation</p> */}
              {/* {isRetina && <p>You are retina</p>} */}
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
