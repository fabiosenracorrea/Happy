import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  position: relative;

  a {
    position: absolute;
    right: 40px;
    bottom: 40px;
    width: 64px;
    height: 64px;
    background: #15c3d6;
    border-radius: 15px;
    color: white;

    z-index: 10;

    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;

    &:hover {
      background: #17d6eb;
    }
  }
`;

export const SideBar = styled.aside`
  background: linear-gradient(329.54deg, #29b6d1 0%, #00c7c7 100%);
  width: 440px;
  padding: 80px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h2 {
    font-size: 40px;
    font-weight: 800;
    line-height: 42px;
    margin-top: 64px;
  }

  p {
    line-height: 28px;
    margin-top: 24px;
  }

  strong {
    display: block;
    font-weight: 800;
  }
`;

export const MapContainer = styled.div`
  flex: 1;

  z-index: 5;
`;
