import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação: Home, About e Favorite Pokémon.', () => {
  renderWithRouter(<App />);
  const linkHome = screen.getByRole('link', { name: 'Home' });
  const linkAbout = screen.getByRole('link', { name: 'About' });
  const linkFavorite = screen.getByRole('link', { name: 'Favorite Pokémon' });

  expect(linkHome).toBeInTheDocument();
  expect(linkAbout).toBeInTheDocument();
  expect(linkFavorite).toBeInTheDocument();
});
