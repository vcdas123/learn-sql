import React, { lazy, Suspense } from "react";
import remarkGfm from "remark-gfm";
import { Link } from "react-router-dom";
import CodeBlock from "./CodeBlock";

const ReactMarkdown = lazy(() => import("react-markdown"));

interface MarkdownPreviewProps {
  content: string;
  moduleId: string;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ content, moduleId }) => {
  return (
    <Suspense fallback={<div className="animate-pulse space-y-4">
      <div className="h-4 bg-white/5 rounded w-3/4"></div>
      <div className="h-4 bg-white/5 rounded w-1/2"></div>
      <div className="h-4 bg-white/5 rounded w-5/6"></div>
    </div>}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ node, children, ...props }) => {
            const text = React.Children.toArray(children).join("");
            const id = text
              .toLowerCase()
              .replace(/[^\w\s-]/g, "")
              .replace(/\s+/g, "-");
            return (
              <h2 id={id} {...props} className="scroll-mt-24 group flex items-center gap-3">
                <span className="flex-1">{children}</span>
                <Link 
                  to={`/${moduleId}#${id}`} 
                  className="opacity-0 group-hover:opacity-30 hover:!opacity-100 transition-all text-primary font-mono text-sm"
                  aria-label={`Link to ${text}`}
                >
                  #
                </Link>
              </h2>
            );
          },
          table: ({ node, ...props }) => (
            <div className="table-wrapper">
              <table {...props} />
            </div>
          ),
          code({
            inline,
            className,
            children,
            ...props
          }: any) {
            const match = /language-(\w+)/.exec(className || "");
            
            return !inline && match ? (
              <CodeBlock 
                language={match[1]} 
                value={String(children).replace(/\n$/, "")} 
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </Suspense>
  );
};

export default MarkdownPreview;
