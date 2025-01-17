// "use client";

// import { BlockNoteEditor } from "@blocknote/core";
// import { useCreateBlockNote } from "@blocknote/react";
// import { BlockNoteView } from "@blocknote/mantine";
// import * as Y from "yjs";
// import { LiveblocksYjsProvider } from "@liveblocks/yjs";
// import { useRoom, useSelf } from "@liveblocks/react/suspense";
// import { useEffect, useState } from "react";
// import stringToColor from "@/lib/stringToColor";

// // Collaborative text editor with simple rich text, live cursors, and live avatars
// export function CollaborativeEditor() {
//   const room = useRoom();
//   const [doc, setDoc] = useState<Y.Doc>();
//   const [provider, setProvider] = useState<any>();

//   // Set up Liveblocks Yjs provider
//   useEffect(() => {
//     const yDoc = new Y.Doc();
//     const yProvider = new LiveblocksYjsProvider(room, yDoc);
//     setDoc(yDoc);
//     setProvider(yProvider);

//     return () => {
//       yDoc?.destroy();
//       yProvider?.destroy();
//     };
//   }, [room]);

//   if (!doc || !provider) {
//     return null;
//   }

//   return <BlockNote doc={doc} provider={provider} />;
// }

// type EditorProps = {
//   doc: Y.Doc;
//   provider: any;
// };

// function BlockNote({ doc, provider }: EditorProps) {
//   // Get user info from Liveblocks authentication endpoint
//   const userInfo = useSelf((me) => me.info);

//   const editor: BlockNoteEditor = useCreateBlockNote({
//     collaboration: {
//       provider,

//       // Where to store BlockNote data in the Y.Doc:
//       fragment: doc.getXmlFragment("document-store"),

//       // Information for this user:
//       user: {
//         name: userInfo?.name || "Anonymous",
//         color: stringToColor(userInfo?.email || "unknown@example.com"),
//       },
//     },
//   });
//   return (
//     <div className="relative max-w-6xl mx-auto">
//       <BlockNoteView className="min-h-screen" editor={editor} />
//     </div>
//   );
// }
