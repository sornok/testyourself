import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TestYourself - Discover Yourself Through Fun Tests",
  description: "Take personality tests, memory challenges, trivia quizzes, optical illusion tests, and typing tests to discover more about yourself!",
  keywords: "personality test, memory test, trivia quiz, optical illusion, typing test, self-discovery, MBTI",
  openGraph: {
    title: "TestYourself - Discover Yourself Through Fun Tests",
    description: "Take personality tests, memory challenges, trivia quizzes, optical illusion tests, and typing tests to discover more about yourself!",
    type: "website",
    siteName: "TestYourself",
  },
  twitter: {
    card: "summary_large_image",
    title: "TestYourself - Discover Yourself Through Fun Tests",
    description: "Take personality tests, memory challenges, trivia quizzes, optical illusion tests, and typing tests to discover more about yourself!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
