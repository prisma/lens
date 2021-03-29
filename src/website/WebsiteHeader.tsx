import React, { Component, RefObject, createRef } from "react"
import styled from "styled-components"

import { theme } from "../theme"

const NavLinksWrapper = styled.div`
  color: ${theme.colors.gray400};
  font-weight: 600;
  font-size: ${theme.fontSizes[14]};

  a {
    transition: color ${theme.transitions.standard};
    padding: 0 ${theme.space[12]};
    margin: 0 ${theme.space[8]};
  }

  a:hover {
    color: ${theme.colors.white};
  }

  .github {
    display: none;
  }

  @media (max-width: ${theme.breakpoints.phone}) {
    a[href] {
      display: block;
      padding: ${theme.space[8]} ${theme.space[12]};
    }

    .github {
      display: block;
    }
  }
`
const NavLinks = () => (
  <NavLinksWrapper>
    <a href="/docs/getting-started/quickstart-typescript">
      Quickstart
    </a>
    <a href="/docs/">Docs</a>
    <a href="/docs/about/faq">FAQ</a>
    <a href="/community">Community</a>
    <a href="/blog/">Blog</a>
    <a href="https://github.com/prisma" className="github">
      GitHub
    </a>
  </NavLinksWrapper>
)

const MobileNavWrapper = styled.nav`
  position: relative;
  display: none;

  .menu {
    outline: none;
    text-transform: uppercase;
    font-weight: bold;
    font-size: ${theme.fontSizes[16]};
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${theme.colors.gray300};
  }

  .list {
    display: none;
    position: absolute;
    right: 0;
    background: blue;
    text-align: right;
    padding: ${theme.space[16]} 0;
    border-radius: 6px;
    background: ${theme.colors.gray800};
  }

  .list[data-open="true"] {
    display: block;
  }

  @media (max-width: ${theme.breakpoints.phone}) {
    display: block;
  }
`
class MobileNav extends Component<{}, { open: boolean }> {
  private readonly nav: RefObject<HTMLElement>

  state = {
    open: false,
  }

  constructor(props: {}) {
    super(props)
    this.nav = createRef()
  }

  toggle = () => {
    this.setState({ open: !this.state.open })
  }

  maybeClose = (e: MouseEvent) => {
    const target = e.target
    if (!this.state.open) {
      return
    }
    if (!(target instanceof HTMLElement)) {
      return
    }
    if (this.nav.current && this.nav.current.contains(target)) {
      return
    }
    this.setState({
      open: false,
    })
  }

  componentDidMount() {
    if (typeof window !== "undefined") {
      window.addEventListener("click", this.maybeClose)
    }
  }

  componentWillUnmount() {
    if (typeof window !== "undefined") {
      window.removeEventListener("click", this.maybeClose)
    }
  }

  render() {
    return (
      <MobileNavWrapper ref={this.nav}>
        <button className="menu" onClick={this.toggle}>
          menu
        </button>
        <div className="list" data-open={this.state.open}>
          <NavLinks />
        </div>
      </MobileNavWrapper>
    )
  }
}

