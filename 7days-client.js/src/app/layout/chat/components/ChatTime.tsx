import firebase from 'firebase/compat/app';
import moment from 'moment';
import React from 'react'
import ReactTimeAgo from 'react-time-ago'
import { Timestamp } from "../../../../db"

export default function ChatTime(dateconvert:number) {
  console.log("Check Date 1: "+dateconvert);
  console.log("Check Date 2: "+new Date());
  console.log("Test Moment : "+moment(new Date(dateconvert*1000)).fromNow())
  return (
    <div>
      <ReactTimeAgo date={new Date(dateconvert*1000)} locale="id-ID"/>
    </div>
  )
}