import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col">
      <Navbar />
      <main className="w-full max-w-5xl mx-auto p-6">{children}</main>
    </div>
  );
}
