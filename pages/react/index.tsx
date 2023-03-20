import FRONT_TECH_QUESTIONS from "@/utils/QUESTION";

import type { NextPage } from "next";

import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [page, setPage] = useState(1);
  const [questions, setQuestions] = useState(FRONT_TECH_QUESTIONS);

  useEffect(() => {
    setQuestions(FRONT_TECH_QUESTIONS.slice((page - 1) * 10, page * 10));
  }, [page]);

  return (
    <>
      <Head>
        <title>기술 면접 준비</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto flex h-[85vh] min-h-full max-w-5xl flex-col items-center justify-center py-2">
        <div className="w-full max-w-xl px-4">
          <h1 className="text-center text-3xl font-bold">
            React 기술 면접 문제 목록
          </h1>
          {questions.map((question, idx) => (
            <Link
              href={`/react/${(page - 1) * 10 + idx + 1}`}
              key={question}
              className="mt-10 flex items-center space-x-3"
            >
              <p className="text-left font-medium">{`${
                (page - 1) * 10 + idx + 1
              }. ${question}`}</p>
            </Link>
          ))}
          <div className="mt-10 flex justify-center">
            <button
              className="rounded-md bg-slate-900 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              이전
            </button>
            <button
              className="ml-2 rounded-md bg-slate-900 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => setPage(page + 1)}
              disabled={page === 5}
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
