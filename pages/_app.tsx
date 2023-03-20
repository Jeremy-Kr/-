import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Noto_Sans_KR } from "next/font/google";

const notoSansKR = Noto_Sans_KR({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-noto-sans-kr",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${notoSansKR.variable} min-h-screen font-sans`}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </main>
  );
}
