// import axios from "axios";
// import Main from "./home";
// import "../app/App.scss";
// import { Toaster } from "react-hot-toast";

// const Home = async () => {
//   const apiEnviroment = ["dev", "stag", "pov"];
//   const apiURL: string = `https://api-${apiEnviroment[0]}.blackdice.ai`;

//   try {
//     const operatorTokenResponse = await axios.post(`${apiURL}/op/auth/login`, {
//       email: "operator@demo.com",
//       pass: "123456",
//     });

//     const uiToken = await axios.post(`${apiURL}/pa/auth`, {
//       email: "dev-service-platform@demo.com",
//       pass: "123456",
//     });

//     return (
//       <>
//         <Main
//           token={operatorTokenResponse.data}
//           paToken={uiToken.data.token}
//           apiURL={apiURL}
//         />
//         <Toaster position="top-right" />
//       </>
//     );
//   } catch (err) {
//     console.log(err);
//   }
// };

// export default Home;
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Main from "./home";
import "../app/App.scss";
import { Toaster } from "react-hot-toast";
import { LoadingSpinner } from "@/components/spinner/Spinner";

const Home = () => {
  const [apiEnviroment, setApiEnviroment] = useState("dev");
  const [tokens, setTokens] = useState<{
    operatorToken: string;
    uiToken: string;
  } | null>(null);

  let apiURL = `http://localhost:3000`;
  
  if( apiEnviroment === "localhost" ) {
    apiURL = `http://localhost:3000`
  }

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const operatorTokenResponse = await axios.post(
          `${apiURL}/op/auth/login`,
          {
            email: "operator@demo.com",
            pass: "123456",
          }
        );

        const uiTokenResponse = await axios.post(`${apiURL}/pa/auth`, {
          email: "service-platform@demo.com",
          pass: "123456",
        });

        setTokens({
          operatorToken: operatorTokenResponse.data,
          uiToken: uiTokenResponse.data.token,
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchTokens();
  }, [apiURL]);

  if (!tokens) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <Main
        token={tokens.operatorToken}
        paToken={tokens.uiToken}
        apiURL={apiURL}
        setApiEnviroment={setApiEnviroment}
      />
      <Toaster position="top-right" />
    </>
  );
};

export default Home;
