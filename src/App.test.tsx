import * as React from 'react';

import { render, screen } from '@testing-library/react';

import App from '~/App';

describe('App Component', () => {
  it('renders', () => {
    render(<App />);
    const title = screen.getByText(/encontre usuários no github/i);
    expect(title).toBeInTheDocument();
  });
});
