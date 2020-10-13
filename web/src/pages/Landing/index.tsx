import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

import logo from '../../images/logo.svg';

import { Container, Content, Location } from './styles';

const Landing: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={logo} alt="Happy Logo" />

        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças</p>
        </main>

        <Location>
          <strong>Belo Horizonte</strong>
          <span>Minas Gerais</span>
        </Location>

        <Link to="/app">
          <FiArrowRight size={26} />
        </Link>
      </Content>
    </Container>
  );
};

export default Landing;
