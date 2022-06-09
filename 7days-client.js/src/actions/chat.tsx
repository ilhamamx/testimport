import * as collaboration from "../db/serviceCollaborations"
import * as message from "../db/serviceMessage"
import Moment from 'moment';
import { Customer,Message} from "../app/layout/chat/models/ChatItem.model"

export const fetchCollaborations = (uid: string, company: string ) => {
  return collaboration
  .fetchCollaborationsByUser(uid, company)
  .then(async collaborations => {
    const newCollabs = 
    await Promise.all(
      collaborations.map(async collaboration => {
        const customer = await collaboration.customer!.get();
        if(customer === undefined){
          return collaboration
        }
        /**
         * Count Unread Message
         */

        /**
         * get List Message, 
         */

        // console.log("--->> collaboration id : "+JSON.stringify(collaboration.id));
        // const lastMessage = await message.fetchLastMessage(collaboration.id);
        // console.log("--->> collaboration id : "+JSON.stringify(lastMessage));
        collaboration.customerModel = customer.data() as Customer;
        return collaboration
      })
    )
    return newCollabs

  })
}

export const convertPresentTime = (convertime:Date) => {
  Moment.locale('en');
  const fullDate = Moment().format('yyyy/MM/dd');
  const timeFormat = Moment().format('hh:mm a');
  

}


    //this will format time and get when the user was last seen
  //   public static String getTimeAgo(long timestamp) {
  //     SimpleDateFormat fullDateFormat = new SimpleDateFormat("yyyy/MM/dd", Locale.ENGLISH);
  //     SimpleDateFormat timeFormat = new SimpleDateFormat("hh:mm a", Locale.ENGLISH);

  //     Date timestampDate = new Date();
  //     timestampDate.setTime(timestamp);
  //     long now = System.currentTimeMillis();
  //     long secondsAgo = (now - timestamp) / 1000;


  //     int minute = 60;
  //     int hour = 60 * minute;
  //     int day = 24 * hour;
  //     int week = 7 * day;


  //     if (secondsAgo < minute)
  //         return "" /* now */;
  //     else if (secondsAgo < hour)
  //         //minutes ago
  //         return secondsAgo / minute + SEPARATOR + MyApp.context().getResources().getString(R.string.minutes_ago);
  //     else if (secondsAgo < day) {
  //         //hours ago
  //         int hoursAgo = (int) (secondsAgo / hour);
  //         if (hoursAgo <= 5)
  //             return hoursAgo + SEPARATOR + MyApp.context().getResources().getString(R.string.hours_ago);

  //         //today at + time AM or PM
  //         return MyApp.context().getResources().getString(R.string.today_at) + SEPARATOR + timeFormat.format(timestampDate);
  //     } else if (secondsAgo < week) {
  //         int daysAgo = (int) (secondsAgo / day);
  //         //yesterday + time AM or PM
  //         if (daysAgo == 1)
  //             return MyApp.context().getResources().getString(R.string.yesterday_at) + SEPARATOR + timeFormat.format(timestampDate);

  //         //days ago
  //         return secondsAgo / day + SEPARATOR + MyApp.context().getResources().getString(R.string.days_ago);
  //     }

  //     //otherwise it's been a long time show the full date
  //     return fullDateFormat.format(timestampDate) + SEPARATOR + MyApp.context().getResources().getString(R.string.at) + SEPARATOR + timeFormat.format(timestampDate);
  // }