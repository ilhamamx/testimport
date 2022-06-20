
const { resultCode } = require("../../../../helper/resultCode");

const formFreeMessageFormatFromClient = (type, to, clientJSON, callback) => {
  let text, preview_url = false, media_url, caption;
  if (type === "text") {
    if (clientJSON.text) {
      text = clientJSON.text;
    } else {
      return callback(null, resultCode("SM", "01", "text message"));
    }
    if (clientJSON.preview_url) {
      preview_url = clientJSON.preview_url;
    }
  } else if (type === "image" || type === "document" || type === "audio" || type === "video") {
    if (clientJSON) {
      if (clientJSON.link) {
        media_url = clientJSON.link;
      } else {
        return callback(null, resultCode("SM", "01", `link ${type}`));
      }
      if (clientJSON.caption) {
        caption = clientJSON.caption;
      }
    } else {
      return callback(null, resultCode("SM", "01", type));
    }
  } else {
    return callback(null, resultCode("SM", "02", "type"));
  }

  let json = `{
    "messaging_product" : "whatsapp",
    "recipient_type" : "individual",
    "to" : "${to}",
    "type" : "${type}",
    ${jsonBody()}
  }`;

  function jsonBody() {
    if (type === "text") {
      return `"text" : { 
      "preview_url" : ${preview_url},
      "body" : "${text}"
      }`;
    }
    else if(type == "image" || type == "document" || type == "video") {
      return `"${type}" : {
        "link" : "${media_url}"
        ${caption ? `,"caption" : "${caption}"` : ""}
      }`
    }
    else if (type == "audio") {
      return `"${type}" : {
        "link" : "${media_url}"
      }`;
    }
  }
  return callback(JSON.parse(json), null);
}

const formTemplateMessageFormatFromClient = (type, to, clientJSON, callback) => {
  let templateName, language
  if (clientJSON.name) {
    templateName = clientJSON.name;
  } else {
    return callback(null, resultCode("SM", "01", "name (template)"));
  }
  if (clientJSON.language) {
    language = clientJSON.language;
  } else {
    return callback(null, resultCode("SM", "01", "language (template)"));
  }
  let json = `{
    "messaging_product" : "whatsapp",
    "recipient_type" : "individual",
    "to" : "${to}",
    "type" : "template",
    "template" : {
      "name" : "${templateName}",
      "language" : {
        "code" : "${language}"
      }
      <<components>>
    }
  }`;
  if (clientJSON.components && typeof clientJSON.components === "object" && clientJSON.components.length > 0) {
    json = json.replace("<<components>>", `,"components" : [<<components>>]`);
    for(let i = 0; i < clientJSON.components.length; i++) {
      let component = clientJSON.components[i];
      if(i>0)
        json = json.replace("<<components>>", `,<<components>>`);
      if (component.type == "header") {

        function formHeader(type, content, filename) {
          return `{
            "type" : "header",
            "parameters" : [
              {
                "type" : "${type}",
                ${type == "text" ? `"text" : "${content}"` : `"${type}" : {"link": "${content}" ${type == "document" && filename ? `,"filename": "${filename}"`: ""}}`}
              }
            ]
          }`
        }

        if(component.text) {
          json = json.replace("<<components>>", 
          `${formHeader("text", component.text)}<<components>>`);
        } else if (component.image) {
          json = json.replace("<<components>>", 
          `${formHeader("image", component.image)}<<components>>`);
        } else if (component.video) {
          json = json.replace("<<components>>", 
          `${formHeader("video", component.video)}<<components>>`);
        } else if (component.document) {
          json = json.replace("<<components>>", 
          `${formHeader("document", component.document, component.filename)}<<components>>`);
        } else {
          return callback(null, resultCode("SM", "01", "header component"));
        }
      } else if (component.type == "body") {
        if(!component.parameters)
          return callback(null, resultCode("SM", "01", "parameters body component"))
        // parameters : [ param1, param2, param3]
        json = json.replace("<<components>>", `{
            "type" : "body",
            "parameters" : [
              ${component.parameters.map(parameter => {
                return `{
                  "type" : "text",
                  "text" : "${parameter}"
                }`
              }).join(",")}
            ]
          }<<components>>`);
      } else if(component.type == "button"){
        function formButton(subtype, index, payload, url){
          return `{
            "type" : "button",
            "sub_type" : "${subtype}",
            "index" : "${index}",
            "parameters" : [
              {
                "type" : "${subtype == "quick_reply" ? "payload" : "text"}",
                ${subtype == "quick_reply" ? `"payload" : "${payload}"` : `"text" : "${url}"`}
              }
            ]
          }`
        }
        if(component.payloads){
          let lengthPayloads = component.payloads.length;
          if(lengthPayloads>0){
            for (let i = 0; i < lengthPayloads; i++) {
              if(i>0){
                json = json.replace("<<components>>", `,<<components>>`);
              }
            json = json.replace("<<components>>",
            `${formButton("quick_reply", i, component.payloads[i])}<<components>>`);
            }
          }else{
            return callback(null, resultCode("SM", "01", "payloads button component"));
          }
        } else if(component.url){
          json = json.replace("<<components>>",
          `${formButton("url", 0, "", component.url)}<<components>>`);
        }else{
           return callback(null, resultCode("SM", "02", "button (component)"));
        }
      }else {
        return callback(null, resultCode("SM", "02", "type (component)"));
      }
    }
  }
  json = json.replace("<<components>>", "");
  return callback(JSON.parse(json), null);
}

module.exports = {
  formFreeMessageFormatFromClient,
  formTemplateMessageFormatFromClient
}