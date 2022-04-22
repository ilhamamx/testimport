import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import Button from "../../../../styles/components/Button";
import TextInput from "../../../../styles/components/TextInput";
import { useTranslation } from "react-i18next";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";

const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "PasswordEntry.Error.Under8Char")
    .required("PasswordEntry.Error.NewPasswordEmpty")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "PasswordEntry.Error.ExcludeNumber"
    ),
  confirmpassword: Yup.string()
    .min(8, "PasswordEntry.Error.Under8Char")
    .required("PasswordEntry.Error.ConfirmPasswordEmpty"),
});

const initialValues = {
  password: "",
  confirmpassword: "",
};

//TODO
//Still use dummy function and data, need to be update when do ResetPassword Task
function validateRequest(tokenP: string) {
  const DUMMY_TOKEN = [
    {
      id: "1000001",
      token: "abc123",
    },
    {
      id: "1000002",
      token: "test123",
    },
    {
      id: "1000003",
      token: "test123456789",
    },
    {
      id: null,
      token: "error123456",
    },
  ];
  const respJson = DUMMY_TOKEN.find((data) => data.token === tokenP);
  return respJson?.id;
}

function getNewPasswordFromInput(input: string) {
  const newpassword = input;
  return newpassword;
}

function resetPassword(password: string, confirmpassword: string) {
  if (password !== confirmpassword) {
    return Promise.resolve();
  }
  const DUMMY_NEWPASSWORD = [
    {
      rconfirmpassword: confirmpassword,
      rpassword: password,
    },
  ];
  const respJson = DUMMY_NEWPASSWORD.find(
    (item) =>
      (item.rpassword === password || item.rpassword === confirmpassword) &&
      item.rpassword === password
  );
  return Promise.resolve(respJson);
}

export function ResetPassword() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined);
  const formik = useFormik({
    initialValues,
    validationSchema: resetPasswordSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      setHasErrors(undefined);
      setTimeout(() => {
        const newpassword = getNewPasswordFromInput(values.password);
        const confirmpassword = getNewPasswordFromInput(values.confirmpassword);
        resetPassword(newpassword, confirmpassword).then((response) => {
          if (response) {
            setHasErrors(false);
            setLoading(false);
            console.log("success change password");
            console.log(response);
            nav("/auth/reset-password-success");
          } else {
            console.log("r-new: " + newpassword);
            console.log("c-new: " + confirmpassword);
            setHasErrors(true);
            setLoading(false);
            setSubmitting(false);
            setStatus(`{t("PasswordEntry.Notif.WrongPassword")}`);
          }
        });
      }, 1000);
    },
  });

  const [searchParams] = useSearchParams();
  const tokenRequest = searchParams.get("token");
  const isValid = validateRequest(tokenRequest!);

  function formResetPassword() {
    return (
      <div>
        <form
          className="form w-100"
          onSubmit={formik.handleSubmit}
          // noValidate
          id="reset-password-form"
        >
          {/* begin::Heading */}
          <div className="text-center mb-10">
            <h1 className="text-dark mb-3">
              {t("PasswordEntry.Info.ChangePassword")}
            </h1>
          </div>
          {hasErrors === true && (
            <div className="mb-lg-15 alert alert-danger">
              <div className="alert-text font-weight-bold">
                {t("PasswordEntry.Notif.WrongPassword")}
              </div>
            </div>
          )}
          {/* begin::Heading */}
          <div className="fv-row mb-10">
            <label className="form-label fs-6 fw-bolder text-dark">
              {t("PasswordEntry.Input.NewPassword")}
            </label>
            <TextInput
              id="rpassword-new"
              type="password"
              formcontrol={"solid"}
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <div
                className="fv-plugins-message-container"
                id="rpassword-error"
              >
                <span role="alert">{t(`${formik.errors.password}`)}</span>
              </div>
            )}
          </div>
          <div className="fv-row mb-10">
            <label className="form-label fs-6 fw-bolder text-dark">
              {t("PasswordEntry.Input.ConfirmPassword")}
            </label>
            <TextInput
              id="rpassword-confirm"
              type="password"
              formcontrol={"solid"}
              autoComplete="off"
              {...formik.getFieldProps("confirmpassword")}
              onPaste={(e: Event) => {
                e.preventDefault();
                return false;
              }}
            />
            {formik.touched.confirmpassword && formik.errors.confirmpassword && (
              <div
                className="fv-plugins-message-container"
                id="rpassword-confirmerror"
              >
                <span role="alert">
                  {t(`${formik.errors.confirmpassword}`)}
                </span>
              </div>
            )}
          </div>
          <div className="text-center">
            <Button
              id="rpassword-submit"
              btnlg="primary"
              type="submit"
              cName="w-75"
              disabled={formik.isSubmitting || !formik.isValid}
            >
              <span className="indicator-label">
                {t("ForgotPassword.Button.Submit")}
              </span>
              {loading && (
                <span className="indicator-progress">
                  {t("Login.Button.Loading")}
                  <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
    );
  }
  try {
    if (isValid === null)
      throw new Error("Erorr not valid");
    if (isValid !== null && isValid !== undefined) {
      return formResetPassword();
    } else {
      return <Navigate to={"/login"} />;
    }
  } catch (error) {
    console.log("error : " + error);
    return <Navigate to={"/error/500"} />;
  }
}
