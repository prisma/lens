import React, { useEffect } from "react"

import { EditorState } from "@codemirror/state"
import { EditorView, highlightSpecialChars, keymap } from "@codemirror/view"
import { defaultKeymap, defaultTabBinding } from "@codemirror/commands"
import { autocompletion, completionKeymap } from "@codemirror/autocomplete"
import { closeBrackets, closeBracketsKeymap } from "@codemirror/closebrackets"
import { commentKeymap } from "@codemirror/comment"
import { foldGutter, foldKeymap } from "@codemirror/fold"
import { gutter, lineNumbers } from "@codemirror/gutter"
import {
  classHighlightStyle,
  defaultHighlightStyle,
} from "@codemirror/highlight"
import { history, undo } from "@codemirror/history"
import { indentOnInput } from "@codemirror/language"
import { linter, lintKeymap } from "@codemirror/lint"
import { bracketMatching } from "@codemirror/matchbrackets"
import { javascript } from "@codemirror/lang-javascript"

export function QueryPlayground() {
  useEffect(() => {
    const doc = `// Demo code

if (true) {
  console.log("okay")
} else {
  console.log("oh no")
}`

    const view = new EditorView({
      parent: document.querySelector("#editor")!,
      state: EditorState.create({
        doc,

        extensions: [
          // Code
          autocompletion(),
          bracketMatching(),
          closeBrackets(),
          foldGutter(),
          gutter({}),
          indentOnInput(),
          lineNumbers(),

          // Syntax Highlighting
          classHighlightStyle,
          defaultHighlightStyle,
          highlightSpecialChars(),
          javascript({ typescript: true }),

          // Keymaps
          keymap.of([
            defaultTabBinding,
            ...defaultKeymap,
            ...closeBracketsKeymap,
            ...commentKeymap,
            ...completionKeymap,
            ...foldKeymap,
            ...lintKeymap,
            {
              key: "Ctrl-z",
              mac: "Mod-z",
              run: undo,
            },
          ]),

          history(),
        ],
      }),
    })

    return () => {
      view.destroy()
    }
  })

  return <div id="editor" style={{ width: 500, height: 500 }}></div>
}
