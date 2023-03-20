import type { LanguageName } from "@uiw/codemirror-extensions-langs";

import CodeMirror from "@uiw/react-codemirror";
import { atomone } from "@uiw/codemirror-theme-atomone";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";

interface ResponseViewProps {
  review: string;
  lang: LanguageName;
}

const ResponseView = ({ review, lang }: ResponseViewProps) => {
  return (
    <div className="relative">
      <CodeMirror
        value={review}
        placeholder="로보-트가 리뷰를 완료하면 보일 공간입니다."
        theme={atomone}
        extensions={[loadLanguage(lang)!]}
        height="70vh"
        width="45vw"
        editable={false}
        basicSetup={{
          lineNumbers: false,
        }}
      />
    </div>
  );
};

export default ResponseView;
