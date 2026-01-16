export default function Home() {
  return (
      <main className="flex min-h-screen flex-col items-center justify-center p-12 bg-gray-50 text-gray-900">
        <div className="text-center max-w-2xl">
          <h1 className="text-5xl font-bold mb-6 text-blue-600">
            Adeptstack
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Moderne Softwarelösungen. Seriös. Schnell.
          </p>

          <div className="flex gap-4 justify-center">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
              App herunterladen
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-100 transition">
              News lesen
            </button>
          </div>
        </div>
      </main>
  );
}