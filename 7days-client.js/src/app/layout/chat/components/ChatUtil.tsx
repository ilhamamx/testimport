export const DocumentMediaType = [
  "text/plain",
  "application/pdf",
  "application/vnd.ms-powerpoint",
  "application/msword",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
 " application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];


export const checkFile = async (FileType:string|undefined ) => {
  if(FileType === undefined){
    return "text";
  }else if(FileType.toLocaleLowerCase() === "application"){
    return "document";
  }
}

export const formatSize = async (bytes:number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Byte', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
