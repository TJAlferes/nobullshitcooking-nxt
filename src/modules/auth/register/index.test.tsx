import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http } from 'msw';
import { setupServer } from 'msw/node';
import Register from '.';

const server = setupServer(
  // Define MSW request handlers here
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('it renders', () => {
  render(<Register />);
  expect(screen.getByText('Create Account')).toBeInTheDocument();
});

test('on submit, handles success', async () => {
  const user = userEvent.setup();
  render(<Register />);
  
  await user.type(screen.getByLabelText('Username'), 'testuser');
  await user.type(screen.getByLabelText('Email'), 'test@example.com');
  await user.type(screen.getByLabelText('Password'), 'password');
  await user.type(screen.getByLabelText('Password Again'), 'password');
  await user.click(screen.getByText('Create Account'));

  expect(await screen.findByText('User account created.')).toBeInTheDocument();
});

test('on submit, handles error', async () => {
  server.use(
    http.post('https://your-api-endpoint.com/users', ({ request }) => {
      return new Response(ctx.status(400), ctx.json({ error: 'Registration failed' }));
    })
  );

  render(<Register />);
  // Simulate user input
  //...
  fireEvent.click(screen.getByText('Create Account'));
  expect(await screen.findByText('Registration failed')).toBeInTheDocument();
});
