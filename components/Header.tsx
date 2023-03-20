import Link from "next/link";

export default function Header() {
  return (
    <header className="mt-5 flex w-full items-center justify-between border-b-2 px-2 pb-7 sm:px-4">
      <div className="flex items-center space-x-3">
        <Link href="/" className="flex space-x-3">
          <h1 className="ml-2 text-2xl font-bold tracking-tight sm:text-4xl">
            신입 면접 뽀개기
          </h1>
        </Link>
        <Link
          href="/react"
          className="text-lg font-medium text-gray-500 hover:text-gray-900"
        >
          프론트엔드 기술면접
        </Link>
        <Link
          href="/review"
          className="text-lg font-medium text-gray-500 hover:text-gray-900"
        >
          코드리뷰
        </Link>
      </div>
    </header>
  );
}
