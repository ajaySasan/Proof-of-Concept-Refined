import axios from "axios";
import Home from "./home";

export default async function Page() {
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

    // console.log(operatorTokenResponse.data);
    // console.log(uiToken.data.token);

    return (
      <Home token={operatorTokenResponse.data} paToken={uiToken.data.token} />
    );
  } catch (err) {
    console.log(err);
  }
}
