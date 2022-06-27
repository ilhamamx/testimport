import axios from "axios";

export const getEmailFromPhone = async (phoneNumber: string) => {
  const url = process.env.REACT_APP_SERVER_URL!;

  try {
    //using axios
    const response = await axios.post(
      url,
      { phoneNumber: phoneNumber },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization:
            `Bearer $2a$10$${process.env.REACT_APP_SERVER_TOKEN}`,
        },
      }
    );
    //convert response to json
    const responseJson = await response.data;
    //return email
    return responseJson.email;
  } catch (error) {
    console.log(error);
    return "";
  }
};
