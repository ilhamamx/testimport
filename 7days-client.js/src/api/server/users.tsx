import axios from "axios";

export const getEmailFromPhone = async (phoneNumber: string) => {
  const url = "http://localhost:3001/user/findByPhoneNumber";

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
            "Bearer $2a$10$SoOcDYU6M6tg7oUe00UVQeCgji/yfRpvYfRqU4H9kIKY1.SEC0c5a",
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
