import moment from 'moment';
import "moment/locale/id";
import {useTranslation} from "react-i18next";


export default function ChatTime2(dateconvert:number) {
  const { i18n } = useTranslation();

  function getLanguage() {
    console.log(i18n.language);
    return i18n.language;
  }

  moment.locale(getLanguage());
  console.log("Test Moment ID: "+moment(new Date(dateconvert*1000)).fromNow());

  return (
    <div>
      {moment(new Date(dateconvert*1000)).fromNow()}
    </div>
  )
}


export function ChatTime(dateconvert:Date) {
  const { i18n } = useTranslation();

  function getLanguage() {
    console.log(i18n.language);
    return i18n.language;
  }

  moment.locale(getLanguage());

  return (
      moment(dateconvert).fromNow()
  )
}

