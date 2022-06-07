import * as collaboration from "../db/serviceCollaborations"

export const fetchCollaborations = (uid: string, company: string ) => 
  collaboration
    .fetchCollaborationsByUser(uid, company);
    //.then(collabs =>  collabs)