const axios = require("axios");

const getMediaByID = async(idMedia, access_token) => {
  return await axios({
    method: "GET",
    url: `https://graph.facebook.com/v13.0/${idMedia}`,
    headers: {
      "Authorization": `Bearer ${access_token}`,
    }
  }).then((response) => {
    console.log("response : " + JSON.stringify(response.data));
    return response.data;
  })

}

const downloadFromUrl = async(url, access_token) => {
  return await axios({
    method: "GET",
    url: url,
    headers: {
      "Authorization": `Bearer ${access_token}`
    },
    responseType: "arraybuffer"
  }).then((response) => {
    return response;
  })
}


module.exports = {
  getMediaByID,
  downloadFromUrl
}