import Header from "@/src/components/header";
import Footer from "@/src/components/footer";
import PrivacyPage from "@/src/components/privacy/page";

export default function Privacy() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Header />
      <PrivacyPage />
      <Footer />
        
    </main>
  );
}
