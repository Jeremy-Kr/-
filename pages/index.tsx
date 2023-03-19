import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/react/1");
  }, []);

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center py-2">
      <Head>
        <title>기술 면접 준비</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-4 text-center sm:mt-20"></main>
    </div>
  );
};

export default Home;
