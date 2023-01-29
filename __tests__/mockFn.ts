/*
Used in unit test files (like Login.test.tsx) of connected React components (like Login.tsx)
that use react-redux's useDispatch with our redux action creators.

Instead of using jest.fn() to make a test double of an action creator, we use this.

Previously, we simply used jest.fn(),
because the TypeScript static type of action creators
passed into the component via mapDispatchToProps
was explicitly declared in the React component's props.

This was when we used connect, mapStateToProps, and mapDispatchToProps.

Now, we instead use the useSelector and useDispatch hooks,
as they seem to be more idiomatic when combining Next.js and redux.

As with almost anything, there is likely a better way to do this.
*/
export default function mockFn<T extends (...args: any[]) => any>(fn: T): jest.MockedFunction<T> {
  return fn as jest.MockedFunction<T>;
}