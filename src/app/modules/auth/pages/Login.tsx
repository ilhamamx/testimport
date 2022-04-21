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

const loginSchema = Yup.object().shape({
  email: Yup.string().required("Login.Error.EmptyEmail"),
  password: Yup.string().required("Login.Error.EmptyPassword"),
});

const initialValues = {
  email: "",
  password: "",
};

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      setTimeout(() => {
        const formEmail = getEmailFromInput(values.email.trim());
        //TODO change login logic into firebase login logic
        login(formEmail, values.password)
          .then((response) => {
            if (response) {
              setLoading(false);
              console.log("success login");
              console.log(response);
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
      }, 1000);
    },
  });

  function getEmailFromInput(input: string) {
    const formatEmail = input.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
      ? input
      : getEmailFromPhoneNumber(input.replaceAll(/[^0-9]/gi, ""));
    return formatEmail;
  }

  //dummy function, should be replaced with actual get from firebase
  function getEmailFromPhoneNumber(phone: string) {
    if(phone.startsWith("0")){
      phone = '62' + phone.substring(1);
    }
    if (phoneValidator(phone) && phone === "6281234567891") {
      return "test1@gmail.com";
    }
    return "";
  }

  //dummy function, should be replaced with actual login from firebase
  function login(email: string, password: string) {
    const DUMMY_USER = [
      {
        id: "m1",
        name: "tes1",
        phone: "6281234567891",
        email: "test1@gmail.com",
        password: "123456",
      },
      {
        id: "m2",
        name: "tes2",
        phone: "6281234567892",
        email: "test2@gmail.com",
        password: "223456",
      },
      {
        id: "m3",
        name: "tes3",
        phone: "6281234567893",
        email: "test3@gmail.com",
        password: "323456",
      },
    ];
    const respJson = DUMMY_USER.find(
      (item) =>
        (item.phone === email || item.email === email) &&
        item.password === password
    );
    return Promise.resolve(respJson);
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
            value=""
            id="login-remember"
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
