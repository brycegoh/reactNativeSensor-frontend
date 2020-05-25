import React from 'react';
import { render } from '@testing-library/react';
import Routing from './Routing';

test('renders learn react link', () => {
  const { getByText } = render(<Routing />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
