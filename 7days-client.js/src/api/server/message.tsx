import axios from "axios";

export const sendRequestMessage = async (
    type: string, 
    company: string, from: string, to: string, msgtype: string|undefined, previewurl:boolean|undefined, text: string, fileURL : string|undefined) => {
  const url : string = process.env.REACT_APP_SERVER_URL! + '/messages/sendMessage';

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

  const jsonMessageAudio = `
  {
    "type" : "${type}",
    "${type}" : {
      "company" : "${company}",
      "from" : "${from}",
      "to" : "${to}",
      "type" : "${msgtype}",
      "audio" : {
        "link" : "${fileURL}"
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
    }else if(msgtype==="audio"){
      return jsonMessageAudio
    }else{
      //Default Type
      return jsonMessageText
    }
  };

  console.log("----->>> Hasil Json : "+RequestValue());
  try {
    // env cant have any $, so we need to replace it manually
    console.log(`token $2a$10$${process.env.REACT_APP_SERVER_TOKEN}`);
    //using axios
    const response = await axios.post(
      url,
      JSON.parse(RequestValue()),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization:
           `Bearer $2a$10$${process.env.REACT_APP_SERVER_TOKEN}`,
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
