import AboutPage from "@/src/components/about/page";
import Header from "@/src/components/header";
import Footer from "@/src/components/footer";

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Header />
      <AboutPage />
      <Footer />
    </main>
  );
}
