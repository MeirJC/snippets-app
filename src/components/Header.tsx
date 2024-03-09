import Link from "next/link";

export default function Header() {
  return (
    <div className="w-full text-white bg-zinc-900">
      <nav className="container relative flex flex-wrap items-center justify-between mx-auto p-8 flex-col sm:flex-row">
        <Link
          href="/"
          className="font-bold tracking-tighter font-mono text-4xl bg-gradient-to-r from-yellow-300 to-pink-400 bg-clip-text text-transparent"
        >
          SnippetShare
        </Link>
        <div className="space-x-6 text-xl pt-4 sm:pt-0">
          <Link href="/">Snippets</Link>
          <Link href="/snippets/new">New Snippet</Link>
        </div>
      </nav>
    </div>
  );
}
