import moment from 'moment';
import ReactTimeAgo from 'react-time-ago';
import { format } from 'timeago.js';  

// function getLanguage() {
//   console.log(i18n.language);
//   return i18n.language;
// }

export default function ChatTime(dateconvert:number) {

  console.log("Check Date 1: "+dateconvert);
  console.log("Check Date 2: "+new Date());
  console.log("Test Moment : "+moment(new Date(dateconvert*1000)).fromNow())
  console.log("Test Time Ago X: "+format(new Date(dateconvert*1000), 'zh_CN'));
  console.log("Test Time Ago ID: "+format(new Date(dateconvert*1000), 'id_ID'));

  // const dateFromTimeStamp = new Date(dateconvert*1000);

  return (
    <div>
      <ReactTimeAgo date={new Date(dateconvert*1000)} locale="en-US"/>
    </div>
  )
}