"use client";

import { useRoom, useSelf } from "@liveblocks/react/suspense";
import { useEffect, useState } from "react";
import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { BlockNoteView } from "@blocknote/shadcn";
import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";
import stringToColor from "@/lib/stringToColor";
import TranslateDocument from "./TranslateDocument";
import ChatToDocument from "./ChatToDocument";

type EditorProps = {
  doc: Y.Doc;
  provider: any;
  darkMode: boolean;
};

function BlockNote({ doc, provider, darkMode }: EditorProps) {
  const userInfo = useSelf((me) => me.info);
  // testing provider by logging
  // provider.on("status", (event) => {
  //   console.log("Provider event:", event);
  // });

  const editor: BlockNoteEditor = useCreateBlockNote({
    collaboration: {
      provider,
      fragment: doc.getXmlFragment("document-store"),
      user: {
        name: userInfo?.name || "Anonymous",
        color: stringToColor(userInfo?.name || "unknown@example.com"),
      },
    },
  });

  return (
    <div className="relative max-w-6xl mx-auto">
      <BlockNoteView
        className="min-h-screen"
        editor={editor}
        theme={darkMode ? "dark" : "light"}
      />
    </div>
  );
}

function Editor() {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<LiveblocksYjsProvider>();
  const [darkMode, setDarkMode] = useState(false);

  //testing fragment
  // useEffect(() => {
  //   const fragment = doc.getXmlFragment("document-store");
  //   console.log("Fragment content:", fragment.toString());
  // }, [doc]);

  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksYjsProvider(room, yDoc);

    setDoc(yDoc);
    setProvider(yProvider);

    //cleanup function is given in the return block for when we leave the room

    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    };
  }, [room]);

  if (!doc || !provider) {
    return null;
  }

  const style = `hover:text-white ${
    darkMode
      ? "text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700"
      : "text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-700"
  }`;
  // console.log(darkMode);
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-2 justify-end mb-10">
        {/* Translate Document AI */}
        <TranslateDocument doc={doc} />
        {/* chat to document AI */}
        <ChatToDocument doc={doc} />
        {/* Dark mode */}
        <Button className={style} onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </Button>
      </div>
      {/* Block Note */}
      <BlockNote doc={doc} provider={provider} darkMode={darkMode} />
    </div>
  );
}
// ---------------------------------------Code provided by chat gpt below
// function Editor() {
//   const room = useRoom();
//   const [doc, setDoc] = useState<Y.Doc>();
//   const [provider, setProvider] = useState<LiveblocksYjsProvider>();
//   const [darkMode, setDarkMode] = useState(false);

//   // Log the fragment contents unconditionally
//   useEffect(() => {
//     if (doc) {
//       const fragment = doc.getXmlFragment("document-store");

//       // Log initial content
//       console.log("Initial Fragment content:", fragment.toString());

//       // Listen for changes in the fragment
//       const observer = () => {
//         console.log("Updated Fragment content:", fragment.toString());
//       };

//       fragment.observe(observer);

//       // Cleanup on unmount
//       return () => {
//         fragment.unobserve(observer);
//       };
//     }
//   }, [doc]);

//   useEffect(() => {
//     const yDoc = new Y.Doc();
//     const yProvider = new LiveblocksYjsProvider(room, yDoc);

//     setDoc(yDoc);
//     setProvider(yProvider);

//     // Cleanup function
//     return () => {
//       yDoc?.destroy();
//       yProvider?.destroy();
//     };
//   }, [room]);

//   if (!doc || !provider) {
//     return null;
//   }

//   const style = `hover:text-white ${
//     darkMode
//       ? "text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700"
//       : "text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-700"
//   }`;

//   return (
//     <div className="max-w-6xl mx-auto">
//       <div className="flex items-center gap-2 justify-end mb-10">
//         <Button className={style} onClick={() => setDarkMode(!darkMode)}>
//           {darkMode ? <SunIcon /> : <MoonIcon />}
//         </Button>
//       </div>
//       <BlockNote doc={doc} provider={provider} darkMode={darkMode} />
//     </div>
//   );
// }

export default Editor;
