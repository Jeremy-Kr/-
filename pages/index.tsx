import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import FRONT_TECH_QUESTIONS from "@/utils/QUESTION";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>기술 면접 준비</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto flex h-[85vh] max-w-5xl items-center justify-center gap-x-4 py-2">
        <Link
          href="/react"
          className="text-center text-3xl font-bold hover:text-gray-600"
        >
          React 문제 바로가기
        </Link>
        <Link
          href="/review"
          className="text-center text-3xl font-bold hover:text-gray-600"
        >
          코드리뷰 바로가기
        </Link>
      </div>
    </>
  );
};

export default Home;
