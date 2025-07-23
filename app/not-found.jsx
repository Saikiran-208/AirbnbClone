// app/not-found.jsx

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a
        href="/"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
      >
        Go Home
      </a>
    </div>
  );
}