import { db } from "@/db";
import Link from "next/link";

export default async function Home() {
  const snippets = await db.snippet.findMany();
  // console.log("Snippets", snippets);

  const renderedSnippets = snippets.map((snippet) => {
    return (
      <Link
        key={snippet.id}
        className="flex justify-between items-center p-2 border rounded"
        href={`/snippets/${snippet.id}`}
      >
        <h3>{snippet.title}</h3>
        <div>View</div>
      </Link>
    );
  });

  return (
    <main className="flex flex-col gap-4 p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">My Snippets</h1>
        <Link
          href="/snippets/new"
          className="border font-semibold p-2 rounded hover:bg-green-500 hover:text-white"
        >
          New
        </Link>
      </div>
      <hr className="h-1 w-4/5 mx-auto  bg-gradient-to-r from-yellow-300/80 to-pink-400/80 rounded" />
      <div className="flex flex-col gap-1.5">{renderedSnippets}</div>
    </main>
  );
}

/*
 <main className="flex min-h-screen flex-col items-center gap-4 p-24">
*/
