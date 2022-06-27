import axios from "axios";

export const getEmailFromPhone = async (phoneNumber: string) => {
  const url = process.env.SERVER_URL!;

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
            `Bearer ${process.env.SERVER_TOKEN}`,
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
