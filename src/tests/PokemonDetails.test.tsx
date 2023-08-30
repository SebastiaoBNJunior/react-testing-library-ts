import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('7. Teste o componente <PokemonDetails.tsx />:', () => {
  //
  describe('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela:', () => {
    //
    test('A página deve conter um texto <name> Details, em que <name> é o nome do Pokémon:', async () => {
      const { user } = renderWithRouter(<App />);
      const moreDetailsLik = screen.getByRole('link', { name: /more details/i });
      await user.click(moreDetailsLik);
      const namePokemonDetails = screen.getByRole('heading', { name: /pikachu details/i });
      expect(namePokemonDetails).toBeInTheDocument();
      expect(moreDetailsLik).not.toBeInTheDocument();
      const pokemoSummary = screen.getByRole('heading', { name: /summary/i });
      expect(pokemoSummary).toBeInTheDocument();
      const pokemonSummaryText = screen.getByText(/This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat./i);
      expect(pokemonSummaryText).toBeInTheDocument();
    });
    test('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon:', async () => {
      const { user } = renderWithRouter(<App />);
      const moreDetailsLik = screen.getByRole('link', { name: /more details/i });
      await user.click(moreDetailsLik);
      const gameLocationsPokemon = screen.getByRole('heading', { name: /game locations of pikachu/i });
      expect(gameLocationsPokemon).toBeInTheDocument();

      const pokemonLocationMap = screen.getAllByAltText(/pikachu location/i);
      expect(pokemonLocationMap).toHaveLength(2);
      expect(screen.getByText(/kanto viridian forest/i)).toBeInTheDocument();
      expect(pokemonLocationMap[0]).toBeInTheDocument();
      expect(pokemonLocationMap[0]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
      expect(pokemonLocationMap[0]).toHaveAttribute('alt', 'Pikachu location');

      expect(screen.getByText(/kanto power plant/i)).toBeInTheDocument();
      expect(pokemonLocationMap[1]).toBeInTheDocument();
      expect(pokemonLocationMap[1]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
      expect(pokemonLocationMap[1]).toHaveAttribute('alt', 'Pikachu location');
    });
    test('Teste se o usuário pode favoritar um Pokémon por meio da página de detalhes:', async () => {
      const { user } = renderWithRouter(<App />);
      const moreDetailsLik = screen.getByRole('link', { name: /more details/i });
      await user.click(moreDetailsLik);

      const pokemonCheckBox = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
      expect(pokemonCheckBox).toBeInTheDocument();
      const pokemonCheckBoxLabel = screen.getByLabelText('Pokémon favoritado?');
      expect(pokemonCheckBoxLabel).toBeInTheDocument();
      await user.click(pokemonCheckBox);

      const imgPokemonFavorite = screen.getByRole('img', {
        name: /pikachu is marked as favorite/i,
      });
      expect(pokemonCheckBox).toBeInTheDocument();
      expect(imgPokemonFavorite).toBeInTheDocument();
      await user.click(pokemonCheckBox);
      expect(imgPokemonFavorite).not.toBeInTheDocument();
      expect(screen.getByLabelText('Pokémon favoritado?')).toBeInTheDocument();
    });
  });
});
