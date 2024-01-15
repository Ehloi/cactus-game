import { SessionProvider } from "next-auth/react";
import "../src/app/globals.css"; // or your global styles

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
