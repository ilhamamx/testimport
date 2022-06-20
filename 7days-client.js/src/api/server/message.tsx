import axios from "axios";

export const sendRequestMessage = async (
    type: string, 
    company: string, from: string, to: string, msgtype: string|undefined, previewurl:boolean|undefined, text: string, fileURL : string|undefined) => {
  const url = "http://192.168.20.27:3001/messages/sendMessage";

  const jsonMessageText = `
  {
    "type" : "${type}",
    "${type}" : {
      "company" : "${company}",
      "from" : "${from}",
      "to" : "${to}",
      "type" : "${msgtype}",
      "text" : {
        "preview_url" : ${previewurl},
        "text" : "${text}"
      }
    }
  }`;

  const jsonMessageDocument = `
  {
    "type" : "${type}",
    "${type}" : {
      "company" : "${company}",
      "from" : "${from}",
      "to" : "${to}",
      "type" : "${msgtype}",
      "document" : {
        "link" : "${fileURL}",
        "caption" : "${text}"
      }
    }
  }`;
  
  let defaultResponse = `
  {
    "responseCode" : <<responseCode>>,
    "response" : <<response>>
  }`;
  
  const RequestValue = () => {
    if(msgtype==="text"){
      return jsonMessageText
    }else if(msgtype==="document"){
      return jsonMessageDocument
    }else{
      //Default Type
      return jsonMessageText
    }
  };



  try {
    //using axios
    const response = await axios.post(
      url,
      JSON.parse(RequestValue()),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization:
            "Bearer $2a$10$SoOcDYU6M6tg7oUe00UVQeCgji/yfRpvYfRqU4H9kIKY1.SEC0c5a",
        },
      }
    );
    //convert response to json
    const responseJson = await response.data;
    const responseCode = await response.status;
    defaultResponse = defaultResponse.replace("<<responseCode>>",""+responseCode).replace("<<response>>",JSON.stringify(responseJson));
    return defaultResponse;
  } catch (error) {
    defaultResponse = defaultResponse.replace("<<responseCode>>","400").replace("<<response>>","Error "+error);
    return defaultResponse
  }
};
