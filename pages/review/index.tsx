import Head from "next/head";
import CodeMirror from "@uiw/react-codemirror";
import { atomone } from "@uiw/codemirror-theme-atomone";
import { LanguageName, loadLanguage } from "@uiw/codemirror-extensions-langs";
import { useState } from "react";
import ResponseView from "@/components/ReviewResponse";
import LoadingDots from "@/components/LoadingDots";
import { LANG_ARRAY } from "@/utils/CONSTANT";

const Review = () => {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [review, setReview] = useState("");
  const [lang, setLang] = useState<LanguageName>("javascript");

  const prompt = `
  아래 코드는 내가 알고리즘을 공부하면서 작성한 코드야. 
  코드에대한 전체적인 리뷰를 주석으로 부탁해.
  한줄에 50자가 안넘도록 해줘.
  ${code}
  
  `;

  const generateCodeReview = async (e: any) => {
    e.preventDefault();
    setReview("");
    setIsLoading(true);
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
      setReview((prev) => prev + chunkValue);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <title>코드리뷰</title>
      </Head>
      <div className="mx-auto flex h-[85vh] min-h-full max-w-5xl flex-col items-center justify-center py-2">
        <div className="mb-4">
          <label htmlFor="lang" className="mr-2 text-blue-300">
            언어선택
          </label>
          <select
            className="h-8 w-32 bg-blue-300"
            onChange={(e) => setLang(e.target.value as LanguageName)}
            value={lang}
            id="lang"
          >
            {LANG_ARRAY.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
        <div className="flex">
          <CodeMirror
            value={code}
            onChange={(value) => setCode(value)}
            placeholder="코드를 입력하세요."
            theme={atomone}
            extensions={[loadLanguage(lang)!]}
            height="70vh"
            width="45vw"
            className="border-r border-solid border-gray-300"
          />
          <ResponseView review={review} lang={lang} />
        </div>
        {!isLoading && (
          <button
            className="mt-8 w-full rounded-xl bg-black px-4 py-2 font-medium text-white hover:bg-black/80 sm:mt-10"
            onClick={(e) => generateCodeReview(e)}
          >
            답변 제출하기 &rarr;
          </button>
        )}
        {isLoading && (
          <button
            className="mt-8 w-full rounded-xl bg-black px-4 py-2 font-medium text-white hover:bg-black/80 sm:mt-10"
            disabled
          >
            <LoadingDots color="white" style="large" />
          </button>
        )}
      </div>
    </>
  );
};

export default Review;
