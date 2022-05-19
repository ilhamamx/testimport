import React, { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
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
import { ShortcutBar } from "./Shorcut";

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
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });


  function LayoutWeb() {
    return (
      // <PageDataProvider>
      <div className="page d-flex flex-row flex-column-fluid">
        {/* <h3>{'>>'}</h3> */}
        <img
          alt="arroy-right"
          src="data:image/png;base64,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"
          style={{
            width: "25px",
            height: "25px",
            marginTop: "50px",
            marginLeft: "15px",
          }}
        ></img>
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
                            <Dropdown.Item href="#" id="dropdwown-logout">
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
                  <img
                    alt="arroy-right"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAMFBMVEX///8AAADl5eX09PTV1dUICAiurq5TU1Orq6tJSUnc3Nzt7e1ERET6+vpRUVG9vb0gCS9GAAAA8ElEQVR4nO3dOQ4CQRAEQZblPv//W2yUFsLoNSKekGb1SLPbAQAAAAAAAAAAAADfbodh9+kC9ViGXaYL1Hm6yWm6QGlSmpQmpUlpUpqUJqVJaVKalCalSWlSmpQmpUlpUpqUJnWdbrLBjXqd9pwuAAAAAMCvzstx1Ba3x9f09rjBJjbq0qQ0KU1Kk9KkNClNSpPSpDQpTUqT0qQ0KU1Kk9KkNClvQet9mnW5TRcAAAAAgP/d98PW6QJljy27fWlSmpQmpUlpUpqUJqVJaVKalCalSWlSmpQmpUlpUpqUJuWPs3LLAAAAAAAAAAAAAGAbPhzZL1DD5UvKAAAAAElFTkSuQmCC"
                    style={{
                      width: "30px",
                      height: "30px",
                      marginTop: "10px",
                      marginRight: "3px",
                    }}
                  ></img>
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
                          <Dropdown.Item href="#">Log Out</Dropdown.Item>
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
