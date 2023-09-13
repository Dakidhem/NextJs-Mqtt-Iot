export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-around max-w-container mx-auto py-24 px-12">
      <h1 className="font-bold text-3xl text-gray-600">
        Welcome back to OhmCare !
      </h1>
      <a
        href="/dashboard"
        className="bg-primary text-white font-bold py-2 px-4 rounded"
      >
        Access Dashboard
      </a>
    </main>
  );
}
