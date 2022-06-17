import axios from "axios";

export const sendRequestMessage = async (
    type: string, 
    company: string, from: string, to: string, msgtype: string, previewurl:string, text: string) => {
  const url = "http://localhost:3001/messages/sendMessage";

      const jsonFormarter = `
      {
        "type" : ${type},
        ${type} : {
          "company" : ${company},
          "from" : ${from},
          "to" : ${to},
          "type" : ${msgtype},
          "text" : {
            "preview_url" : ${previewurl},
            "text" : ${text},
          }
        }
      }
      `

  try {
    //using axios
    const response = await axios.post(
      url,
      {jsonFormarter},
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
    console.log(responseJson);
    //return email
    return responseJson.email;
  } catch (error) {
    console.log(error);
    return "";
  }
};
