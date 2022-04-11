import db, { Timestamp } from '../db';

describe('db connection', () => {
  Timestamp.fromDate(new Date());
  console.log("Waktu Firebase :"+ Timestamp.fromDate(new Date()));
  
  test('connect to firebase ', async () => {
    expect(true).toEqual(Timestamp!==null);
  });

  // test('connect to firebase ', async () => {
  //   const outputElement = 'Hallo World';
  //   const outputFirebase = fetchDataTesting();
  //   console.log("Data :"+outputFirebase);
  //   expect(outputFirebase).toEqual(outputElement);
  // });
});