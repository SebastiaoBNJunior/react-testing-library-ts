import { screen } from '@testing-library/react';
import { Pokedex } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('5. Teste o componente <Pokedex.tsx />', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered Pokémon.', () => {
    renderWithRouter(<Pokedex pokemonList={ [] } favoritePokemonIdsObj={ {} } />);
    const textHeading = screen.getByRole('heading', {
      name: 'Encountered Pokémon',
    });
    expect(textHeading).toBeInTheDocument();
  });
});
