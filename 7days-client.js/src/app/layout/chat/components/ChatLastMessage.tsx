import React from "react";

type Props = {
  lastmessage: string;
  lastmessagetype: string,
  id?: string;
};

const ChatLastMessage: React.FC<Props> = ({
  lastmessage,
  lastmessagetype,
  id,
}) => {
  if (lastmessagetype === "text"){
    if(lastmessage.length<25){
      return (
        <div id={(id)}>{lastmessage}</div>
        );
    }else{
      return (
        <div id={(id)}>{lastmessage.substring(0,20)} ...</div>
        );
    }
  }else if (lastmessagetype === "image"){
    return (
      <div>
          <span id={(id)} data-testid={id} className="bi bi-camera-fill"/>{" "+lastmessage.substring(0,20)} ...
      </div>
      );
  }else if (lastmessagetype === "video"){
    return (
      <div>
          <span id={(id)} data-testid={id} className="bi bi-camera-video-fill"/>{" "+lastmessage.substring(0,20)} ...
      </div>
      );
  }else if (lastmessagetype === "audio"){
    return (
      <div>
          <span id={(id)} data-testid={id} className="bi bi-mic-fill"/>{" "+lastmessage.substring(0,20)} ...
      </div>
      );
  }else if (lastmessagetype === "document"){
    return (
      <div>
          <span id={(id)} data-testid={id} className="bi bi-file-earmark-fill"/>{" "+lastmessage.substring(0,20)} ...
      </div>
      );
  }else if (lastmessagetype === "location"){
    return (
      <div>
          <span id={(id)} data-testid={id} className="bi bi-geo-alt-fill"/>{" "+lastmessage.substring(0,20)} ...
      </div>
      );
  }else{
    return (
      <div>{lastmessage.substring(0,20)} ...</div>
      );
  }
};

export { ChatLastMessage };
