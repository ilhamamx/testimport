export const LCName = {
  User: "User",
  SessionID : "SessionID",
  SessionCreated : "SessionCreated",
  SessionToken : "SessionToken",
};

export function setItemLCWithExpiry(key: string, value: any, ttl: number) {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + ttl * 24 * 60 * 60 * 1000,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

export function getItemLC(key: string) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }

  const item = JSON.parse(itemStr);
  if (item.hasOwnProperty("expiry")) {
    const now = new Date();
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  } else {
    return item.value;
  }
}

export function removeLC(key: string) {
  localStorage.removeItem(key);
}

export function setItemLC(key: string, value: any) {
  const item = {
    value: value,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

export function removeSession(){
   removeLC(LCName.User);
   removeLC(LCName.SessionID);
   removeLC(LCName.SessionCreated);
   removeLC(LCName.SessionToken);
}

