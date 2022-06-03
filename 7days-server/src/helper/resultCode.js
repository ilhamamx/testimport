
const resultCode = (type, code, fieldName) => {
  return JSON.parse(`{
    "resultCode": "${type + code}",
    "message": "${
      code == "00" ? "Success, request sent!" : "" +
      code == "01" ? `Empty Mandatory Parameter (${fieldName})` : "" +
      code == "02" ? `Invalid Parameter (${fieldName})` : ""  +
      code == "03" ? `Error when sending to whatsapp. Please retry` : "" 
    }"
  }`)
}

module.exports = {
  resultCode,
}