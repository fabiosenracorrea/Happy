import styled from 'styled-components';

import landingBackground from '../../images/landing.svg';

export const Container = styled.div`
  background: linear-gradient(329.54deg, #29b6d1 0%, #00c7c7 100%);
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0 20px;
`;

export const Content = styled.div`
  position: relative;

  width: 100%;
  max-width: 1100px;

  height: 680px;

  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;

  background: url(${landingBackground}) no-repeat 80% center;

  @media (max-width: 860px) {
    background-size: 60%;
    background-position: 80% 20%;
  }

  main {
    max-width: 350px;

    h1 {
      font-size: 76px;
      font-weight: 900;
      line-height: 78px;

      @media (max-width: 860px) {
        font-size: 58px;
        line-height: 58px;
      }
    }

    p {
      margin-top: 40px;
      font-size: 24px;
      line-height: 34px;
    }
  }

  a {
    position: absolute;

    right: 0;
    bottom: 0;

    width: 80px;
    height: 80px;
    background: #ffd666;
    border-radius: 15px;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: background-color 0.2s;

    @media (max-width: 400px) {
      bottom: -80px;
    }

    &:hover {
      background: #96feff;
    }

    svg {
      color: rgba(0, 0, 0, 0.6);
    }
  }
`;

export const Location = styled.div`
  position: absolute;

  right: 0;
  top: 0;
  font-size: 24px;
  line-height: 34px;
  text-align: right;

  @media (max-width: 400px) {
    top: -50px;
  }

  strong {
    display: block;
    font-weight: 800;
  }
`;
