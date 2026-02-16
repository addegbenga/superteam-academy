import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const customTheme = {
  ...coldarkDark,
  'pre[class*="language-"]': {
    ...coldarkDark['pre[class*="language-"]'],
    background: "#0a0a0a", // your custom bg
    borderRadius: "12px",
    padding: "1.25rem",
  },
};

export function MarkdownViewer({ markdown }: { markdown: string }) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ ...props }) => (
          <h1 className="text-3xl font-bold mb-6  text-accent-foreground" {...props} />
        ),
        h2: ({ ...props }) => (
          <h2 className="text-2xl font-bold mt-8 mb-4 text-accent-foreground" {...props} />
        ),
        h3: ({ ...props }) => (
          <h3 className="text-xl font-bold mt-6 mb-3 text-accent-foreground" {...props} />
        ),
        p: ({ ...props }) => (
          <p className="text-muted-foreground mb-4 leading-relaxed" {...props} />
        ),
        a: ({ ...props }) => (
          <a
            className="text-primary hover:text-primary/80 underline"
            {...props}
          />
        ),
        code: ({ inline, className, children, ...props }: any) => {
          const match = /language-(\w+)/.exec(className || "");

          if (!inline && match) {
            return (
              <SyntaxHighlighter
                style={customTheme}
                language={match[1]}
                PreTag="div"
                className="my-4 bg-red-400 rounded-lg border "
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            );
          }

          return (
            <code
              className="text-primary bg-primary/10 px-1.5 py-0.5 rounded text-sm font-mono"
              {...props}
            >
              {children}
            </code>
          );
        },
        li: ({ ...props }) => (
          <li className="text-muted-foreground ml-6 list-disc" {...props} />
        ),
        ul: ({ ...props }) => (
          <ul className="space-y-2 mb-4" {...props} />
        ),
        ol: ({ ...props }) => (
          <ol className="space-y-2 mb-4 list-decimal ml-6" {...props} />
        ),
        blockquote: ({ ...props }) => (
          <blockquote className="border-l-4 border-primary/30 pl-4 py-2 my-4 italic text-muted-foreground" {...props} />
        ),
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
}

