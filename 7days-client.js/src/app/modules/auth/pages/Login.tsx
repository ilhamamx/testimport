/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import Button from "../../../../styles/components/Button";
import TextInput from "../../../../styles/components/TextInput";
import { useTranslation } from "react-i18next";
import { phoneValidator } from "../../validators/InputValidator";
import { useNavigate } from "react-router-dom";
import * as Sentry from "@sentry/react";
import { getEmailFromPhone } from "../../../../api/server/users";

import * as api from "../../../../api"
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../redux/AuthSlice";

const loginSchema = Yup.object().shape({
  email: Yup.string().required("Login.Error.EmptyEmail"),
  password: Yup.string().required("Login.Error.EmptyPassword"),
});

const initialValues = {
  email: "",
  password: "",
  isrememberme: false,
};

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/
function showError () {
  
}



export function Login() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      setTimeout(() => {
        const formEmail = getEmailFromInput(values.email.trim(), (email, error) => {
            //TODO change login logic into firebase login logic
        if (!email)
          {
            setLoading(false);
            setSubmitting(false);
            setStatus(`${t("Login.Notif.IncorrectUser")}`);
            return ;
          }
          console.log('email : ' + email+" - rememberme : "+values.isrememberme );
        login(email, values.password,values.isrememberme)
        .then((response) => {
          if (response) {
            setLoading(false);
            dispatch(setAuth(true));
            console.log("success login");
            console.log(response);
            Sentry.setContext("User", {
              name: formEmail,
              // session: "test-session",
            });
                      
            
            nav("/dashboard");
          } else {
            setLoading(false);
            setSubmitting(false);
            setStatus(`${t("Login.Notif.IncorrectUser")}`);
          }
        })
        .catch(() => {
          setLoading(false);
          setSubmitting(false);
          setStatus(`${t("Login.Notif.IncorrectUser")}`);
        });
        });
        
      }, 1000);
    },
  });

  function  getEmailFromInput(input: string, 
    callback: (email:string | null, error:string | null) => void) {

    const isEmail = input.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
    if (isEmail) {
      callback(input, null);
      return Promise.resolve(input);
    }
      
    
    const email = getEmailFromPhoneNumber(
      input.replaceAll(/[^0-9]/gi, ""), 
      callback);
    return email;
  }
  
  //dummy function, should be replaced with actual get from firebase
  function getEmailFromPhoneNumber(
    phone: string, callback: (email:string | null, error:string | null) => void) {
    
    if(phone.startsWith("0")){
      phone = '62' + phone.substring(1);
    }
    
    if (phoneValidator(phone)) {
      
      return getEmailFromPhone(phone).then((email) => {
        
        callback(email, null)
        return email;
      }).catch(() => {
        callback(null, "")
        return "";
      });
    }
    
    callback(null, "")
    return "";
  }

  //dummy function, should be replaced with actual login from firebase
  function login(email: string, password: string, isRememberme:true|false):Promise<string> {
    console.log(`login with email ${email} and password ${password}`);
    return api.login(email, password, isRememberme)

  }

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <form
      className="form w-100"
      onSubmit={formik.handleSubmit}
      noValidate
      id="kt_login_signin_form"
    >
      {/* begin::Heading */}
      <div className="text-center mb-10">
        <h1 className="text-dark mb-3">{t("Login.Info.SignIn")}</h1>
        <div className="text-gray-400 fw-bold fs-4">
          {t("Login.Info.Registration")}
          <Link to="/auth/registration" className="link-primary fw-bolder">
            {t("Login.Link.Registration")}
          </Link>
        </div>
      </div>
      {/* begin::Heading */}

      {formik.status ? (
        <div className="mb-lg-15 alert alert-danger">
          <div className="alert-text font-weight-bold">{formik.status}</div>
        </div>
      ) : null}

      {/* begin::Form group */}
      <div className="fv-row mb-10">
        <label className="form-label fs-6 fw-bolder text-dark">
          {t("Login.Input.User")}
        </label>
        <TextInput
          data-testid="email"
          placeholder=""
          {...formik.getFieldProps("email")}
          formcontrol={"solid"}
          name="email"
          autoComplete="off"
          id="login-email"
        />
        {formik.touched.email && formik.errors.email && (
          <div
            data-testid="emailerror"
            className="fv-plugins-message-container"
          >
            <span role="alert">{t(`${formik.errors.email}`)}</span>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className="fv-row mb-10">
        <div className="d-flex justify-content-between mt-n5">
          <div className="d-flex flex-stack mb-2">
            {/* begin::Label */}
            <label className="form-label fw-bolder text-dark fs-6 mb-0">
              Password
            </label>
            {/* end::Label */}
            {/* begin::Link */}
            <Link
              to="/auth/forgot-password"
              className="link-primary fs-6 fw-bolder"
              style={{ marginLeft: "5px" }}
            >
              {t("Login.Link.ForgotPassword")}
            </Link>
            {/* end::Link */}
          </div>
        </div>
        <div className="input-group mb-3">
          <TextInput
            data-testid="password"
            type={passwordShown ? "text" : "password"}
            autoComplete="off"
            {...formik.getFieldProps("password")}
            formcontrol={"solid"}
            id="login-password"
          />
          <i
            onClick={togglePassword}
            className={`input-group-text border-0 bi ${
              passwordShown ? "bi-eye" : "bi-eye-slash"
            }`}
          ></i>
        </div>
        {formik.touched.password && formik.errors.password && (
          <div
            data-testid="passworderror"
            className="fv-plugins-message-container"
          >
            <div>
              <span role="alert">{t(`${formik.errors.password}`)}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* start::Remember me checkbox group */}
      <div className="fv-row mb-10 mt-n5">
        <div className="form-check form-check-custom form-check-solid">
          <input
            className="form-check-input"
            type="checkbox"
            // value=""
            id="login-remember"
            {...formik.getFieldProps("isrememberme")}
          />
          <label className="form-check-label" htmlFor="login-remember">
            {t("Login.Checkbox.Rememberme")}
          </label>
        </div>
      </div>
      {/* end::Remember me checkbox group */}

      {/* begin::Action */}
      <div className="text-center">
        <Button
          id="login-button"
          btnlg="primary"
          type="submit"
          disabled={formik.isSubmitting || !formik.isValid}
          cName="w-100 mb-5"
        >
          {!loading && (
            <span className="indicator-label">{t("Login.Button.Login")}</span>
          )}
          {loading && (
            <span className="indicator-progress" style={{ display: "block" }}>
              {t("Login.Button.Loading")}
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          )}
        </Button>
      </div>
      {/* end::Action */}
    </form>
  );
}
