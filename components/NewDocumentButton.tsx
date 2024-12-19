// "use client";

// import { useTransition } from "react";
// import { Button } from "./ui/button";
// import { useRouter } from "next/navigation";
// import { createNewDocument } from "@/actions/actions";

// function NewDocumentButton() {
//   const [isPending, startTransition] = useTransition();
//   const router = useRouter();

//   const handleCreateNewDocument = () => {
//     startTransition(async () => {
//       const { docId } = await createNewDocument();
//       router.push(`/doc/${docId}`);
//     });
//   };

//   return (
//     <Button onClick={handleCreateNewDocument} disabled={isPending}>
//       {isPending ? "Creating..." : "New Document"}
//     </Button>
//   );
// }
// export default NewDocumentButton;

// -------------------------------------
//  CODE GIVEN BY CHATGPT BELOW, TO HANDLE USERS THAT ARE NOT SIGNED IN, doing this on client side so no need to change anything in actions.ts
"use client";

import { useTransition } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { createNewDocument } from "@/actions/actions";
import { toast } from "sonner";

function NewDocumentButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCreateNewDocument = () => {
    startTransition(async () => {
      try {
        const { docId } = await createNewDocument();
        router.push(`/doc/${docId}`);
      } catch (error) {
        if (error.message === "UNAUTHORIZED") {
          router.push("/sign-in");
          toast.error("You need to sign in to create a document.");
        } else {
          toast.error(
            "Failed to create a new document. Please Sign in and try again."
          );
        }
      }
    });
  };

  return (
    <Button onClick={handleCreateNewDocument} disabled={isPending}>
      {isPending ? "Creating..." : "New Document"}
    </Button>
  );
}

export default NewDocumentButton;
