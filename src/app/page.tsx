import axios from "axios";
import Home from "./home";

const Page = async () => {
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

    console.log("Operator Token:", operatorTokenResponse.data);
    console.log("PA Token:", uiToken.data.token);

    return (
      <Home token={operatorTokenResponse.data} paToken={uiToken.data.token} />
    );
  } catch (err) {
    console.log(err);
    // Handle error or return fallback UI
    return <div>Error loading data</div>;
  }
};

export default Page;
