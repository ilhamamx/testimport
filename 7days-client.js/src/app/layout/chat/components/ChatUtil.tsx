export const DocumentMediaType: string[] = [
  "text/plain",
  "application/pdf",
  "application/vnd.ms-powerpoint",
  "application/msword",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
 " application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

export const ImageMediaType: string[] = [
  "jpeg",
  "png"
];

export const VideoMediaType: string[] = [
  "mp4",
  "3gp"
];


export const StickerMediaType: string[] = [
  "webp"
];

export const AudioMediaType: string[] = [
  "aac",
  "mp4",
  "mpeg",
  "amr",
  "ogg" 
];


export const checkFile_Old = (FileType:string|undefined ) => {
  if(FileType === undefined){
    return undefined;
  }else if(FileType.toLocaleLowerCase() === "application" || FileType.toLocaleLowerCase() === "text"){
    return "document";
  }else if(FileType.toLocaleLowerCase() === "image"){
    return "image";
  }else if(FileType.toLocaleLowerCase() === "video"){
    return "video";
  }
}

export const checkFile = (FileType:string|undefined,FileExtensionType:string|undefined, FileSize:number ) => {
  let result: string|undefined = undefined;
  let error = undefined;
  let maxSize = 0;

  // Check File Type
  if(FileType === undefined || FileType === undefined){
    error ="InvalidURL";
  }else if(FileType.toLocaleLowerCase() === "application" || FileType.toLocaleLowerCase() === "text"){
    result= "document";
  }else if(FileType.toLocaleLowerCase() === "image"){
    result= "image";
  }else if(FileType.toLocaleLowerCase() === "video"){
    result= "video";
  }else if(FileType.toLocaleLowerCase() === "audio"){
    result= "audio";
  }else{
    error ="InvalidURL";
  }

  // Check File Size
  if (result !== undefined) {
    const sizeInMB = (FileSize / (1024*1024));
    if (result === "document" && sizeInMB >= 100) {
      maxSize = 100;
      error ="MaxSize";
    }
    if (result === "image" && sizeInMB >= 5) {
      maxSize = 5;
      error ="MaxSize";
    }
    if (result === "video" && sizeInMB >= 16) {
      maxSize = 16;
      error ="MaxSize";
    }
    if (result === "audio" && sizeInMB >= 16) {
      maxSize = 16;
      error ="MaxSize";
    }

  }

  // Check File Extension
  if (result !== undefined) {
    // if (result === "document" ) {
      // error="InvalidFileType"
    // }
    if (result === "image" && (FileExtensionType !== undefined) && (ImageMediaType.includes(FileExtensionType) === false)) {
      error="InvalidFileType"
    }
    if (result === "video" && (FileExtensionType !== undefined) && (VideoMediaType.includes(FileExtensionType) === false)) {
      error="InvalidFileType"
    }
    if (result === "audio" && (FileExtensionType !== undefined) && (AudioMediaType.includes(FileExtensionType) === false)) {
      error="InvalidFileType"
    }
  }

  return [result,error,maxSize]
};


export const formatSize = (bytes:number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Byte', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
