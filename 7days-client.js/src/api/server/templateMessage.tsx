import axios from "axios";
import { sendMessage } from "./connection";

export const sendRequestMessage = async (
  type: string,
  company: string,
  from: string,
  to: string,
  templateName: string,
  templateLanguage: string,
  bodyParameters: Array<string>,
  callback: any
) => {
  console.log("sendRequestMessage");
  const component = () => {
    let jsonComponent = ``
    //if any parameter found
    if(bodyParameters){
      jsonComponent = `
      , "components" : [
        <<component>>
      ]
      `
    }
    //TODO: Add more components for header

    //
    if(bodyParameters.length>0){
      jsonComponent = jsonComponent.replace("<<component>>", 
      `{
        "type" : "body",
        "parameters" : [
          ${bodyParameters.map(parameter => `"${parameter}"`).join(",")}
        ]
      }, <<component>>`)
    }
    jsonComponent = jsonComponent.replace(", <<component>>", "")
    return jsonComponent;
  }

  const jsonMessage = `
  {
    "type" : "${type}",
    "${type}" : {
      "company" : "${company}",
      "from" : "${from}",
      "to" : "${to}",
      "type" : "template",
      "template" : {
        "name" : "${templateName}",
        "language" : "${templateLanguage}"
        ${component()}
      }
    }
  }`;

  console.log(jsonMessage);

  return await sendMessage(jsonMessage, (responseCode:string, responseJson:JSON) => {
    callback(responseCode, responseJson);
  });
};
