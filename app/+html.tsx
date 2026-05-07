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
                --bg: #0D1117;
                --bg-secondary: #161B22;
                --accent-primary: #3B82F6;
                --accent-secondary: #06B6D4;
                --glass-bg: rgba(22,27,34,0.95);
                --glass-border: rgba(48,54,61,0.9);
                --glass-highlight: rgba(48,54,61,0.6);
                --text-primary: #F1F5F9;
                --text-secondary: #94A3B8;
                --text-muted: #64748B;
                --navbar-bg: rgba(13,17,23,0.92);
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
