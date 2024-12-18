import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  auth.protect();

  const { sessionClaims } = await auth();
  const { room } = await req.json();

  // const session = liveblocks.prepareSession(sessionClaims?.email, {
  //   userInfo: {
  //     name: sessionClaims?.first_name,
  //     email: sessionClaims?.email,
  //     avatar: sessionClaims?.avatar,
  //   },
  // });
  const session = liveblocks.prepareSession(sessionClaims?.email ?? "unknown", {
    userInfo: {
      name:
        `${sessionClaims?.firstName ?? ""} ${
          sessionClaims?.lastName ?? ""
        }`.trim() || "Anonymous",
      email: sessionClaims?.email || "No Email",
      avatar: sessionClaims?.avatar || "/default-avatar.png",
    },
  });

  console.log({
    name: sessionClaims?.firstName,
    email: sessionClaims?.email,
    avatar: sessionClaims?.avatar,
  });
  //   const session = liveblocks.prepareSession(
  //     sessionClaims?.email ?? "unknown@example.com",
  //     {
  //       userInfo: {
  //         name: sessionClaims?.fullname ?? "Anonymous",
  //         email: sessionClaims?.email ?? "unknown@example.com",
  //         avatar: sessionClaims?.avatar ?? "",
  //       },
  //     }
  //   );

  const usersInRoom = await adminDb
    .collectionGroup("rooms")
    .where("userId", "==", sessionClaims?.email)
    .get();

  const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);

  if (userInRoom?.exists) {
    session.allow(room, session.FULL_ACCESS);
    const { body, status } = await session.authorize();
    console.log("You are authorised");

    return new Response(body, { status }); // see chatgpt response on why we used curly braces with status
  } else {
    return NextResponse.json(
      { message: "You are not allowed in this room" },
      { status: 403 }
    );
  }
}
