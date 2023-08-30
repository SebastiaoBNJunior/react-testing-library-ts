import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('6. Teste o componente <Pokemon.tsx />', () => {
  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes desse Pokémon:', () => {
    const { user } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(moreDetails).toHaveAttribute('to', `/pokemon/${id}`);
  });
});
