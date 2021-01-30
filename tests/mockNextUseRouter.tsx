const useRouter = jest.spyOn(require("next/router"), "useRouter");

// Mocks Next.js useRouter React hook on a test-case by test-case basis
// Credit and thanks to: https://github.com/aeksco
// Please see: https://github.com/vercel/next.js/issues/7479
export function mockNextUseRouter({route, pathname}: Props) {
  useRouter.mockImplementation(() => ({route, pathname}));
}

type Props = {
  route: string;
  pathname: string;
};