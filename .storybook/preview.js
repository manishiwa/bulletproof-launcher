import React from 'react';
import { StorybookProvider } from '../src/providers/app';
import '../src/index.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
  (Story) => (
    <StorybookProvider>
      <Story />
    </StorybookProvider>
  ),
];
