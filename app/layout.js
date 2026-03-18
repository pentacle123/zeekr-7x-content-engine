export const metadata = { title: "ZEEKR 7X Algorithm Content Engine", description: "Pentacle × AI Platform" };
export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head><link rel="preconnect" href="https://cdn.jsdelivr.net" /><link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" rel="stylesheet" /></head>
      <body style={{margin:0,padding:0}}>{children}</body>
    </html>
  );
}
