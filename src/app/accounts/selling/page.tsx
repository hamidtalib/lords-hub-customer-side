"use client";

import Header from "@/src/components/header";
import Footer from "@/src/components/footer";
import { ScrollAnimation } from "@/src/components/scroll-animation";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { MessageCircle, DollarSign, Shield, Zap } from "lucide-react";
import Link from "next/link";

export default function SellingAccountsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Header />
      <ScrollAnimation />

      {/* Hero Section */}
      <section
        className="px-4 py-24 text-center bg-cover bg-center border-b-4 border-amber-500/30 fade-up"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(8,10,25,0.92), rgba(8,10,25,0.96)), url('https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <DollarSign className="h-12 w-12 text-amber-400" />
          <h1 className="text-5xl font-black gradient-text">Sell Your Account</h1>
        </div>
        <p className="text-xl text-slate-200 font-semibold max-w-2xl mx-auto">
          Get the best price for your Lords Mobile account
        </p>
      </section>

      {/* Main Content */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 fade-up">
        <div className="mx-auto max-w-4xl">
          <Card className="border-2 border-amber-500/30 bg-gradient-to-br from-slate-800/90 to-slate-700/90 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-3xl font-black text-white text-center">
                Want to Sell Your Account?
              </CardTitle>
              <p className="text-slate-400 text-center mt-2">
                Chat with us to get a fair valuation and quick sale
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-800/50 rounded-lg p-6 text-center border border-slate-700">
                  <DollarSign className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                  <h3 className="font-bold text-white mb-2">Best Prices</h3>
                  <p className="text-sm text-slate-400">
                    Get competitive offers for your account
                  </p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-6 text-center border border-slate-700">
                  <Zap className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                  <h3 className="font-bold text-white mb-2">Fast Process</h3>
                  <p className="text-sm text-slate-400">
                    Quick evaluation and payment
                  </p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-6 text-center border border-slate-700">
                  <Shield className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                  <h3 className="font-bold text-white mb-2">Secure Transfer</h3>
                  <p className="text-sm text-slate-400">
                    Safe and protected transactions
                  </p>
                </div>
              </div>

              {/* What We Need */}
              <div className="bg-slate-800/50 rounded-xl p-6 border-2 border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4">
                  What We Need to Know:
                </h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>Account might and power level</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>Troop levels (T4, T5, etc.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>Heroes and gear collection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>Research progress</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>Kingdom type (restricted/open)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>Screenshots of account stats</span>
                  </li>
                </ul>
              </div>

              {/* CTA Button */}
              <div className="text-center">
                <Link href="/chat?inquiry=sell-account">
                  <Button className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-bold py-4 px-8 text-lg">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Chat with Us to Sell Your Account
                  </Button>
                </Link>
                <p className="text-sm text-slate-400 mt-4">
                  Our team will respond within 24 hours
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-12 sm:px-6 lg:px-8 fade-up">
        <div className="mx-auto max-w-4xl">
          <div className="bg-gradient-to-br from-blue-900/20 to-slate-800/90 rounded-xl p-8 border-2 border-blue-500/30">
            <h3 className="text-xl font-bold text-white mb-4 text-center">
              💡 How It Works
            </h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">1.</span>
                <span>Click the button above to start a chat with our team</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">2.</span>
                <span>Provide account details and screenshots</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">3.</span>
                <span>Receive a fair valuation within 24 hours</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">4.</span>
                <span>Agree on price and payment method</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">5.</span>
                <span>Complete secure transfer and receive payment</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
