import axios from "axios";

export const sendRequestMessage = async (
  type: string,
  company: string,
  from: string,
  to: string,
  templateName: string,
  templateLanguage: string,
  bodyParameters: Array<string>
) => {
  const url = "http://192.168.20.27:3001/messages/sendMessage";

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
    jsonComponent = jsonComponent.replace("<<component>>", "")
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

  let defaultResponse = `
  {
    "responseCode" : <<responseCode>>,
    "response" : <<response>>
  }`;

  try {
    //using axios
    const response = await axios.post(url, JSON.parse(jsonMessage), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization:
          "Bearer $2a$10$SoOcDYU6M6tg7oUe00UVQeCgji/yfRpvYfRqU4H9kIKY1.SEC0c5a",
      },
    });
    //convert response to json
    const responseJson = await response.data;
    const responseCode = await response.status;
    defaultResponse = defaultResponse
      .replace("<<responseCode>>", "" + responseCode)
      .replace("<<response>>", JSON.stringify(responseJson));
    return defaultResponse;
  } catch (error) {
    defaultResponse = defaultResponse
      .replace("<<responseCode>>", "400")
      .replace("<<response>>", "Error " + error);
    return defaultResponse;
  }
};
