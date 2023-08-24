import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação:', () => {
  // acessar os elementos na tela
  renderWithRouter(<App />);
  const linkHome = screen.getByRole('link', { name: 'Home' });
  const linkAbout = screen.getByRole('link', { name: 'About' });
  const linkFavorite = screen.getByRole('link', { name: 'Favorite Pokémon' });
  // agir interagindo com os elementos da tela (se necessário0

  // aferir

  expect(linkHome).toBeInTheDocument();
  expect(linkAbout).toBeInTheDocument();
  expect(linkFavorite).toBeInTheDocument();
});
