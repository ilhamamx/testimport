export * from "./AssetHelpers";
export * from "./RouterHelpers";
export * from "./components/KTSVG";
export * from "./components/KTCard";
export * from "./components/KTCardBody";
export * from "./dataExamples";
export * from "./crud-helper/helpers";
export * from "./crud-helper/models";
export * from "./crud-helper/consts";
export * from "./dataExamples";

export const getIconChannelUrl = (channel: string) => {
  let mediaURL = "";
  if (channel === "shopee") {
    mediaURL = "/media/icons/channel/shopee-icon.png";
  } else if (channel === "blibli") {
    mediaURL = "/media/icons/channel/blibli-icon.png";
  } else if (channel === "tokopedia") {
    mediaURL = "/media/icons/channel/tokped-icon.png";
  } else if (channel === "whatsapp") {
    mediaURL = "/media/icons/channel/whatsapp.png";
  } else if (channel === "sabunzone") {
    mediaURL = "/media/icons/channel/sabunzone-icon.png";
  } else {
    mediaURL = "/media/icons/channel/whatsapp.png";
  }
  return mediaURL;
};
