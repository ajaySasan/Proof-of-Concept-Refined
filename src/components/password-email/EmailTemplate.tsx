import {
    Body,
    Container,
    Column,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
  } from "@react-email/components";
  import * as React from "react";
  
  interface EmailTemplateProps {
    pass: string;
  }

  export const EmailTemplate = ({ pass }: EmailTemplateProps) => (
    <Html>
      <Head />
      <Preview>Thanks for signing up with BlackDice Cyber</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Img
              src="https://retina-dev.blackdice.io/icons/frame.svg"
              height="36"
              alt="Slack"
            />
          </Section>
          <Heading style={h1}>Thanks for signing up with BlackDice Cyber</Heading>
          <Text style={heroText}>
            Your password is below - enter it in your open browser window and
            you'll be signed in.
          </Text>
  
          <Section style={codeBox}>
            <Text style={confirmationCodeText}>{pass}</Text>
          </Section>
  
          <Text style={text}>
            If you didn't request this email, there's nothing to worry about, you
            can safely ignore it.
          </Text>
  
          <Section>
            <Row style={footerLogos}>
              <Column>
                <Section>
                  <Row>
                    <Column>
                      <Link href="https://twitter.com/BlackDiceCyber">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          style={socialMediaIcon}
                          width="32"
                          height="32"
                          fill="#35b888"
                          className="bi bi-twitter-x"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                        </svg>
                      </Link>
                    </Column>
                    <Column>
                      <Link href="https://www.linkedin.com/company/blackdice/">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          fill="#35b888"
                          className="bi bi-linkedin"
                          viewBox="0 0 16 16"
                          style={socialMediaIcon}
                        >
                          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                        </svg>
                      </Link>
                    </Column>
                    <Column>
                      <Link href="https://vimeo.com/blackdicecyber">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          fill="#35b888"
                          className="bi bi-vimeo"
                          viewBox="0 0 16 16"
                          style={socialMediaIcon}
                        >
                          <path d="M15.992 4.204q-.106 2.334-3.262 6.393-3.263 4.243-5.522 4.243-1.4 0-2.367-2.583L3.55 7.523Q2.83 4.939 2.007 4.94q-.178.001-1.254.754L0 4.724a210 210 0 0 0 2.334-2.081q1.581-1.364 2.373-1.437 1.865-.185 2.298 2.553.466 2.952.646 3.666.54 2.447 1.186 2.445.5 0 1.508-1.587 1.006-1.587 1.077-2.415.144-1.37-1.077-1.37a3 3 0 0 0-1.185.261q1.183-3.86 4.508-3.756 2.466.075 2.324 3.2z" />
                        </svg>
                      </Link>
                    </Column>
                  </Row>
                </Section>
              </Column>
              <Column style={{ width: "66%" }}></Column>
            </Row>
          </Section>
  
          <Section>
            <Link
              style={footerLink}
              href="https://www.blackdice.ai/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Our website
            </Link>
            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            <Link
              style={footerLink}
              href="https://www.blackdice.ai/privacy-policy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </Link>
            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            <Link
              style={footerLink}
              href="https://www.blackdice.ai/cookie-policy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cookie Policy
            </Link>
            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            <Link
              style={footerLink}
              href="https://www.blackdice.ai/contact/"
              target="_blank"
              rel="noopener noreferrer"
              data-auth="NotApplicable"
              data-linkindex="6"
            >
              Contact
            </Link>
            <Text style={footerText}>
              BlackDice Cyber Ltd, The Leeming Building,
              <br />
              Ludgate Hill, Leeds, LS2 7HZ
              <br />
              United Kingdom
              <br />
              All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
  
//   EmailTemplate.PreviewProps = {
//     pass: "HRswv5432gTU!?%$£",
//   } as EmailTemplateProps;
  
  export default EmailTemplate;
  
  const footerText = {
    fontSize: "12px",
    color: "#a5b8c7",
    lineHeight: "15px",
    textAlign: "left" as const,
    marginBottom: "50px",
  };
  
  const footerLink = {
    color: "#d6e0e8",
    textDecoration: "underline",
  };
  
  const footerLogos = {
    marginBottom: "32px",
    paddingLeft: "8px",
    paddingRight: "8px",
    width: "100%",
  };
  
  const socialMediaIcon = {
    display: "inline",
  };
  const main = {
    backgroundColor: "#242f36",
    margin: "0 auto",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  };
  
  const container = {
    margin: "0 auto",
    padding: "0px 20px",
  };
  
  const logoContainer = {
    marginTop: "32px",
  };
  
  const h1 = {
    color: "#d6e0e8",
    fontSize: "36px",
    fontWeight: "700",
    margin: "30px 0",
    padding: "0",
    lineHeight: "42px",
  };
  
  const heroText = {
    color: "#a5b8c7",
    fontSize: "20px",
    lineHeight: "28px",
    marginBottom: "30px",
  };
  
  const codeBox = {
    background: "#43535e",
    borderRadius: "24px",
    marginBottom: "30px",
    padding: "40px 10px",
  };
  
  const confirmationCodeText = {
    color: "#ffffff",
    fontSize: "30px",
    textAlign: "center" as const,
    verticalAlign: "middle",
  };
  
  const text = {
    color: "#a5b8c7",
    fontSize: "14px",
    lineHeight: "24px",
  };
  