import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect } from '@storybook/test';

import { Page } from './Page';

const meta = {
  title: 'Example/Page',
  component: Page,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loginButton = canvas.getByRole('button', { name: /Log in/i });
    await expect(loginButton).toBeInTheDocument();
    
    userEvent.click(loginButton);
    
    const usernameInput = canvas.getByLabelText(/Username/i);
    await expect(usernameInput).toBeInTheDocument();
    
    userEvent.type(usernameInput, 'testuser');
    
    const passwordInput = canvas.getByLabelText(/Password/i);
    await expect(passwordInput).toBeInTheDocument();
    
    userEvent.type(passwordInput, 'testpassword');
    
    const submitButton = canvas.getByRole('button', { name: /Log in/i });
    await expect(submitButton).toBeInTheDocument();
    
    userEvent.click(submitButton);
    
    const logoutButton = canvas.getByRole('button', { name: /Log out/i });
    await expect(logoutButton).toBeInTheDocument();
    
    userEvent.click(logoutButton);
    
    await expect(loginButton).toBeInTheDocument();
  },
};

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const LoggedIn: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loginButton = canvas.getByRole('button', { name: /Log in/i });
    await expect(loginButton).toBeInTheDocument();
    await userEvent.click(loginButton);
    await expect(loginButton).not.toBeInTheDocument();

    const logoutButton = canvas.getByRole('button', { name: /Log out/i });
    await expect(logoutButton).toBeInTheDocument();
  },
};
