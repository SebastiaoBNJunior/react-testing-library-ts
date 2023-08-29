import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

describe('4. Teste o componente <NotFound.tsx />', () => {
  test('Teste se a página contém um heading h2 com o texto Page requested not found.', () => {
    renderWithRouter(<NotFound />);
    const textHeading = screen.getByRole('heading', {
      name: 'Page requested not found',
    });
    expect(textHeading).toBeInTheDocument();
  });
});
