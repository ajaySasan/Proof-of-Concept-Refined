import axios from "axios";
import Home from "./home";

export const Page = async () => {
  try {
    const operatorTokenResponse = await axios.post(
      "https://api-pov.blackdice.ai/op/auth/login",
      {
        email: "operator@demo.com",
        pass: "123456",
      }
    );

    const uiToken = await axios.post("https://api-pov.blackdice.ai/pa/auth", {
      email: "te@demo.com",
      pass: "123456",
    });

    return (
      <Home token={operatorTokenResponse.data} paToken={uiToken.data.token} />
    );
  } catch (err) {
    console.log(err);
  }
};
