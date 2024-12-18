import RoomProvider from "@/components/RoomProvider";
import { auth } from "@clerk/nextjs/server";

async function DocLayout({
  children,
  params: paramsPromise,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  auth.protect();
  const { id } = await paramsPromise;
  return <RoomProvider roomId={id}>{children}</RoomProvider>;
}
export default DocLayout;

// import RoomProvider from "@/components/RoomProvider";
// import { auth } from "@clerk/nextjs/server";

// function DocLayout({
//   children,
//   params: { id },
// }: {
//   children: React.ReactNode;
//   params: { id: string };
// }) {
//   auth.protect();
//   return <RoomProvider roomId={id}>{children}</RoomProvider>;
// }
// export default DocLayout;
