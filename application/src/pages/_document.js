import { Html, Head, Main, NextScript } from 'next/document'

/**
 * This component is the custom document component.
 * @returns {JSX.Element} - The document component.
 
 */
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="min-h-screen bg-background font-sans antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
