import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';

test('Teste se a página contém um heading h2 com o texto About Pokédex:', () => {
  renderWithRouter(<About />);

  // Teste se a página contém um heading h2 com o texto About Pokédex.
  const textAbout = screen.getByRole('heading', { name: 'About Pokédex' });
  expect(textAbout).toBeInTheDocument();

  // Teste se a página contém dois parágrafos com texto sobre a Pokédex.
  const paragraphs = screen.getAllByText(/Pokédex/i);
  expect(paragraphs).toHaveLength(2);

  // Teste se a página contém a seguinte imagem de uma Pokédex:
  const pokedexImage = screen.getByAltText('Pokédex');
  expect(pokedexImage).toBeInTheDocument();
  expect(pokedexImage.getAttribute('src')).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
