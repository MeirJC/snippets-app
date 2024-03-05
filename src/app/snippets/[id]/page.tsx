import { db } from "@/db";
import { notFound } from "next/navigation";
import Link from "next/link";

interface SnippetShowPageProps {
  params: {
    id: string;
  };
}
export default async function SnippetShowPage(props: SnippetShowPageProps) {
  await new Promise((r) => setTimeout(r, 1500));
  const id = parseInt(props.params.id);
  const snippet = await db.snippet.findFirst({
    where: { id },
  });

  // console.log("id: ", id);
  // console.log("returned snippet: ", snippet);

  if (!snippet) {
    return notFound();
  }

  return (
    <div>
      <div className="dev-only text-center">
        <h1 className="text-4xl font-bold text-slate-300">Show Snippet Page</h1>{" "}
        <h2 className="text-lg font-bold text-slate-500">Snippet #{id}</h2>
      </div>

      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">Title: {snippet.title}</h1>
        <div>
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="p-2 border rounded"
          >
            Edit
          </Link>
          <button className="p-2 border rounded">Delete</button>
        </div>
      </div>

      <pre className="p-4 border rounded bg-gray-200 border-gray-300">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}
