export const toAbsoluteUrl = (pathname: string) => process.env.PUBLIC_URL + pathname

export const getIconChannelUrl = (channel: string) => {
  let mediaURL ='';
  if(channel === 'shopee'){
    mediaURL = "/media/icons/channel/shopee-icon.png"
  }else if(channel === 'blibli'){
    mediaURL = "/media/icons/channel/blibli-icon.png"
  }else if(channel === 'tokopedia'){
    mediaURL = "/media/icons/channel/tokped-icon.png"
  }else if(channel === 'whatsapp'){
    mediaURL = "/media/icons/channel/whatsapp.png"
  }else{
    mediaURL = "/media/icons/channel/whatsapp.png"
  }
  return mediaURL
}
  


