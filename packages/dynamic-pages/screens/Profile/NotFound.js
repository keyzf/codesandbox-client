import React from 'react';
import styled from 'styled-components';
import Button from 'common/components/Button';
import PageContainer from '../../components/PageContainer';

const FourOfFourContainer = styled.main`
  max-width: 663px;
  margin: auto;
  margin-bottom: 50px;
`;

const H1 = styled.h1`
  font-family: Poppins;
  font-weight: 500;
  font-size: 144px;

  color: #f2f2f2;
`;

const H2 = styled.h2`
  font-family: Poppins;
  font-weight: 500;
  font-size: 48px;

  color: #f2f2f2;
`;

export default () => (
  <PageContainer>
    <FourOfFourContainer>
      <H1>404</H1>
      <H2>We could not find the page you're looking for.</H2>
      <Button
        css={`
          margin-top: 60px;
        `}
        onClick={() => window.history.go(-1)}
      >
        Go back
      </Button>
    </FourOfFourContainer>
  </PageContainer>
);
