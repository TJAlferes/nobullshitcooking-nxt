import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import { http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';
import Register from '.';

export const handlers = [
  http.post('/users', async ({ request }) => {
    const data = await request.formData();
    const email = data.get('email');
 
    // don't do this here, do happy path (success) here, and do errors below w/ .use
    if (!email) {
      return new HttpResponse('Missing email', {status: 400});
    }

    //...
  }),
];

export const worker = setupWorker(...handlers);

beforeAll(async () => {
  await worker.start({onUnhandledRequest: 'error'});  // or 'warn'
});
afterEach(() => worker.resetHandlers());
afterAll(() => worker.stop());

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
  worker.use(
    http.post('https://your-api-endpoint.com/users', (info) => {
      return HttpResponse.json({error: 'Registration failed'}, {status: 400});
    })
  );

  render(<Register />);
  // Simulate user input
  //...
  fireEvent.click(screen.getByText('Create Account'));
  expect(await screen.findByText('Registration failed')).toBeInTheDocument();
});
