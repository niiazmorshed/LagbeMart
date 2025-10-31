import Sidebar from "@/app/components/dashboard/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[240px_1fr] bg-white text-black">
      {/* Hide global navbar inside dashboard */}
      <style>{`header{display:none !important}`}</style>
      <aside className="hidden md:block h-screen sticky top-0 bg-white text-black border-r border-black/10">
        <Sidebar />
      </aside>
      <div className="md:hidden sticky top-0 z-30 bg-white text-black border-b border-black/10">
        <Sidebar collapsible />
      </div>
      <main className="min-h-screen bg-white">{children}</main>
    </div>
  );
}


