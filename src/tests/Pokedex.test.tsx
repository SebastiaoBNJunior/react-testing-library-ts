import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('5. Teste o componente <Pokedex.tsx />', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered Pokémon.', () => {
    renderWithRouter(<App />);
    const textHeading = screen.getByRole('heading', {
      name: /encountered pokémon/i,
    });
    expect(textHeading).toBeInTheDocument();
  });
  test('O botão deve conter o texto Próximo Pokémon.', async () => {
    renderWithRouter(<App />);
    const nextPokemonButtonText = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(nextPokemonButtonText).toBeInTheDocument();
  });
  test('Os próximos Pokémon da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão.', async () => {
    const { user } = renderWithRouter(<App />);
    const nextPokemonButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    await user.click(nextPokemonButton);
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
    await user.click(nextPokemonButton);
    expect(screen.getByText(/caterpie/i)).toBeInTheDocument();
    await user.click(nextPokemonButton);
    expect(screen.getByText(/ekans/i)).toBeInTheDocument();
    await user.click(nextPokemonButton);
    expect(screen.getByText(/alakazam/i)).toBeInTheDocument();
    await user.click(nextPokemonButton);
    expect(screen.getByText(/mew/i)).toBeInTheDocument();
    await user.click(nextPokemonButton);
    expect(screen.getByText(/rapidash/i)).toBeInTheDocument();
    await user.click(nextPokemonButton);
    expect(screen.getByText(/snorlax/i)).toBeInTheDocument();
    await user.click(nextPokemonButton);
    expect(screen.getByText(/dragonair/i)).toBeInTheDocument();
    await user.click(nextPokemonButton);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });
  test('Teste se é mostrado apenas um Pokémon por vez.', async () => {
    const { user } = renderWithRouter(<App />);
    const pokemonOne = screen.getByText(/pikachu/i);
    expect(pokemonOne).toBeInTheDocument();
    const nextPokemonButtonOne = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    await user.click(nextPokemonButtonOne);
    const pokemonTwo = screen.getByText(/charmander/i);
    expect(pokemonTwo).toBeInTheDocument();
  });
  test('Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.', () => {
    renderWithRouter(<App />);
    const filterButton = screen.getAllByTestId('pokemon-type-button');
    filterButton.forEach((button) => {
      expect(button).toBeInTheDocument();
    });
  });
  test('Após a seleção de um botão de tipo, a Pokédex deve circular somente pelos Pokémon daquele tipo.', async () => {
    const { user } = renderWithRouter(<App />);
    const buttonPsychic = screen.getByRole('button', {
      name: /psychic/i,
    });
    await user.click(buttonPsychic);
    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon).toBeInTheDocument();

    const buttonPsychicText = buttonPsychic.textContent;
    const typePokemonText = typePokemon.textContent;
    expect(buttonPsychicText).toEqual(typePokemonText);

    const buttonAll = screen.getByRole('button', {
      name: /all/i,
    });
    const buttonAlltext = buttonAll.textContent;
    expect(buttonAlltext).toBe('All');
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro:', async () => {
    const { user } = renderWithRouter(<App />);
    const buttonAllType = screen.getByRole('button', {
      name: /all/i,
    });
    const buttonAllTypeText = buttonAllType.textContent;
    expect(buttonAllTypeText).toBe('All');

    const resetButton = screen.getByRole('button', { name: /all/i });
    expect(resetButton).toBeInTheDocument();

    const secondPokemon = screen.getByRole('button', { name: /fire/i });
    await user.click(secondPokemon);
    const namePokemon = screen.getByText(/charmander/i);
    expect(namePokemon).toBeInTheDocument();

    await user.click(resetButton);
    const primaryPokemon = screen.getByText(/pikachu/i);
    expect(primaryPokemon).toBeInTheDocument();
  });
});
