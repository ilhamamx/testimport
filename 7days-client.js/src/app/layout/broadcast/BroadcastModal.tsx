import react, { useState, useEffect } from "react";
import { ID, KTSVG } from "../../../resources/helpers";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  HandledMessageListItem as Mcollaboration,
  Templates,
  Language,
  Account,
  Customer,
  Message,
  MessageStatus,
} from "../chat/models/ChatItem.model";
import { createRef } from "../../../db/connection";
import * as server from "../../../api/server/templateMessage";
import * as serviceMessage from "../../../db/serviceMessage";
import * as serviceCustomer from "../../../db/serviceCustomer";
import * as serviceTemplate from "../../../db/serviceTemplate";
import * as serviceCollaboration from "../../../db/serviceCollaborations";
import * as lc from "../../../app/modules/localstorage/index";
import * as serviceAccount from "../../../db/serviceAccount";
import { useTranslation } from "react-i18next";
import { Timestamp } from "../../../db";
import AlertModal from "./AlertModal";

interface IProps {
  customerId: ID;
  indexId: number;
  onSuccessSubmit: () => void;
}

function BroadcastModal(props: IProps) {
  const { t } = useTranslation();
  const [disable, setDisable] = useState(true);
  const [schedule, setSchedule] = useState(true);
  const companyID = lc.getItemLC("CID");
  const userID = lc.getItemLC("UID");

  // list templates
  const [templates, setTemplates] = useState<Templates[]>([]);
  const [templateLanguage, setTemplateLanguage] = useState<Language[]>();
  const [template, setTemplate] = useState<Language>();

  // on render, set dropdown id "template-title" list
  useEffect(() => {
    console.log("customer id x: ", props.customerId);
    serviceTemplate
      .getListTemplateByCompany(companyID)
      .then(async (listTemplate) => {
        const newTemplate = await Promise.all(
          listTemplate.map(async (template) => {
            return template as Templates;
          })
        );
        setTemplates(newTemplate);
      });
  }, []);

  const optionTemplate = templates.map((template) => {
    console.log("ini templet ===>>>" + template);

    return (
      <option key={template.id} value={template.id}>
        {template.templateName}
      </option>
    );
  });

  const onChangeTemplate = (e: any) => {
    console.log("customer id y: ", props.customerId);

    console.log("ini template ===>>>" + e.target.value);
    const templateId = e.target.value;
    setDisable(true);
    setTemplateLanguage(undefined);
    formik.setFieldValue("body_message", "");
    formik.setFieldValue("body_param", []);
    if (templateId !== "") {
      formik.setFieldValue("templateTitle", e.target.selectedOptions[0].text);
      // fill language list from Template on templates
      serviceTemplate
        .getLanguageListByTemplateId(templateId)
        .then((listLanguage) => {
          setDisable(false);
          const newLanguage = listLanguage.map((language) => {
            return language as Language;
          });
          setTemplateLanguage(newLanguage);
        });
    }
    setTemplate(undefined);
  };

  const optionLanguage = templateLanguage?.map((language) => {
    console.log("ini language ===>>>" + language);
    return (
      <option key={language.id} value={language.id}>
        {language.language}
      </option>
    );
  });

  const onChangeLanguage = (e: any) => {
    console.log("ini language ===>>>" + e.target.value);
    const languageId = e.target.value;
    setTemplate(undefined);
    formik.setFieldValue("body_param", []);
    if (languageId !== "") {
      formik.setFieldValue(
        "templateLanguage",
        e.target.selectedOptions[0].text
      );
      templateLanguage?.map((language) => {
        if (language.id === languageId) {
          formik.setFieldValue("body_message", language.body);
          setTemplate(language);
        }
      });
    }
  };

  const onSubmitBroadcast = (e: any) => {
    console.log("ini submit broadcast ===>>>" + JSON.stringify(formik.values));
    // get active collaboration by customerId and companyId
    let collaboration: Mcollaboration | undefined;
    console.log("ini customerId ===>>>" + props.customerId?.toString());
    serviceCollaboration
      .getActiveCollaborationByCustomerIdAndCompanyId(
        props.customerId!.toString(),
        companyID
      )
      .then((collaborations) => {
        console.log("ini collaboration ===>>>" + collaborations);
        if (collaborations && collaborations.length > 0) {
          collaboration = collaborations[0] as Mcollaboration;
          console.log("ini collaboration ===>>>" + collaboration.id);
        }
        // get active account by companyID and type whatsapp
        let account: Account | undefined;
        serviceAccount
          .getAccountByCompanyAndChannel(companyID, "whatsapp")
          .then((accounts) => {
            console.log("1 ini account ====>>" + accounts);
            if (accounts) {
              account = accounts[0] as Account;
              console.log("2 ini account ====>> " + account.id);
            }
            // get customer by id
            let customer: Customer | undefined;
            serviceCustomer
              .getCustomerByID(props.customerId!.toString())
              .then((customers) => {
                console.log("ini customer ====>>" + customers);
                if (customers) {
                  customer = customers as Customer;
                  console.log("ini customer ====>> " + customer.id);
                }
                console.log("ini customer ====>> " + customer);
                console.log("ini account ====>> " + account);
                console.log("ini collaboration ====>> " + collaboration);
                if (collaboration && account && customer) {
                  // create new model Message
                  let newMessage: Message = {
                    channel: "whatsapp",
                    createdAt: Timestamp.now(),
                    updatedAt: Timestamp.now(),
                    isActive: true,
                    destination: "outbound",
                    customer: collaboration.customer,
                    user: collaboration.toUser,
                    messageType: "template",
                    textContent: formik.values.body_message,
                    templateName: formik.values.templateTitle,
                    templateLanguage: formik.values.templateLanguage,
                    body: template?.body,
                    bodyParams: formik.values.body_param,
                    voice: false,
                    collaboration: createRef(
                      "collaborations",
                      collaboration.id
                    ),
                  };
                  console.log(
                    "ini newMessage ====>> " + JSON.stringify(newMessage)
                  );

                  sendBroadcast(
                    newMessage,
                    companyID,
                    account.whatsappNumber,
                    customer.phoneNumber
                  );
                }
              });
          });
      });
  };

  const formSchema = Yup.object().shape({
    templateTitle: Yup.string(),
    templateLanguage: Yup.string(),
  });

  const initialValues = {
    templateTitle: "",
    templateLanguage: "",
    body_message: "",
    body_param: [],
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: formSchema,
    onSubmit: (values) => {
      console.log("ini values ===>>>" + JSON.stringify(values));
    },
  });

  const sendBroadcast = (
    Mmessage: Message,
    companyID: string,
    from: string,
    to: string
  ) => {
    server
      .sendRequestMessage(
        Mmessage.channel,
        companyID,
        from,
        to,
        Mmessage.templateName!,
        Mmessage.templateLanguage!,
        Mmessage.bodyParams!,
        (responseCode: string, responseJson: JSON) => {
          console.log("ini responseCode ===>>>" + responseCode);
          console.log("ini responseJson ===>>>" + JSON.stringify(responseJson));
          Mmessage.responseCode = responseCode ?? "500";
          if (responseJson) {
            let newResponseJson = JSON.parse(JSON.stringify(responseJson));
            Mmessage.resultCode = newResponseJson.resultCode ?? "";
            Mmessage.resultMessage = newResponseJson.message ?? "";
            Mmessage.resultMessageId = newResponseJson.messageID ?? "";
            Mmessage.errorCode = newResponseJson.errorCode ?? "";
            if (newResponseJson.error)
              Mmessage.responseJson = JSON.stringify(newResponseJson);
            if (newResponseJson.whatsapp)
              Mmessage.responseJson = newResponseJson.whatsapp ?? "";
          } else {
            Mmessage.messageStatus = MessageStatus.failed;
            Mmessage.resultMessage =
              "No response or reponsecode from server side.";
          }
          serviceMessage.createMessage(Mmessage);
          onClose();

                  let triggerDummyButtonClose = document.getElementById(
                    `close-modal${props.indexId}`
                  );
                  triggerDummyButtonClose?.click();

          if(responseCode === "200"){
            props.onSuccessSubmit();
          }

        }
      )
      .then((response) => {})
      .catch(function (error) {
        console.log("Error : " + error);
        Mmessage.messageStatus = MessageStatus.failed;
        Mmessage.resultMessage = error.message;
        serviceMessage.createMessage(Mmessage);
      });
  };
  const onClose = () => {
    // setTemplates([]);
    let titleSelected = document.getElementById(
      `title${props.indexId}`
    ) as HTMLSelectElement;
    titleSelected.value = "";
    setTemplate(undefined);
    setTemplateLanguage(undefined);
    formik.setFieldValue("templateTitle", "");
    formik.setFieldValue("templateLanguage", "");
    formik.setFieldValue("body_message", "");
    // formik.setFieldValue("body_param", [])
    console.log("ini close modal ===>>", templates);
    setDisable(true);
  };

  return (
    <form
      id="modal-broadcast"
      // className="form"
      // onSubmit={formik.handleSubmit}
    >
      <div
        className="modal fade"
        tabIndex={-1}
        id={`broadcast_user_modal${props.indexId}`}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <div>
                <h4 className="text-center">{t("BS.Title.BroadcastSetup")}</h4>
              </div>
              <div
                className="btn btn-icon btn-sm btn-active-light-primary ms-2"
                id={`close-modal${props.indexId}`}
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={onClose}
              >
                <KTSVG
                  path="/media/icons/duotune/arrows/arr061.svg"
                  className="svg-icon svg-icon-2x"
                />
              </div>
            </div>
            <div className="modal-body scroll-y mx-5 mx-xl-1 my-7">
              <div className="form">
                <div className="pt-2 mb-5">
                  <h6 className="text-start">{t("BS.Info.TemplateTitle")}</h6>
                  <select
                    className="form-select form-control form-control-solid mb-3 mb-lg-0"
                    id={`title${props.indexId}`}
                    onChange={onChangeTemplate}
                  >
                    <option key="" value="">
                      {t("BS.Input.Templatetitle")}
                    </option>
                    {optionTemplate}
                  </select>
                </div>
                <div className="pt-2 mb-5">
                  <h6 className="text-start">{t("BS.Info.Languages")}</h6>
                  <select
                    className="form-select form-control form-control-solid mb-3 mb-lg-0"
                    onChange={onChangeLanguage}
                    disabled={disable}
                  >
                    <option value="">{t("BS.Input.Languages")} . . .</option>
                    {optionLanguage}
                    {/* <option diambil dari firebase template tergantung dengan template yang di select */}
                  </select>
                </div>
                <div className="pt-2 mb-5">
                  <h6 className="text-start">{t("BS.Info.BodyMessage")}</h6>
                  {/* <label className="form-label">Body Message</label> */}
                  <textarea
                    className="form-control"
                    id="body-message"
                    {...formik.getFieldProps("body_message")}
                    disabled
                    value={formik.getFieldProps("body_message").value ?? ""}
                  >
                    {" "}
                  </textarea>
                  {/* diambil dari body template berdasarkan language yang dipilih */}
                </div>
                <div className="pt-2 mb-3">
                  {template?.bodyParamCount ?? 0 > 0 ? (
                    <div>
                      <h6 className="text-start">{t("BS.Input.Parameter")}</h6>
                      {
                        //make a loop to generate input parameter as much as bodyParamCount number
                        //make a controlled input element for each parameter
                        Array.from(
                          { length: template?.bodyParamCount ?? 0 },
                          (_, index) => (
                            <div key={index} className="pb-2">
                              <input
                                type="text"
                                aria-label="default input example"
                                className="form-control"
                                placeholder={`Parameter {{${index + 1}}}`}
                                id={`body-parameter-${index + 1}`}
                                {...formik.getFieldProps(
                                  `body_param[${index}]`
                                )}
                                value={
                                  formik.getFieldProps(`body_param[${index}]`)
                                    .value ?? ""
                                }
                                required={true}
                                onChange={(e) => {
                                  let message_body = template?.body ?? "";
                                  message_body = message_body.replace(
                                    `{{${index + 1}}}`,
                                    e.target.value
                                  );
                                  formik.setFieldValue(
                                    `body_param[${index}]`,
                                    e.target.value
                                  );
                                  if (formik.values.body_param.length > 0) {
                                    for (
                                      let i = 0;
                                      i < formik.values.body_param.length;
                                      i++
                                    ) {
                                      message_body = message_body.replace(
                                        "{{" + (i + 1) + "}}",
                                        formik.values.body_param[i]
                                      );
                                    }
                                  }
                                  formik.setFieldValue(
                                    "body_message",
                                    message_body
                                  );
                                }}
                              />
                            </div>
                          )
                        )
                      }
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="mb-5">
                  <div className="form-check form-switch form-check-custom form-check-solid me-10">
                    <h6 className="pe-2 text-start mt-3">
                      {t("BS.Info.Scheduled time")}
                    </h6>
                    <input
                      className="form-check-input h-20px w-30px ps-2"
                      type="checkbox"
                      value=""
                      id="flexSwitch20x30"
                      onChange={() => {
                        setSchedule(!schedule);
                      }}
                    />
                  </div>
                  <div className="text-start">
                    <input
                      className="px-2 pe-2"
                      type="datetime-local"
                      id="schedule"
                      {...formik.getFieldProps("schedule")}
                      name="schedule"
                      disabled={schedule}
                    ></input>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={onSubmitBroadcast}
                className="btn btn-primary"
                disabled={
                  //if any null or "" in body_param, disable submit button
                  formik.getFieldProps("body_param").value.includes("") ||
                  formik.getFieldProps("body_param").value.includes(null)
                    ? true
                    : //if body_param is not equal to bodyParamCount, disable submit button
                    template?.bodyParamCount !==
                      formik.getFieldProps("body_param").value.length
                    ? true
                    : //if body_param is equal to bodyParamCount, enable submit button
                      false
                }
              >
                <KTSVG
                  path="/media/icons/duotune/general/gen016.svg"
                  className="svg-icon svg-icon-2x"
                />
                {t("BS.Button.SendMessage")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default BroadcastModal;
