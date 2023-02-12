import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
  --bg: #F4F4F7;
  --light-bg: #fff;
  --main-font: #000;
  --secondary-font: #606060;
  --accent: #4386e6;
  --accent-alpha: #4386e6;
  --secondary-accent: #ffa34e;
  --reverse-font: #000;
  --hover:#eef5f7;
  --border: #fff;
}

.light {
  --bg: #F4F4F7;
  /* --bg: #dce7ea; */
  --light-bg: #fff;
  --main-font: #000;
  --secondary-font: #606060;
  --accent: #ff69b4;
  --accent-alpha: #ff69b499;
  --secondary-accent: #ffa34e;
  --reverse-font: #fff;
  --hover:#eef5f7;
  --border: #fff;
}

.dark {
  --bg: #1a1a1a;
  --light-bg: #262625;
  --main-font: #fff;
  --secondary-font: rgb(218, 218, 218);
  --accent: #845695;
  --accent-alpha: #84569580;
  --secondary-accent: #ffa34e;
  --reverse-font: #fff;
  --hover:#353636;
  --border: #111;
}

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap");

  * {
    font-family: "Poppins", sans-serif;
  }

  /* width */
  ::-webkit-scrollbar {
    width: 7px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #797a79;
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #845695;
  }

  body {
    background-color: black;
    /* background-color: var(--bg); */
    color: var(--main-font);

    font-size: 14px;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  p,
  a {
    font-weight: 300;
  }

  a {
    text-decoration: none;
    color: var(--main-font);
  }

  .sign-container{
    background-color: var(--bg);
  }

  button {
    /* margin-top: 32px; */
    cursor: pointer;
    background-color: var(--accent);
    border: 2px solid var(--accent);
    color: #fff;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    border-radius: 60px;
    gap: 10px;
    transition: all 0.2s ease;

    :hover{
      background-color: transparent;
      border: 2px solid var(--accent);
      color: var(--accent);
    }
  }

  button.negative{
    background-color: transparent;
    border: 2px solid #fff;
    padding: 12px 24px;

    :hover{
      background-color: #fff;
      border: 2px solid #fff;
      color: var(--accent);
    }
  }


  #nav {
    position: fixed;
    top: 0;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--light-bg);
    background-color: var(--bg);
    text-decoration: none;
    padding: 16px 5%;
    z-index: 999;
  }

  #logo {
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 22px;
    font-weight: 700;
    line-height: 0;
    margin: 0;
    color: var(--main-font);
  }

  .sign-label{
      display: none;
    }

  @media (max-width: 640px) {
    #logo span {
      display: none;
    }

    .sign-label{
      display: flex;
    }
  }

  #logo img {
    height: 42px;
  }

  #nav a {
    text-decoration: none;
  }

  #nav__links {
    display: flex;
    align-items: center;
    column-gap: 2em;
  }

  .nav__link {
    color: #fff;
    text-decoration: none;
    transition: 1s;
    border-bottom: 2px solid transparent;
    transition: all 0.3s ease-in-out;
    padding-bottom: 1px;
  }

  @media (max-width: 520px) {
    #nav__links {
      column-gap: 3em;
    }
  }

  .nav__link:hover {
    color: rgb(230, 228, 228);
    text-decoration: none;
    border-color: #845695;
  }

  #create__room__btn {
    display: block;
    background-color: #845695;
    padding: 8px 24px;
    font-size: 14px;
    font-weight: 500;
    border-radius: 5px;
  }

  #create__room__btn:hover {
    background-color: #845695;
  }

  .nav--list {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  #members__button,
  #chat__button {
    display: none;
    cursor: pointer;
    background: transparent;
    border: none;
  }

  #members__button:hover svg > path,
  #chat__button:hover svg,
  .nav__link:hover svg {
    fill: #845695;
  }

  .nav__link svg {
    width: 0;
    height: 0;
  }

  @media (max-width: 640px) {
    #members__button {
      display: block;
    }

    .nav__link svg {
      width: 1.5rem;
      height: 1.5rem;
    }
    .nav__link,
    #create__room__btn {
      font-size: 0;
      border: none;
    }

    #create__room__btn {
      padding: 0;
      background-color: transparent;
      border-radius: 50%;
    }

    #create__room__btn:hover {
      background-color: transparent;
    }
  }


`;
