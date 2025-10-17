import { ApolloWrapper } from '../lib/apollo-wrapper';
import './globals.css';

export const metadata = {
  title: "Evan's Portfolio",
  description: 'Portfolio website showcasing my projects and skills',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}

