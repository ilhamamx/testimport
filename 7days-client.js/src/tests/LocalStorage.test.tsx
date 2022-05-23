import { render } from "@testing-library/react";
import Button from "../styles/components/Button";
import { getItemLC, LCName, removeLC, setItemLC, setItemLCWithExpiry } from "../app/modules/localstorage";

describe("Local Storage", () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  const data = {
    email: "ilham@amxware.com",
    isrememberme: true,
    password: "testing123",
  };

  test("get Local Storage Item", async () => {
    setItemLC("User", data);
    expect(getItemLC("User")).toEqual(data);
  });

  test("remove Local Storage Item", async () => {
    render(<Button onClick={removeLC(LCName.User)}></Button>);
    expect(getItemLC("User")).toEqual(null);
  });

  //TODO expiry set test
  test("set expiry Local Storage Item", async () => {
    // setItemLCWithExpiry("User", data, 0);
    // expect(getItemLC("User")).toEqual(data);
  });
  
  //TODO expired test
  test("get expired Local Storage Item", async () => {
    // expect(getItemLC("User")).toEqual(0);
  });
});