const NavWrapper = styled.nav`
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1.5;

  .logo {
    height: 24px;
    fill: ${theme.colors.white};
  }

  .github {
    transition: transform ${theme.transitions.standard};
    margin-left: ${theme.space[24]};
  }

  .github:hover {
    transform: scale(1.2);
  }

  .github svg {
    height: 24px;
    fill: ${theme.colors.white};
  }

  .menu {
    display: flex;
  }

  @media (max-width: ${theme.breakpoints.phone}) {
    .menu {
      display: none;
    }

    .github {
      display: none;
    }
  }
`
const Nav = () => (
  <NavWrapper>
    <a href="/">
      <svg
        className="logo"
        viewBox="0 0 90 24"
        fill="none"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        aria-labelledby="logoTitle"
      >
        <title id="logoTitle">Prisma.io</title>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M34.736 11.947h.9c.842 0 1.471-.168 1.89-.502.417-.335.626-.822.626-1.462 0-.645-.175-1.122-.525-1.43-.35-.308-.899-.462-1.646-.462h-1.245v3.856zm6.179-2.061c0 1.398-.434 2.466-1.303 3.206-.867.741-2.101 1.11-3.702 1.11h-1.174v4.62H32V5.835h4.122c1.565 0 2.755.34 3.57 1.017.815.678 1.223 1.69 1.223 3.034zM48.167 8.704c.365 0 .668.027.91.08l-.203 2.54a3.08 3.08 0 00-.795-.088c-.859 0-1.528.222-2.008.666-.48.444-.72 1.066-.72 1.866v5.054H42.66V8.891h2.039l.397 1.67h.132a3.726 3.726 0 011.24-1.346c.521-.34 1.087-.51 1.7-.51zM50.505 18.822h2.692V8.891h-2.692v9.931zM50.39 6.323c0-.882.489-1.323 1.465-1.323.977 0 1.466.441 1.466 1.323 0 .421-.122.748-.366.982-.245.234-.611.35-1.1.35-.976 0-1.465-.443-1.465-1.332zM62.675 15.873c0 1.019-.352 1.795-1.055 2.328-.703.532-1.755.799-3.155.799-.719 0-1.33-.049-1.836-.147a6.904 6.904 0 01-1.421-.43v-2.24c.5.238 1.063.436 1.69.596.627.16 1.178.24 1.655.24.977 0 1.465-.284 1.465-.853a.715.715 0 00-.194-.52c-.13-.133-.353-.284-.67-.453a16.977 16.977 0 00-1.272-.59c-.759-.32-1.317-.616-1.672-.889a2.488 2.488 0 01-.777-.937c-.162-.352-.243-.786-.243-1.301 0-.883.34-1.565 1.02-2.048.68-.482 1.642-.724 2.89-.724 1.189 0 2.345.261 3.469.782l-.812 1.954a14.913 14.913 0 00-1.386-.524 4.326 4.326 0 00-1.315-.204c-.794 0-1.192.216-1.192.648 0 .243.129.454.384.631.257.178.817.441 1.682.79.77.315 1.336.608 1.695.88.358.273.623.586.794.942.17.355.256.779.256 1.27zM73.34 18.822h-2.693v-5.8c0-.717-.119-1.255-.357-1.613-.238-.358-.613-.537-1.125-.537-.689 0-1.189.254-1.5.764-.313.51-.469 1.347-.469 2.514v4.672h-2.692V8.891h2.057l.362 1.27h.15a2.741 2.741 0 011.147-1.07c.5-.258 1.074-.387 1.722-.387 1.477 0 2.477.486 3 1.457h.239c.265-.462.654-.82 1.17-1.075.514-.255 1.095-.382 1.743-.382 1.118 0 1.964.289 2.537.866.574.578.86 1.503.86 2.776v6.476h-2.7v-5.8c0-.717-.12-1.255-.358-1.613-.238-.358-.613-.537-1.125-.537-.66 0-1.152.237-1.479.71-.326.474-.49 1.226-.49 2.257v4.983zM87.326 14.22l-1.042.036c-.783.024-1.365.166-1.747.427-.383.26-.574.657-.574 1.19 0 .764.435 1.146 1.306 1.146.624 0 1.123-.18 1.496-.542.374-.361.56-.84.56-1.44v-.816zm.794 4.602l-.52-1.35h-.072c-.453.575-.919.973-1.399 1.195-.479.222-1.104.333-1.875.333-.948 0-1.693-.273-2.238-.817-.544-.545-.816-1.32-.816-2.328 0-1.054.366-1.831 1.099-2.332.733-.5 1.837-.777 3.314-.83l1.713-.053v-.436c0-1.006-.512-1.51-1.536-1.51-.789 0-1.716.24-2.78.72l-.892-1.83c1.136-.598 2.395-.898 3.778-.898 1.324 0 2.339.29 3.045.871.706.58 1.059 1.463 1.059 2.647v6.618h-1.88zM18.01 19.037L7.163 22.224a.454.454 0 01-.58-.52L10.46 3.267c.073-.345.552-.4.704-.08l7.173 15.138a.514.514 0 01-.327.713zm1.86-.752L11.562.757a1.333 1.333 0 00-1.136-.755 1.32 1.32 0 00-1.213.626l-9.009 14.5c-.279.451-.273 1.008.016 1.455l4.404 6.778a1.419 1.419 0 001.59.581l12.782-3.756c.392-.116.712-.39.88-.756a1.354 1.354 0 00-.008-1.145z"
        />
      </svg>
    </a>
    <div className="menu">
      <NavLinks />
      <a href="https://github.com/prisma/prisma" className="github">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 12.03C0 5.386 5.373 0 12 0s12 5.386 12 12.03c0 5.313-3.434 9.82-8.2 11.413-.608.118-.824-.257-.824-.578l.004-.669c.004-.62.01-1.556.01-2.632 0-1.122-.383-1.854-.814-2.227 2.672-.298 5.48-1.316 5.48-5.936 0-1.313-.466-2.386-1.235-3.229.124-.303.535-1.526-.118-3.183 0 0-1.006-.323-3.297 1.233-.959-.267-1.986-.4-3.006-.405-1.02.005-2.046.138-3.004.405-2.293-1.556-3.3-1.233-3.3-1.233-.652 1.657-.241 2.88-.117 3.183-.767.843-1.236 1.916-1.236 3.23 0 4.609 2.802 5.64 5.467 5.944-.343.3-.654.831-.762 1.609-.394.177-1.136.428-1.899.259a.344.344 0 00-.133-.074.333.333 0 00-.158-.012c-.41-.152-.814-.444-1.162-.952a.32.32 0 00-.13-.205l-.01-.016s-.095-.174-.282-.391a.252.252 0 00-.07-.15.253.253 0 00-.153-.083 2.541 2.541 0 00-.45-.337.236.236 0 00-.094-.052 2.003 2.003 0 00-.79-.227s-1.171-.015-.082.731c0 0 .786.37 1.332 1.76 0 0 .705 2.148 4.043 1.42.003.546.007 1.075.011 1.491v.003l.005.745c0 .318-.22.69-.82.58A12.03 12.03 0 010 12.03zm4.507 4.912c-.076-.023-.15-.003-.173.05-.028.06.02.142.108.18.085.042.179.024.205-.036.023-.044.002-.1-.046-.142a2.114 2.114 0 00-.094-.052zm.544.39a.12.12 0 00-.093.027c-.058.054-.044.166.035.25.076.084.188.108.245.055a.12.12 0 00.036-.1 2.95 2.95 0 00-.223-.233zm.515.639c-.065-.046-.138-.057-.19-.022-.075.052-.075.18-.001.287.074.107.194.155.268.104.047-.033.064-.095.053-.164a3.58 3.58 0 01-.13-.205zm1.292 1.157c-.07.013-.126.052-.142.108-.028.096.061.206.197.247.136.04.27-.003.3-.097.017-.058-.01-.122-.064-.172a2.223 2.223 0 01-.29-.086zm-.53-.006c-.066.073-.206.053-.309-.046-.105-.097-.134-.235-.068-.307.067-.073.207-.053.31.046.105.097.137.235.067.307zm1.892.376c.003.1-.112.182-.255.183-.143.004-.26-.076-.26-.174 0-.1.112-.182.255-.184.143-.003.26.077.26.175zm.766.185c.141-.026.24-.126.224-.223-.019-.098-.146-.156-.287-.132-.14.026-.24.125-.223.225.018.096.147.155.286.13z"
          />
        </svg>
      </a>
    </div>
  </NavWrapper>
)

const HeaderWrapper = styled.div`
  padding: 0 ${theme.space[16]};
  display: flex;
`
const WebsiteHeader = () => (
  <HeaderWrapper>
    <Nav />
    <MobileNav />
  </HeaderWrapper>
)
export { WebsiteHeader }
