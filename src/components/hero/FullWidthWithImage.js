import React, { useEffect } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import charity from "../../images/charity.jpg";
import Header, {
  LogoLink,
  NavLinks,
  NavLink as NavLinkBase,
} from "../headers/light.js";

const StyledHeader = styled(Header)`
  ${tw`justify-between`}
  ${LogoLink} {
    ${tw`mr-8 pb-0`}
  }
`;

const NavLink = tw(NavLinkBase)`
  sm:text-sm sm:mx-6
`;

const Container = tw.div`relative -mx-8 -mt-8`;
const TwoColumn = tw.div`flex flex-col lg:flex-row bg-gray-100`;
const LeftColumn = tw.div`ml-8 mr-8 xl:pl-10 py-8`;
const RightColumn = styled.div`
  background-image: url(${charity});
  ${tw`bg-green-500 bg-cover bg-center xl:ml-24 h-96 lg:h-auto lg:w-1/2 lg:flex-1`}
`;

const Content = tw.div`mt-24 lg:mt-24 lg:mb-24 flex flex-col sm:items-center lg:items-stretch`;
const Heading = tw.h1`text-3xl sm:text-5xl md:text-6xl lg:text-5xl font-black leading-none`;
const Paragraph = tw.p`max-w-md my-8 lg:my-5 lg:my-8 sm:text-lg lg:text-base xl:text-lg leading-loose`;

const Actions = styled.div`
  ${tw`mb-8 lg:mb-0`}
  .action {
    ${tw`text-center inline-block w-full sm:w-48 py-4 font-semibold tracking-wide rounded hocus:outline-none focus:shadow-outline transition duration-300`}
  }
  .primaryAction {
    ${tw`bg-blue-500 text-gray-100 hover:bg-blue-700`}
  }
  .secondaryAction {
    ${tw`mt-4 sm:mt-0 sm:ml-4 bg-gray-300 text-gray-700 hover:bg-gray-400 hover:text-gray-800`}
  }
`;

const statusContainerClass =
  "px-2 py-1 w-fit  m-auto  my-4 items-center text-xs rounded-md font-semibold uppercase";

export default () => {
  let isAdmin = localStorage.getItem("isAdmin");

  console.log(isAdmin);
  console.log(typeof isAdmin);

  const navLinks = [
    <NavLinks key={1}>
      <NavLink href="about">About</NavLink>
      <NavLink href="blog">Blog</NavLink>
      <NavLink href="create-campaign">Create Campaign</NavLink>
      <NavLink href="browse-campaign">Browse Campaign</NavLink>
      {isAdmin === "true" ? (
        <span
          className={`${statusContainerClass} text-blue-500 border border-blue-500 bg-blue-100 uppercase`}
        >
          <NavLink href="admin">Admin</NavLink>
        </span>
      ) : null}
    </NavLinks>,
  ];

  const heading = (
    <>
      Fundraising is a gentle art of
      <wbr />
      <br />
      <span tw="text-blue-500">teaching the joy of giving</span>
    </>
  );
  const description = "- Hank Rosso";
  const primaryActionUrl = "create-campaign";
  const primaryActionText = "Create Campaign";
  const secondaryActionUrl = "browse-campaign";
  const secondaryActionText = "Browse Campaign";

  return (
    <Container>
      <TwoColumn>
        <LeftColumn>
          <StyledHeader links={navLinks} collapseBreakpointClass="sm" />
          <Content>
            <Heading>{heading}</Heading>
            <Paragraph>{description}</Paragraph>
            <Actions>
              <a href={primaryActionUrl} className="action primaryAction">
                {primaryActionText}
              </a>
              <a href={secondaryActionUrl} className="action secondaryAction">
                {secondaryActionText}
              </a>
            </Actions>
          </Content>
        </LeftColumn>
        <RightColumn></RightColumn>
      </TwoColumn>
    </Container>
  );
};
