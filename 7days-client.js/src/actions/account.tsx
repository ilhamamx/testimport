import * as account from "../db/serviceAccount"
import { Account, Company} from "../app/layout/chat/models/ChatItem.model"
import * as lc from '../app/modules/localstorage/index'

export const fetchAccountByCompanyAndChannel = (companyid: string, channel: string) => {
  const dataAccount: Account[] = lc.getItemLC(lc.LCName.Account+companyid+"_"+channel);
  if (dataAccount != null ) {
    return Promise.all(dataAccount);
  } else {
    return account
    .getAccountByCompanyAndChannel(companyid,channel)
    .then(async accounts => {
      const newAccount = 
      await Promise.all(
        accounts.map(async accounts => {
          if (accounts.company.id === companyid && accounts.type=== channel){
            const company = await accounts.company?.get();
            if(company !== undefined){
              accounts.companyModel = company.data() as Company;
            }
            return accounts
          }
        })
      )
      lc.setItemLC(lc.LCName.Account+companyid+"_"+channel,newAccount);
      return newAccount
    });
  }
}