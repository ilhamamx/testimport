import react, { useState, useEffect } from "react";
import { ID, KTSVG } from "../../../resources/helpers";
import { useFormik } from "formik";
import {
  HandledMessageListItem,
  Templates,
  Language,
} from "../chat/models/ChatItem.model";
import { createRef } from "../../../db/connection";
import * as server from "../../../api/server/templateMessage";
import * as serviceMessage from "../../../db/serviceMessage";
import * as serviceTemplate from "../../../db/serviceTemplate";
import * as lc from "../../../app/modules/localstorage/index";

interface IProps {
  customerId: ID;
}

function BroadcastModal(props: IProps) {
  const [disable, setDisable] = useState(true);
  const [schedule, setSchedule] = useState(true);
  const companyID = lc.getItemLC("CID");
  const userID = lc.getItemLC("UID");

  // list templates
  const [templates, setTemplates] = useState<Templates[]>([]);
  const [templateLanguage, setTemplateLanguage] = useState<Language[]>();
  const [template, setTemplate] = useState<Language>();

  // component parameter


  // on render, set dropdown id "template-title" list
  useEffect(() => {
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
    console.log("ini template ===>>>" + e.target.value);
    const templateId = e.target.value;
    // enable language list
    setDisable(false);
    // fill language list from Template on templates
    serviceTemplate
      .getLanguageListByTemplateId(templateId)
      .then((listLanguage) => {
        const newLanguage = listLanguage.map((language) => {
          return language as Language;
        });
        setTemplateLanguage(newLanguage);
      });
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
    templateLanguage?.map((language) => {
      if (language.id === languageId) {
        setTemplate(language);
      }
    });
  };

  // generate parameter input html by bodyParamCount on selected template language
  const generateParameter = () => {
    return <div> test </div>
    
    // const bodyParamCount = template?.bodyParamCount ?? 0;
    // let bodyParam = '';
    // for (let i = 0; i < bodyParamCount; i++) {
    //   bodyParam +=
    //     <div className="pt-2" key={i}>
    //       <input
    //         className="form-control"
    //         type="text"
    //         placeholder={`Enter content for {{${i}}}`}
    //         aria-label="default input example"
    //         {...formik.getFieldProps(`bodyParam${i}`)}
    //         disabled={disable}
    //       ></input>
    //     </div>
    //   ;
    // }
    // //return component bodyParam as component react
    // return bodyParam;

  };

  const formik = useFormik({
    initialValues: {
      title: "",
      language: "",
      params: [],
    },
    onSubmit: (values) => {
      // TODO: check tile and language is not null
      // if param is not null, check if param is valid
      // get active collaboration by selected customer
      let collaboration: HandledMessageListItem;

      // get account by company and channel
      // put input parameters into array String

      //Create New Message Model
      // let newMessage: Message = {
      //   channel: "whatsapp",
      //   createdAt: Timestamp.now(),
      //   updatedAt: Timestamp.now(),
      //   isActive: true,
      //   destination: "outbound",
      //   customer: collaboration?.customer,
      //   user: collaboration?.toUser,
      //   messageType: "template",
      //   textContent: values.message,
      //   templateName: values.title,
      //   templateLanguage: values.language,
      //   body: selectedTemplate.body,
      //   bodyParams:
      //   voice: false,
      //   collaboration: createRef("collaborations", collaboration?.id)
      // };

      console.log(values);
    },
  });

  // const sendBroadcast = (Mmessage: Message, companyID: string, from, to) => {
  //   server.sendRequestMessage(
  //     Mmessage.channel,
  //     companyID,
  //     from,
  //     to,
  //     Mmessage.templateName,
  //     Mmessage.templateLanguage,
  //     Mmessage.bodyParams
  //   ).then((response) => {
  //     const resp = JSON.parse(response);
  //     if (resp.responseCode && resp.response) {
  //       if(resp.responseCode!==""){
  //         Mmessage.responseCode=resp.responseCode;
  //       }
  //       if (resp.response!=="") {
  //         let tempResponse = resp.response;
  //         const messageChannel = Mmessage.channel;
  //         if (tempResponse.resultCode && resp.resultCode!=="") {
  //           Mmessage.resultCode = tempResponse.resultCode;
  //         }
  //         if (tempResponse.message && resp.message!=="") {
  //           Mmessage.resultMessage = tempResponse.message;
  //         }
  //         if (tempResponse.messageID && resp.messageID!=="") {
  //           Mmessage.resultMessageId = tempResponse.messageID;
  //         }
  //         if (tempResponse.errorCode && resp.errorCode!=="") {
  //           Mmessage.errorCode = tempResponse.errorCode;
  //         }
  //         if(Mmessage.channel==="whatsapp"){
  //           if (tempResponse.whatsapp && resp.whatsapp!=="") {
  //             Mmessage.responseJson = tempResponse.whatsapp;
  //           }
  //         }
  //       }
  //       return message.createMessage(Mmessage);
  //     } else if (resp.responseCode && !resp.response) {
  //       if(resp.responseCode && resp.responseCode!==""){
  //         Mmessage.responseCode= resp.responseCode;
  //       }
  //     } else {
  //       Mmessage.messageStatus = MessageStatus.failed;
  //       Mmessage.resultMessage = "No response or reponsecode from server side."
  //       return message.createMessage(Mmessage);
  //     }
  //   }).catch(
  //     function (error) {
  //       console.log("Error : "+error);
  //       Mmessage.messageStatus = MessageStatus.failed;
  //       Mmessage.resultMessage = error.message
  //       return message.createMessage(Message);
  //     }
  //   ) ;
  // }

  return (
    <form
    // id="kt_modal_add_user_form"
    // className="form"
    // onSubmit={formik.handleSubmit}
    >
      <div className="modal fade" tabIndex={-1} id="broadcast_user_modal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <div>
                <h4 className="text-center">Broadcast Setup</h4>
              </div>
              <div
                className="btn btn-icon btn-sm btn-active-light-primary ms-2"
                data-bs-dismiss="modal"
                aria-label="Close"
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
                  <h6 className="text-start">Template Title</h6>
                  <select
                    className="form-select form-control form-control-solid mb-3 mb-lg-0"
                    name="template-title"
                    id="template-title"
                    onChange={onChangeTemplate}
                  >
                    <option value="">Select Template</option>
                    {optionTemplate}
                  </select>
                </div>
                <div className="pt-2 mb-5">
                  <h6 className="text-start">Language</h6>
                  <select
                    className="form-select form-control form-control-solid mb-3 mb-lg-0"
                    {...formik.getFieldProps("template-title")}
                    name="language"
                    onChange={onChangeLanguage}
                    disabled={disable}
                  >
                    <option value="">Select Language . . .</option>
                    {optionLanguage}
                    {/* <option diambil dari firebase template tergantung dengan template yang di select */}
                  </select>
                </div>
                <div className="pt-2 mb-5">
                  <h6 className="text-start">Body Message</h6>
                  {/* <label className="form-label">Body Message</label> */}
                  <textarea
                    className="form-control"
                    id="body-message"
                    {...formik.getFieldProps("body-message")}
                    disabled
                    value={template ? template.body : ""}
                  >
                    {" "}
                  </textarea>
                  {/* diambil dari body template berdasarkan language yang dipilih */}
                </div>
                <div className="pt-2 mb-5">
                  <h6 className="text-start">Parameter</h6>
                  { template?.bodyParamCount ?? 0 > 0 ? (
                    <div>
                      {
                        //make a loop to generate input parameter as much as bodyParamCount number is
                        Array.from(
                          { length: template?.bodyParamCount ?? 0 },
                          (_, index) => (
                            <div key={index}>
                              <input
                                type = "text"
                                aria-label="default input example"
                                className="form-control"
                                placeholder={`Parameter {{${index + 1}}}`}
                                id="body-parameter"
                                {...formik.getFieldProps(`body-parameter-${index}`)}
                                disabled={disable}
                              />
                            </div>
                          )
                        )

                      //   <input
                      //   className="form-control"
                      //   type="text"
                      //   placeholder="Enter content for {{1}}"
                      //   aria-label="default input example"
                      //   {...formik.getFieldProps("param-1")}
                      //   disabled={disable}
                      // ></input>
                      }
                    </div>
                  ) : (
                    <div>
                      <label className="form-label">No Parameter</label>
                    </div>
                  )}
                  {/* <div>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter content for {{1}}"
                      aria-label="default input example"
                      {...formik.getFieldProps("param-1")}
                      disabled={disable}
                    ></input>
                  </div>
                  <div className="pt-2">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter content for {{2}}"
                      aria-label="default input example"
                      {...formik.getFieldProps("param-2")}
                      disabled={disable}
                    ></input>
  </div> */}
                </div>
                <div className="mb-5">
                  <div className="form-check form-switch form-check-custom form-check-solid me-10">
                    <h6 className="pe-2 text-start mt-3">Scheduled Time</h6>
                    <input
                      className="form-check-input h-20px w-30px ps-2"
                      type="checkbox"
                      value=""
                      id="flexSwitch20x30"
                      onChange={() => {
                        setSchedule(!schedule);
                      }}
                    />
                    {/* <label className="form-check-label" htmlFor="flexSwitch20x30">
                  20px x 30px
                </label> */}
                    {/* <label className="fw-bold fs-6 mb-2">Birthdate</label> */}

                    {/* <input type="date" className="form-control form-control-solid mb-3 mb-lg-0" id="birthdate"/> */}

                    {/* <label htmlFor="birthdaytime">Birthday (date and time):</label> */}
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
              {/* <button
          type="button"
          className="btn btn-light"
          data-bs-dismiss="modal"
        >
          Close
        </button> */}
              <button type="button" className="btn btn-primary">
                <KTSVG
                  path="/media/icons/duotune/general/gen016.svg"
                  className="svg-icon svg-icon-2x"
                />
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default BroadcastModal;
