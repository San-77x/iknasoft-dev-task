import { DemoTable } from "@/components/table/demo-table";
import { ExampleUsage } from "@/components/table/example-usage";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="space-y-12">
        <DemoTable />
        <div className="border-t border-gray-200 pt-12">
          <ExampleUsage />
        </div>
      </div>
    </main>
  );
}
