import FRONT_TECH_QUESTIONS from "@/utils/QUESTION";
import type { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import LoadingDots from "../../components/LoadingDots";

const Question = ({ question, idx }: any) => {
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [generatedAnswer, setGeneratedAnswer] = useState<String>("");

  const answerRef = useRef<null | HTMLDivElement>(null);

  const router = useRouter();

  const scrollToBios = () => {
    if (answerRef.current !== null) {
      answerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const prompt = `
  난 프론트엔드 신입 개발자고, 면접을 보러 왔어.
  ${question}이라는 질문을 받았어.
  내가 준비한 대답은 이거야.
  ${answer}
  이 대답에 대해서 아래와같이 "1."과 "2."를 반드시 포함해서 답변해줘.
  1. 대답에 대한 피드백
  2. 문제에 대한 모범답안
  `;
  const generateBio = async (e: any) => {
    e.preventDefault();
    setGeneratedAnswer("");
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedAnswer((prev) => prev + chunkValue);
    }
    scrollToBios();
    setLoading(false);
  };

  const getPrevPage = () => {
    if (idx === 1) {
      return;
    }
    router.push(`/react/${idx - 1}`);
  };

  const getNextPage = () => {
    if (idx === FRONT_TECH_QUESTIONS.length) {
      return;
    }
    router.push(`/react/${idx + 1}`);
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center py-2">
      <Head>
        <title>기술 면접 준비</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex w-full flex-1 flex-col items-center justify-center px-4 text-center">
        <h1 className="max-w-[708px] text-3xl font-bold text-slate-900 sm:text-5xl">
          GPT 선생님과 기술면접 뽀개기.
        </h1>
        <div className="w-full max-w-xl">
          <div className="mt-10 flex items-center space-x-3">
            <p className="text-left font-medium">{`${idx}. ${question}`}</p>
          </div>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={4}
            className="my-5 w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            placeholder={"답변을 입력 해 주세요."}
          />
          {!loading && (
            <button
              className="mt-8 w-full rounded-xl bg-black px-4 py-2 font-medium text-white hover:bg-black/80 sm:mt-10"
              onClick={(e) => generateBio(e)}
            >
              답변 제출하기 &rarr;
            </button>
          )}
          {loading && (
            <button
              className="mt-8 w-full rounded-xl bg-black px-4 py-2 font-medium text-white hover:bg-black/80 sm:mt-10"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="border-1 h-px bg-gray-700 dark:bg-gray-700" />
        <div className="my-10 space-y-10">
          {generatedAnswer && (
            <>
              <div>
                <h2
                  className="mx-auto text-3xl font-bold text-slate-900 sm:text-4xl"
                  ref={answerRef}
                >
                  답변과 해설
                </h2>
              </div>
              <div className="mx-auto flex max-w-xl flex-col items-center justify-center space-y-8">
                {generatedAnswer
                  .substring(generatedAnswer.indexOf("1") + 3)
                  .split("2.")
                  .map((answer, index) => (
                    <div
                      key={index}
                      className="cursor-copy rounded-xl border bg-white p-4 shadow-md transition hover:bg-gray-100"
                      onClick={() => {
                        navigator.clipboard.writeText(answer);
                        toast(
                          index === 0
                            ? "피드백이 복사되었습니다."
                            : "모범답안이 복사되었습니다.",
                          {
                            icon: "✂️",
                          }
                        );
                      }}
                    >
                      <p>{answer}</p>
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
        <div className="flex w-1/2 gap-8">
          <button
            className={`mt-8 w-1/2 rounded-xl bg-black px-4 py-2 font-medium text-white hover:bg-black/80 sm:mt-10 ${
              idx === 1
                ? "cursor-not-allowed bg-gray-300 hover:bg-gray-300"
                : ""
            }`}
            onClick={getPrevPage}
          >
            &larr; 이전문제 다시보기
          </button>
          <button
            className={`mt-8 w-1/2 rounded-xl bg-black px-4 py-2 font-medium text-white hover:bg-black/80 sm:mt-10 ${
              idx === FRONT_TECH_QUESTIONS.length
                ? "cursor-not-allowed bg-gray-300 hover:bg-gray-300"
                : ""
            }}`}
            onClick={getNextPage}
          >
            다음 문제 풀러가기 &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Question;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const idx = Number(context.params?.questionNumber);
  const question = FRONT_TECH_QUESTIONS[idx - 1];

  return {
    props: {
      question,
      idx,
    },
  };
}
