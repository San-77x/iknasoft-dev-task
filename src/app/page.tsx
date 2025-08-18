export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-5 max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Simple Table Component
        </h1>
        <div className="overflow-x-auto">{/* Table */}</div>
      </div>
    </div>
  );
}
