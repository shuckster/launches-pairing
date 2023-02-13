import '../styles/globals.css';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  /**
   * Top-level await required to ensure Next.js getServersideProps
   * doesn't get run before MSW is ready.
   *
   * Also, MSW will not work with Node 18. Node 16 used in this repo.
   *
   * @see https://github.com/mswjs/msw/issues/1340
   */
  await import('../mocks');
}

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
