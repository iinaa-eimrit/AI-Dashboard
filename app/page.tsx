import { DashboardHeader } from "@/components/dashboard/header";
import { WidgetGrid } from "@/components/dashboard/widget-grid";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 space-y-4 p-4 md:p-6">
        <WidgetGrid />
      </main>
    </div>
  );
}