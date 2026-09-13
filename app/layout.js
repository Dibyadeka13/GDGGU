import "./globals.css";

export const metadata = {
  title: "GDGGU",
  description:
    "Official website of Google Developer Group, Gauhati University (GDGGU). Join us and meet the team.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
