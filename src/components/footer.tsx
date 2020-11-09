import React from "react";
import theme from "../theme";
import styled from "styled-components";

const FooterSection = styled.div`
  margin: ${theme.space[96]} auto ${theme.space[256]} auto;
  display: flex;
  width: 100%;
  max-width: 1200px;
  padding: 0;
  padding-top: ${theme.space[80]};
  border-top: 1px solid ${theme.colors.gray300};
  .logo {
    height: 24px;
  }

  .column {
    flex: 2;
  }
  .four {
    flex: 3;
  }

  .column .header {
    font-weight: bold;
    font-size: ${theme.fontSizes[16]};
    line-height: 1;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${theme.colors.gray500};
  }

  .column .link {
    display: block;
    margin-top: ${theme.space[24]};
    font-size: ${theme.fontSizes[16]};
    line-height: 1;
    color: ${theme.colors.gray500};
  }

  .column .link + .link {
    margin-top: ${theme.space[16]};
  }

  .column .link:hover {
    color: ${theme.colors.gray600};
  }

  .column .link:active {
    color: ${theme.colors.gray700};
  }

  .column .group + .group {
    margin-top: ${theme.space[48]};
  }

  .jobs .tag {
    display: inline-block;
    border-radius: 6px;
    margin-left: ${theme.space[8]};
    padding: ${theme.space[4]} ${theme.space[8]};
    background: ${theme.colors.green500};
    font-size: ${theme.fontSizes[12]};
    font-weight: bold;
    color: white;
    transition: transform ${theme.transitions.standard};
  }

  .jobs:hover .tag {
    transform: scale(1.05);
  }

  .jobs .tag.black {
    background: ${theme.colors.black};
  }

  .logo {
    fill: ${theme.colors.gray500};
  }

  .four .description {
    margin-top: ${theme.space[16]};
    font-size: ${theme.fontSizes[16]};
    line-height: 1.375;
    color: ${theme.colors.gray500};
  }

  .social {
    margin-top: ${theme.space[32]};
    display: flex;
    max-width: 100px;
  }
  .social a + a {
    margin-left: ${theme.space[16]};
  }

  .social svg {
    width: 24px;
    height: 24px;
    transition: transform ${theme.transitions.standard};
  }

  .social svg:hover {
    transform: scale(1.2);
  }

  .copyright {
    margin-top: ${theme.space[32]};
    font-size: ${theme.fontSizes[16]};
    line-height: 1;
    color: ${theme.colors.gray500};
  }

  a.cookie-pref {
    text-decoration: underline;
    cursor: pointer;
  }

  .berlin {
    margin-top: ${theme.space[8]};
    font-size: ${theme.fontSizes[16]};
    line-height: 1;
    color: ${theme.colors.gray500};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    margin-top: ${theme.space[48]};
    margin-bottom: ${theme.space[48]};
    flex-direction: column;
    padding: 0 24px;

    .column {
      margin-top: ${theme.space[48]};
    }

    .column .group + .group {
      margin-top: ${theme.space[48]};
    }
  }
`;


