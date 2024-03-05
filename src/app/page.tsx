import { db } from "@/db";

export default async function Home() {
  const snippets = await db.snippet.findMany();
  console.log("Snippets", snippets);

  const renderedSnippets = snippets.map((snippet) => {
    return (
      <div key={snippet.id}>
        <h3>{snippet.title}</h3>
      </div>
    );
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Home Page</h1>
      <div>{renderedSnippets}</div>
    </main>
  );
}
