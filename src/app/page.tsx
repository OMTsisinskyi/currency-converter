import Link from "next/link";
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">Currency Converter</h1>
      <p className="text-lg text-gray-700 mt-2">Select a function:</p>
      <div className="mt-4 flex gap-4">
        <Link
          href="/converter"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Converter
        </Link>

        <Link
          href="/rates"
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Exchange Rates
        </Link>

      </div>
    </main>
  );
}
