import { TabBar } from "@/components/ui/tab-bar";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function TabsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-end px-5 pt-4">
        <ThemeToggle />
      </header>
      <main className="mx-auto w-full max-w-2xl flex-1">{children}</main>
      <TabBar />
    </div>
  );
}
