// import ReactMarkdown from "react-markdown";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import {coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// const customTheme = {
//   ...coldarkDark,
//   'pre[class*="language-"]': {
//     ...coldarkDark['pre[class*="language-"]'],
//     background: "#0a0a0a", // your custom bg
//     borderRadius: "12px",
//     padding: "1.25rem",
//   },
// };

// export function MarkdownViewer({ markdown }: { markdown: string }) {
//   return (
//     <ReactMarkdown
//       components={{
//         h1: ({ ...props }) => (
//           <h1 className="text-3xl font-bold mb-6  text-accent-foreground" {...props} />
//         ),
//         h2: ({ ...props }) => (
//           <h2 className="text-2xl font-bold mt-8 mb-4 text-accent-foreground" {...props} />
//         ),
//         h3: ({ ...props }) => (
//           <h3 className="text-xl font-bold mt-6 mb-3 text-accent-foreground" {...props} />
//         ),
//         p: ({ ...props }) => (
//           <p className="text-muted-foreground mb-4 leading-relaxed" {...props} />
//         ),
//         a: ({ ...props }) => (
//           <a
//             className="text-primary hover:text-primary/80 underline"
//             {...props}
//           />
//         ),
//         code: ({ inline, className, children, ...props }: any) => {
//           const match = /language-(\w+)/.exec(className || "");

//           if (!inline && match) {
//             return (
//               <SyntaxHighlighter
//                 style={customTheme}
//                 language={match[1]}
//                 PreTag="div"
//                 className="my-4 bg-red-400 rounded-lg border "
//                 {...props}
//               >
//                 {String(children).replace(/\n$/, "")}
//               </SyntaxHighlighter>
//             );
//           }

//           return (
//             <code
//               className="text-primary bg-primary/10 px-1.5 py-0.5 rounded text-sm font-mono"
//               {...props}
//             >
//               {children}
//             </code>
//           );
//         },
//         li: ({ ...props }) => (
//           <li className="text-muted-foreground ml-6 list-disc" {...props} />
//         ),
//         ul: ({ ...props }) => (
//           <ul className="space-y-2 mb-4" {...props} />
//         ),
//         ol: ({ ...props }) => (
//           <ol className="space-y-2 mb-4 list-decimal ml-6" {...props} />
//         ),
//         blockquote: ({ ...props }) => (
//           <blockquote className="border-l-4 border-primary/30 pl-4 py-2 my-4 italic text-muted-foreground" {...props} />
//         ),
//       }}
//     >
//       {markdown}
//     </ReactMarkdown>
//   );
// }


// components/portable-text.tsx
// Uses @portabletext/react - the official Sanity portable text renderer.
// Define components outside the render function to avoid recreating
// on every render (as per the docs recommendation for performance).

import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Image from "next/image";
import { urlFor } from "@workspace/sanity-client";

const codeTheme = {
  ...coldarkDark,
  'pre[class*="language-"]': {
    ...coldarkDark['pre[class*="language-"]'],
    background: "#0a0a0a",
    borderRadius: "12px",
    padding: "1.25rem",
  },
};

const components: PortableTextComponents = {
  // ==================== BLOCK STYLES ====================
  // Maps to the `style` field on each block
  block: {
    normal: ({ children }) => (
      <p className="text-muted-foreground mb-4 leading-relaxed">{children}</p>
    ),
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mb-6 mt-10 tracking-tighter text-foreground">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mb-4 mt-8 tracking-tighter text-foreground">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold mb-3 mt-6 tracking-tighter text-foreground">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold mb-2 mt-4 tracking-tighter text-foreground">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary/40 pl-4 py-1 my-6 italic text-muted-foreground bg-white/5 rounded-r-md">
        {children}
      </blockquote>
    ),
  },

  // ==================== LISTS ====================
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 ml-6 space-y-1.5 list-disc marker:text-primary/60">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 ml-6 space-y-1.5 list-decimal marker:text-primary/60">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => (
      <li className="text-muted-foreground leading-relaxed">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-muted-foreground leading-relaxed">{children}</li>
    ),
  },

  // ==================== MARKS ====================
  // Decorators (no data) and annotations (with data)
  marks: {
    // Decorators
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-muted-foreground">{children}</em>
    ),
    underline: ({ children }) => (
      <span className="underline underline-offset-2">{children}</span>
    ),
    "strike-through": ({ children }) => (
      <span className="line-through text-muted-foreground/60">{children}</span>
    ),
    // Inline code (single backtick in Sanity)
    code: ({ children }) => (
      <code className="text-primary bg-primary/10 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),

    // Annotations (with data)
    link: ({ value, children }) => {
      const isExternal = (value?.href || "").startsWith("http");
      return (
        <a
          href={value?.href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
        >
          {children}
        </a>
      );
    },
  },

  // ==================== CUSTOM TYPES ====================
  // Matches _type on custom block objects in your Sanity schema
  types: {
    // Code block from @sanity/code-input plugin
    // Schema field: { name: 'content', type: 'code' }
    code: ({ value }) => (
      <div className="my-6">
        {value?.filename && (
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 border-b-0 rounded-t-xl text-xs text-muted-foreground font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            <span className="ml-2">{value.filename}</span>
          </div>
        )}
        <SyntaxHighlighter
          style={codeTheme}
          language={value?.language || "typescript"}
          PreTag="div"
          className={`border border-white/10 ${value?.filename ? "rounded-b-xl !rounded-t-none" : "rounded-xl"}`}
        >
          {value?.code || ""}
        </SyntaxHighlighter>
      </div>
    ),

    // Image block from Sanity's built-in image type
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-8">
          <div className="overflow-hidden rounded-xl border border-white/10">
            <Image
              src={urlFor(value).width(800).fit("max").auto("format").url()}
              alt={value.alt || ""}
              width={800}
              height={450}
              className="w-full h-auto object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-muted-foreground mt-3 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },

    // Callout / info box custom type
    // Schema: { name: 'callout', fields: [{ name: 'tone', type: 'string' }, { name: 'text', type: 'text' }] }
    callout: ({ value }) => {
      const toneStyles: Record<string, string> = {
        info: "border-blue-500/30 bg-blue-500/10 text-blue-300",
        warning: "border-yellow-500/30 bg-yellow-500/10 text-yellow-300",
        error: "border-red-500/30 bg-red-500/10 text-red-300",
        success: "border-green-500/30 bg-green-500/10 text-green-300",
      };
      const style = toneStyles[value?.tone || "info"];
      return (
        <div className={`my-6 rounded-xl border px-5 py-4 text-sm leading-relaxed ${style}`}>
          {value?.text}
        </div>
      );
    },
  },
};

type Props = {
  // Typed loosely - in production import PortableTextBlock from @portabletext/types
  content: any[];
  className?: string;
};

export function PortableTextRenderer({ content, className }: Props) {
  if (!content?.length) return null;

  return (
    <div className={className}>
      <PortableText
        value={content}
        components={components}
        // Silence warnings for any types not covered above during development
        onMissingComponent={(message, options) => {
          console.warn("[PortableText] Missing component:", message, options);
        }}
      />
    </div>
  );
}
