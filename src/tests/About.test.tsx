import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';

test('Teste se a página contém as informações sobre a Pokédex:', () => {
  renderWithRouter(<About />);
  const textAbout = screen.getByRole('heading', { name: 'About Pokédex' });

  expect(textAbout).toBeInTheDocument();
});

test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.:', () => {
  renderWithRouter(<About />);
  const textAbout = screen.getByRole('heading', { name: 'About Pokédex' });

  expect(textAbout).toBeInTheDocument();
});