const Footer = ({ newsletterComponent }: any) => (
  <FooterSection>
    <div className="column one">
      <img src="https://images2.prisma.io/footer-logo.png" alt="Prisma Logo" style={{ width: 90 + "px", height: 24 + "px" }} />
    </div>
    <div className="column two">
      <div className="group">
        <h3 className="header">Products</h3>
        <a
          className="link"
          href="https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client"
        >
          Prisma Client
        </a>
        <a className="link" href="https://app.prisma.io/login">
          Prisma 1 Cloud
        </a>
      </div>
      <div className="group">
        <h3 className="header">Resources</h3>
        <a className="link" href="https://www.prisma.io/docs/">
          Docs
        </a>
        <a
          className="link"
          href="https://www.prisma.io/docs/getting-started/quickstart-typescript"
        >
          Get Started
        </a>
        <a
          className="link"
          href="https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/generating-prisma-client"
        >
          API Reference
        </a>
        <a className="link" href="https://github.com/prisma/prisma-examples">
          Examples
        </a>
        <a className="link" href="https://www.howtographql.com/">
          How to GraphQL
        </a>
        <a className="link" href="https://www.prisma.io/dataguide/">
          Data Guide
        </a>
        <a className="link" href="https://www.prisma.io/nextjs">
          Prisma with Next.js
        </a>
      </div>
    </div>
    <div className="column three">
      <div className="group">
        <h3 className="header">Community</h3>
        <a className="link" href="https://www.prisma.io/community">
          Meet the Community
        </a>
        <a className="link" href="https://slack.prisma.io/">
          Slack
        </a>
        <a className="link" href="https://github.com/prisma">
          GitHub
        </a>
        <a className="link" href="https://github.com/prisma/prisma/discussions">
          Discussions
        </a>
        <a className="link" href="https://www.meetup.com/graphql-berlin/">
          GraphQL Meetup
        </a>
        <a className="link" href="https://www.meetup.com/TypeScript-Berlin/">
          TypeScript Meetup
        </a>
      </div>
      <div className="group">
        <h3 className="header">Company</h3>
        <a className="link" href="https://www.prisma.io/about">
          About
        </a>
        <a className="link" href="https://www.prisma.io/jobs">
          Jobs
        </a>
        <a
          className="link jobs"
          href="https://www.notion.so/prismaio/What-Prisma-Cares-About-32946d99f9ea4925a796663dc8945c42"
        >
          Causes <span className="tag black">Black Lives Matter</span>
        </a>
        <a className="link" href="/blog/">
          Blog
        </a>
        <a
          className="link"
          href="https://pris.ly/privacy"
        >
          Terms & Privacy
        </a>
        <a
          className="link"
          href="https://www.prisma.io/sitemap"
        >
          HTML Sitemap
        </a>
      </div>
    </div>
    <div className="column four">
      <div className="group">
        <h3 className="header">Newsletter</h3>
        <p className="description">
          Stay up to date with the latest features and changes to Prisma
        </p>
        {newsletterComponent}
      </div>
      <div className="group">
        <h3 className="header">Find Us</h3>
        <div className="social">
          <a href="https://twitter.com/prisma">
            <svg
              viewBox="0 0 24 20 "
              fill="none"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              aria-labelledby="footerIconTwitter"
            >
              <title id="footerIconTwitter">Find us on Twitter</title>
              <path
                d="M23 1.01a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1a10.66 10.66 0 01-9-4.53s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5 0-.278-.028-.556-.08-.83A7.72 7.72 0 0023 1.01v0z"
                stroke={theme.colors.gray500}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a href="https://www.youtube.com/prismadata">
            <svg
              viewBox="0 0 25 18"
              fill="none"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              aria-labelledby="footerIconYT"
            >
              <title id="footerIconYT">Find us on YouTube</title>
              <path
                d="M22.54 3.42a2.78 2.78 0 00-1.94-2C18.88 1 12 1 12 1s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 8.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 16c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2c.313-1.732.467-3.49.46-5.25a29.005 29.005 0 00-.46-5.33v0z"
                stroke={theme.colors.gray500}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.75 12.02l5.75-3.27-5.75-3.27v6.54z"
                stroke={theme.colors.gray500}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a href="https://slack.prisma.io/">
            <svg
              viewBox="0 0 26 26"
              fill="none"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              aria-labelledby="footerIconSlack"
            >
              <title id="footerIconSlack">Join us on Slack</title>
              <path
                d="M16 10.6c-.996 0-1.8-.804-1.8-1.8v-6c0-.996.804-1.8 1.8-1.8s1.8.804 1.8 1.8v6c0 .996-.804 1.8-1.8 1.8zM23.2 10.6h-1.8V8.8c0-.996.804-1.8 1.8-1.8s1.8.804 1.8 1.8-.804 1.8-1.8 1.8zM10 15.4c.996 0 1.8.804 1.8 1.8v6c0 .996-.804 1.8-1.8 1.8s-1.8-.804-1.8-1.8v-6c0-.996.804-1.8 1.8-1.8zM2.8 15.4h1.8v1.8c0 .996-.804 1.8-1.8 1.8S1 18.196 1 17.2s.804-1.8 1.8-1.8zM15.4 16c0-.996.804-1.8 1.8-1.8h6c.996 0 1.8.804 1.8 1.8s-.804 1.8-1.8 1.8h-6c-.996 0-1.8-.804-1.8-1.8zM17.2 21.4h-1.8v1.8c0 .996.804 1.8 1.8 1.8s1.8-.804 1.8-1.8-.804-1.8-1.8-1.8zM10.6 10c0-.996-.804-1.8-1.8-1.8h-6C1.804 8.2 1 9.004 1 10s.804 1.8 1.8 1.8h6c.996 0 1.8-.804 1.8-1.8zM8.8 4.6h1.8V2.8c0-.996-.804-1.8-1.8-1.8S7 1.804 7 2.8s.804 1.8 1.8 1.8z"
                stroke={theme.colors.gray500}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a href="https://github.com/prisma">
            <svg
              viewBox="0 0 25 26"
              fill="none"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              aria-labelledby="footerIconGH"
            >
              <title id="footerIconGH">Find us on GitHub</title>
              <path
                d="M8.99 21.576C3.283 23.288 3.283 18.722 1 18.152M16.98 25v-4.417a3.847 3.847 0 00-1.073-2.98c3.584-.399 7.35-1.757 7.35-7.99a6.21 6.21 0 00-1.712-4.28 5.787 5.787 0 00-.103-4.302S20.096.63 16.98 2.72a15.272 15.272 0 00-7.99 0C5.874.63 4.527 1.03 4.527 1.03a5.787 5.787 0 00-.103 4.304 6.21 6.21 0 00-1.712 4.314c0 6.187 3.767 7.545 7.35 7.99a3.847 3.847 0 00-1.072 2.945V25"
                stroke={theme.colors.gray500}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
        <p className="copyright">Prisma © 2018-2020.</p>
        <p className="berlin">Made with ❤️ in Berlin and worldwide</p>
      </div>
    </div>
  </FooterSection>
);

export default Footer;
