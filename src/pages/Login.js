import React, { useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import illustration from "images/donate.svg";
import logo from "images/logo2.svg";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
import { useNavigate } from "react-router-dom";

const Container = tw(
  ContainerBase
)`min-h-screen bg-blue-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-blue-500 text-gray-100 w-full py-4 rounded-lg hover:bg-blue-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-blue-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${(props) => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-sm bg-contain bg-center bg-no-repeat`}
`;

const Login = ({
  logoLinkUrl = "#",
  illustrationImageSrc = illustration,
  headingText = "Sign In To Fund Smiles",
  submitButtonText = "Sign In",
  SubmitButtonIcon = LoginIcon,
  forgotPasswordUrl = "#",
  signupUrl = "#",
}) => {
  let navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const signInFormHandler = (event) => {
    event.preventDefault();
    localStorage.clear();
    if (data.email === "demo@user.com" && data.password === "demo") {
      localStorage.setItem("name", "Demo User");
      localStorage.setItem("isAdmin", "false");
      localStorage.setItem("email", "demo@user.com");
    }
    if (data.email === "demo@admin.com" && data.password === "demoadmin") {
      localStorage.setItem("name", "Demo Admin");
      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("email", "demo@admin.com");
    }
    navigate("/home");
  };

  return (
    <AnimationRevealPage>
      <Container>
        <Content>
          <MainContainer>
            <LogoLink href={logoLinkUrl}>
              <LogoImage src={logo} />
            </LogoLink>
            <MainContent>
              <Heading>{headingText}</Heading>
              <FormContainer>
                <Form onSubmit={signInFormHandler} method="post">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={data.email}
                    onChange={handleInputChange}
                  />
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={data.password}
                    onChange={handleInputChange}
                  />
                  <SubmitButton type="submit">
                    <SubmitButtonIcon className="icon" />
                    <span className="text">{submitButtonText}</span>
                  </SubmitButton>
                </Form>
                {/* <p tw="mt-6 text-xs text-gray-600 text-center">
                  <a
                    href={forgotPasswordUrl}
                    tw="ml-4 border-b border-gray-500 border-dotted"
                  >
                    Forgot Password ?
                  </a>
                </p>
                <p tw="pl-4 mt-8 text-sm text-gray-600 text-center">
                  Dont have an account?{" "}
                  <a
                    href={signupUrl}
                    tw="border-b border-gray-500 border-dotted"
                  >
                    Sign Up
                  </a>
                </p> */}
              </FormContainer>
            </MainContent>
          </MainContainer>
          <IllustrationContainer>
            <IllustrationImage imageSrc={illustrationImageSrc} />
          </IllustrationContainer>
        </Content>
      </Container>
    </AnimationRevealPage>
  );
};

export default Login;
