import { nanoid } from "nanoid";
import Link from "next/link";

// import { CreatePost } from "~/app/_components/create-post";
import { serverTrpc } from "~/trpc/server";
import DisplatAllRecipies from "./_components/display-all-recipies";
import InputRecipeData from "./_components/input-recipe-data";

export default async function Home() {
  const recipies = await serverTrpc.recipe.getAllRecipies()
  const hello =  await serverTrpc.recipe.hello({ text: "from aisha" });
  const uniqueId = nanoid()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <DisplatAllRecipies uniqueId={uniqueId}></DisplatAllRecipies>
      <InputRecipeData></InputRecipeData>
      {hello.greeting}
    </main>
  );
}

// async function CrudShowcase() {
//   const latestPost = await api.post.getLatest();

//   return (
//     <div className="w-full max-w-xs">
//       {latestPost ? (
//         <p className="truncate">Your most recent post: {latestPost.name}</p>
//       ) : (
//         <p>You have no posts yet.</p>
//       )}

//       <CreatePost />
//     </div>
//   );
// }
