import { ScrollViewStyleReset } from 'expo-router/html';

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="description" content="Pratik Solanki - Portfolio" />

        <ScrollViewStyleReset />

        <link
          rel="preload"
          href="https://unpkg.com/@expo/vector-icons@15.0.3/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />

        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --bg: #0a0118;
                --bg-secondary: #1a0a2e;
                --accent-primary: #7C3AED;
                --accent-secondary: #2563EB;
                --glass-bg: rgba(255,255,255,0.08);
                --glass-border: rgba(255,255,255,0.15);
                --glass-highlight: rgba(255,255,255,0.12);
                --text-primary: #FFFFFF;
                --text-secondary: rgba(255,255,255,0.7);
                --text-muted: rgba(255,255,255,0.5);
                --navbar-bg: rgba(10,1,24,0.85);
              }
              body { background-color: var(--bg); margin: 0; overflow-x: hidden; }
              @font-face {
                font-family: 'Ionicons';
                src: url('https://unpkg.com/@expo/vector-icons@15.0.3/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf') format('truetype');
                font-display: swap;
              }
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
