import HomePage from "@/src/components/home/page";
import Header from "@/src/components/header";
import Footer from "@/src/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-white relative overflow-x-hidden">
      <Header />
      <HomePage />
      <Footer />
    </main>
  );
}
