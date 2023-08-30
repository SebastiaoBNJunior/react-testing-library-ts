import { screen } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('6. Teste o componente <Pokemon.tsx />:', () => {
  describe('Teste se é renderizado um card com as informações de determinado Pokémon:', () => {
    test('O nome correto do Pokémon deve ser mostrado na tela.', () => {
      renderWithRouter(<App />);
      const pokemonName = screen.getByText(/pikachu/i);
      const pokemonNameId = screen.getByTestId('pokemon-name');
      expect(pokemonNameId).toBeInTheDocument();
      expect(pokemonName.textContent).toEqual(pokemonNameId.textContent);
    });
    test('O tipo correto do Pokémon deve ser mostrado na tela.', () => {
      renderWithRouter(<App />);
      const pokemonTypeId = screen.getByTestId('pokemon-type');
      expect(pokemonTypeId).toBeInTheDocument();
      expect(pokemonTypeId.textContent).toBe('Electric');
    });
    test('O peso médio do Pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>, em que <value> e <measurementUnit> são, respectivamente, o peso médio do Pokémon e sua unidade de medida.', () => {
      renderWithRouter(<App />);
      const pokemonAverageWight = screen.getByTestId('pokemon-weight');
      expect(pokemonAverageWight).toBeInTheDocument();
      expect(pokemonAverageWight.textContent).toBe('Average weight: 6.0 kg');
    });
    test('A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a URL da imagem e um atributo alt com o texto <name> sprite, em que <name> é o nome do Pokémon.', () => {
      renderWithRouter(<App />);
      const pokemonImgAlt = screen.getByAltText(/pikachu sprite/i);
      const pokemonNameId = screen.getByTestId('pokemon-name');
      expect(pokemonImgAlt.getAttribute('alt')).toContain(pokemonNameId.textContent);
      expect(pokemonImgAlt).toBeInTheDocument();
      expect(pokemonImgAlt.getAttribute('src')).toBe('https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
    });
    test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes desse Pokémon. O link deve ter a URL /pokemon/<id>, em que <id> é o id do Pokémon exibido.', () => {
      renderWithRouter(<App />);
      const pokemonDetailsLink = screen.getByRole('link', { name: /more details/i });
      expect(pokemonDetailsLink).toBeInTheDocument();
      expect(pokemonDetailsLink).toHaveAttribute('href', '/pokemon/25');
    });
    test('Teste se, ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon.', async () => {
      const { user } = renderWithRouter(<App />);
      const pokemonDetailsLink = screen.getByRole('link', { name: /more details/i });
      await user.click(pokemonDetailsLink);
      expect(screen.getByRole('heading', { name: /pikachu details/i })).toBeInTheDocument();
    });
    test('Teste se, ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon.', async () => {
      const { user } = renderWithRouter(<App />);
      const pokemonLinkDetails = screen.getByRole('link', { name: /more details/i });
      expect(pokemonLinkDetails).toHaveAttribute('href', '/pokemon/25');
      await user.click(pokemonLinkDetails);
      expect(screen.getByRole('heading', { name: /pikachu details/i })).toBeInTheDocument();
    });
    describe('Teste se existe um ícone de estrela nos Pokémon favoritados:', () => {
      test('O ícone deve ser uma imagem com o atributo src que contém o caminho /star-icon.png.', async () => {
        const { user } = renderWithRouter(<App />);
        const moreDetailsLik = screen.getByRole('link', { name: /more details/i });
        await user.click(moreDetailsLik);
        const pokemonCheckBox = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
        await user.click(pokemonCheckBox);
        const favoritePokemonLink = screen.getByRole('link', { name: /favorite pokémon/i });
        await user.click(favoritePokemonLink);
        const pokemonImgStar = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
        expect(pokemonImgStar).toHaveAttribute('src', '/star-icon.png');
      });
    });
  });
});
