import React, { lazy, Suspense } from "react";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const SyntaxHighlighter = lazy(() => 
  import("react-syntax-highlighter").then(mod => ({ default: mod.Prism }))
);

interface CodeBlockProps {
  language: string;
  value: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, value }) => {
  return (
    <div className="relative group my-8 bg-[#0d1117] rounded-xl overflow-hidden">
      <div className="absolute top-2 right-4 px-2 py-1 rounded bg-white/10 text-[10px] font-bold text-slate-400 uppercase tracking-widest z-10 group-hover:text-blue-400 transition-colors">
        {language}
      </div>
      <Suspense fallback={<div className="p-6 text-sm text-slate-500 font-mono">Loading code...</div>}>
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={language}
          PreTag="div"
          className="m-0! p-6! bg-[#0d1117]! text-sm!"
        >
          {value}
        </SyntaxHighlighter>
      </Suspense>
    </div>
  );
};

export default CodeBlock;
