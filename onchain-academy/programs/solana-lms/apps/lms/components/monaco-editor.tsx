"use client";

import { useRef} from "react";
import Editor, { type OnMount } from "@monaco-editor/react";
import { editorTheme } from "@/lib/ide-editor-theme";

interface MonacoEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  errors?: any;
  readOnly?: boolean;
}

export function MonacoEditor({
  value,
  onChange,
  language = "rust",
  errors = [],
  readOnly = false,
}: MonacoEditorProps) {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // Register Rust language with improved definition
    // monaco.languages.register(cairoLanguageDefinition);
    // monaco.languages.setMonarchTokensProvider("cairo", cairoTokensProvider);

    // Define and set the Cairo theme
    monaco.editor.defineTheme("vs-dark", editorTheme);
    monaco.editor.setTheme("vs-dark");

    // Configure editor options
    editor.updateOptions({
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      fontSize: 14,
      lineNumbers: "on",
      renderWhitespace: "selection",
      automaticLayout: true,
      readOnly,
    });
  };

  const handleEditorChange = (value: string | undefined) => {
    onChange(value || "");
  };

  return (
    <div className="h-full w-full">
      <Editor
        height="100%"
        language={language}
        value={value}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          lineNumbers: "on",
          renderWhitespace: "selection",
          automaticLayout: true,
          readOnly,
          wordWrap: "on",
          folding: true,
          lineNumbersMinChars: 3,
          scrollbar: {
            vertical: "visible",
            horizontal: "visible",
            useShadows: false,
            verticalHasArrows: false,
            horizontalHasArrows: false,
          },
        }}
        loading={
          <div className="flex items-center justify-center h-full">
            <div className="text-muted-foreground">Loading editor...</div>
          </div>
        }
      />
    </div>
  );
}
