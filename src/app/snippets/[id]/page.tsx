import { db } from "@/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import * as actions from "@/actions";

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

  const deleteSnippetAction = actions.deleteSnippet.bind(null, id);

  if (!snippet) {
    return notFound();
  }

  return (
    <div>
      <div className="flex m-4 justify-between items-center flex-col sm:flex-row">
        <h1 className="text-xl font-bold">{snippet.title}</h1>
        <div className="flex gap-4">
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="p-2 border rounded font-semibold hover:bg-indigo-500 hover:text-white"
          >
            Edit
          </Link>
          <form action={deleteSnippetAction}>
            <button
              className="p-2 border rounded font-semibold hover:bg-red-500 hover:text-white"
              type="submit"
            >
              Delete
            </button>
          </form>
        </div>
      </div>

      <pre className="p-4 border rounded bg-gray-200 border-gray-300">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}

export async function generateStaticParams() {
  const snippets = await db.snippet.findMany();
  return snippets.map((snippet) => {
    return { id: snippet.id.toString() };
  });
}
