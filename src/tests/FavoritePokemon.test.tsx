import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('3. Teste o componente <FavoritePokemon.tsx />', () => {
  test('É exibido na tela a mensagem No favorite pokemon found caso não tenha nenhum pokémon na lista de favoritos', async () => {
    const { user } = renderWithRouter(<App />);
    const favoritePokemonLink = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });
    await user.click(favoritePokemonLink);
    expect(screen.getByText(/no favorite pokémon found/i)).toBeInTheDocument();
  });

  test('São exibidos na tela apenas os Pokémon favoritados', async () => {
    const { user } = renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    await user.click(moreDetailsLink);
    const favoritePókemonCheckBox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    await user.click(favoritePókemonCheckBox);
    const favoritePokemonLinkMenu = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });
    await user.click(favoritePokemonLinkMenu);
    expect(screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    })).toBeInTheDocument();
  });
});
