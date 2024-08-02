import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />

        <link
          rel="preload"
          href="/fonts/inter-var-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        <script async src="https://cdn.splitbee.io/sb.js"></script>
        {/* <Script strategy="beforeInteractive" src="/libs/dat.guiParams.min.js" /> */}

        {/* <script src="https://cdn.jsdelivr.net/npm/dat.gui/build/dat.gui.min.js"></script> */}
        <script src="/libs/dat/dat.gui.min.js"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
