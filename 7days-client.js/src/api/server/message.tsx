import axios from "axios";

export const sendRequestMessage = async (
    type: string, 
    company: string, from: string, to: string, msgtype: string|undefined, previewurl:boolean|undefined, text: string, fileURL : string|undefined) => {
  const url = "http://192.168.20.10:3001/messages/sendMessage";

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
        ${text? `,"caption" : "${text}"`:""}
      }
    }
  }`;

  const jsonMessageImage = `
  {
    "type" : "${type}",
    "${type}" : {
      "company" : "${company}",
      "from" : "${from}",
      "to" : "${to}",
      "type" : "${msgtype}",
      "image" : {
        "link" : "${fileURL}"
        ${text? `,"caption" : "${text}"`:""}
      }
    }
  }`;

  const jsonMessageVideo = `
  {
    "type" : "${type}",
    "${type}" : {
      "company" : "${company}",
      "from" : "${from}",
      "to" : "${to}",
      "type" : "${msgtype}",
      "video" : {
        "link" : "${fileURL}",
        ${text? `,"caption" : "${text}"`:""}
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
    }else if(msgtype==="image"){
      return jsonMessageImage
    }else if(msgtype==="video"){
      return jsonMessageVideo
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
    console.log("Success Request to Server Side");
    defaultResponse = defaultResponse.replace("<<responseCode>>",""+responseCode).replace("<<response>>",JSON.stringify(responseJson));
    return defaultResponse;
  } catch (error) {
    console.log("Error Request To Server Side : "+error);
    defaultResponse = defaultResponse.replace("<<responseCode>>","\"503\"").replace("<<response>>","\""+error+"\"");
    return defaultResponse
  }
};
