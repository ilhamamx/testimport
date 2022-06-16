import axios from "axios";

export const sendRequestMessage = async (
    type: string, 
    company: string, from: string, to: string, msgtype: string, previewurl:boolean|undefined, text: string) => {
  const url = "http://localhost:3001/messages/sendMessage";

  const Value = `
  {
    "type" : "${type}",
    "${type}" : {
      "company" : "${company}",
      "from" : "${from}",
      "to" : "${to}",
      "type" : "${msgtype}",
      "text" : {
        "preview_url" : "${previewurl}",
        "text" : "${text}"
      }
    }
  }`;let defaultResponse = `
  {
    "responseCode" : <<responseCode>>,
    "response" : <<response>>,
  }`;
  console.log("JSON Pengiriman : "+Value);
  
  const RequestValue = JSON.parse(Value);



  try {
    //using axios
    const response = await axios.post(
      url,
      {RequestValue},
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization:
            "Bearer $2a$10$SoOcDYU6M6tg7oUe00UVQeCgji/yfRpvYfRqU4H9kIKY1.SEC0c5a",
        },
      }
    );
    console.log(response);
    //convert response to json
    const responseJson = await response.data;
    const responseCode = await response.status;
    console.log(responseJson);
    console.log(responseCode);
    defaultResponse = defaultResponse.replace("<<responseCode>>",""+responseCode).replace("<<response>>",responseJson);
    return defaultResponse;
  } catch (error) {
    console.log(error);
    defaultResponse = defaultResponse.replace("<<responseCode>>","400").replace("<<response>>","Error "+error);
    return defaultResponse
  }
};
