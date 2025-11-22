"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import Link from "next/link";
import { ScrollAnimation } from "@/src/components/scroll-animation";

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("buying");

  const categories = [
    { id: "buying", label: "Buying", icon: "🛒" },
    { id: "selling", label: "Selling", icon: "📤" },
    { id: "payment", label: "Payments", icon: "💳" },
    { id: "security", label: "Security", icon: "🔒" },
    { id: "bots", label: "Bot Services", icon: "🤖" },
  ];

  const faqs = {
    buying: [
      {
        question: "How do I purchase an account?",
        answer:
          'Browse our accounts section, click on any account you like, review the details, and click "Buy Now". You\'ll be connected with the seller via our real-time chat system for payment and account transfer.',
      },
      {
        question: "Are the accounts verified?",
        answer:
          "Yes, all accounts listed on Lords Hub are verified by our team. We check account authenticity, stats accuracy, and ensure no accounts are banned or suspended.",
      },
      {
        question: "What if the account details don't match the listing?",
        answer:
          "We stand behind every listing. If the account doesn't match the description, you can report it immediately and we'll issue a full refund within 24 hours.",
      },
      {
        question: "How long does the account transfer take?",
        answer:
          "Once payment is confirmed, account transfer typically takes 1-4 hours. Our sellers prioritize faster transfers, and you'll be updated in real-time via chat.",
      },
      {
        question: "Can I request a specific account?",
        answer:
          "Yes! Contact us via chat with your requirements (might level, troops, gems, etc.). Our team will help you find the perfect account or arrange a custom order.",
      },
    ],
    selling: [
      {
        question: "How do I sell my account?",
        answer:
          "Contact us through chat with account details and screenshots. We'll review and list it. You set the price, and we handle marketing to connect you with buyers.",
      },
      {
        question: "What commission does Lords Hub take?",
        answer:
          "We take a 10% commission on successful sales. This covers platform maintenance, security, payment processing, and support services.",
      },
      {
        question: "Is my account information safe?",
        answer:
          "Absolutely. We use encryption and secure servers. Your account credentials are never shared with anyone without explicit permission.",
      },
      {
        question: "How do I receive payment?",
        answer:
          "Payments are made via bank transfer, PayPal, or cryptocurrency. You receive payment within 24-48 hours after successful delivery confirmation.",
      },
      {
        question: "Can I delete my listing?",
        answer:
          "Yes, you can delete your listing anytime through your dashboard. If an active chat exists, inform the buyer before removing.",
      },
    ],
    payment: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept bank transfers, PayPal, Stripe, cryptocurrency (Bitcoin, Ethereum), and regional payment methods depending on your location.",
      },
      {
        question: "Is my payment information secure?",
        answer:
          "Yes, we use SSL encryption and PCI compliance. Your payment data is never stored or shared. We partner with trusted payment processors.",
      },
      {
        question: "What's your refund policy?",
        answer:
          "If the account details don't match the listing, you receive a full refund within 24 hours. Account must be unopened and unmodified.",
      },
      {
        question: "Can I get an invoice?",
        answer:
          "Yes, invoices are automatically sent to your email after successful payment. You can also download invoices from your account dashboard.",
      },
      {
        question: "Are there any hidden fees?",
        answer:
          "No hidden fees. The price shown is the final price you pay. Payment processor fees (if any) are clearly disclosed before confirmation.",
      },
    ],
    security: [
      {
        question: "How do you protect my account?",
        answer:
          "We use military-grade encryption, two-factor authentication, secure API connections, and regular security audits to protect all accounts.",
      },
      {
        question: "What if my account gets hacked after purchase?",
        answer:
          "Change your password immediately and contact us. For accounts purchased within 7 days, we provide support in account recovery.",
      },
      {
        question: "Do you share my personal information?",
        answer:
          "No, we never share your information without consent. Your data is used only for transactions, support, and legal compliance.",
      },
      {
        question: "Is it safe to use bot services?",
        answer:
          "Our bot services are designed to work safely within game guidelines. However, use at your own discretion. We recommend reading the game's ToS.",
      },
      {
        question: "How do you prevent fraud?",
        answer:
          "We verify seller identity, check account authenticity, monitor suspicious activities, and maintain a dispute resolution system for peace of mind.",
      },
    ],
    bots: [
      {
        question: "What are your bot services?",
        answer:
          "We offer Bank Bots ($3/month), War Bots ($8-15), and Rein Bots ($10/month). Each service includes 24/7 monitoring and support.",
      },
      {
        question: "How long does bot setup take?",
        answer:
          "Bot activation takes 12-24 hours after you provide account credentials. You'll receive a confirmation once the bot is running.",
      },
      {
        question: "Will using bots get me banned?",
        answer:
          "Our bots are designed to mimic human gameplay. However, bot usage carries inherent risk. We strongly recommend reading the game's ToS and using at your own discretion.",
      },
      {
        question: "Can I turn off the bot anytime?",
        answer:
          "Yes, you have full control. Bots can be paused or stopped instantly from your dashboard. Remaining subscription days are credited.",
      },
      {
        question: "What if the bot has issues?",
        answer:
          "Our support team provides 24/7 assistance. Report issues immediately via chat and we'll troubleshoot or provide a refund.",
      },
    ],
  };

  const filteredFaqs = faqs[activeCategory as keyof typeof faqs].filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <ScrollAnimation />
      
      <section className="border-b-4 border-amber-500/30 px-4 py-16 sm:px-6 lg:px-8 section-gradient fade-up">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-3 text-4xl font-black gradient-text">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-slate-200">
            Find answers to common questions about Lords Hub
          </p>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8 fade-up">
        <div className="mx-auto max-w-6xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-400" />
            <Input
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-2 border-amber-500/50 focus:border-amber-400 bg-slate-700/50 text-white placeholder:text-slate-400 h-12 text-base"
            />
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8 border-b-4 border-amber-500/30 fade-up">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSearchTerm("");
                }}
                className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-2 duration-300 transform cursor-pointer ${
                  activeCategory === cat.id
                    ? "btn-game text-slate-900 shadow-lg scale-105"
                    : "bg-slate-700/50 hover:bg-slate-700/70 text-slate-200 border-2 border-amber-500/30 hover:border-amber-400 hover:scale-105"
                }`}
              >
                <span className="text-lg">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8 fade-up">
        <div className="mx-auto max-w-3xl">
          {filteredFaqs.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {filteredFaqs.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`item-${idx}`}
                  className="border-amber-500/30"
                >
                  <AccordionTrigger className="hover:text-amber-400 transition-colors duration-300 text-left py-4 font-bold text-base text-slate-200 cursor-pointer">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-300 text-base pb-4 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <Card className="border-2 border-amber-500/30 text-center py-16 bg-gradient-to-br from-slate-800/90 to-slate-700/90 shadow-2xl backdrop-blur-sm">
              <CardContent>
                <p className="text-slate-300 mb-6 text-lg">
                  No FAQs found for your search.
                </p>
                <Button
                  variant="outline"
                  className="border-2 border-amber-500/50 hover:border-amber-400 hover:bg-amber-500/20 text-white transition-all duration-300 font-semibold cursor-pointer"
                  onClick={() => setSearchTerm("")}
                >
                  Clear Search
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <section className="border-t-4 border-blue-500/30 px-4 py-16 sm:px-6 lg:px-8 section-gradient fade-up">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-black gradient-text">
            Didn't find your answer?
          </h2>
          <p className="mb-8 text-slate-200 text-lg leading-relaxed">
            Our support team is available 24/7 to help you with any questions.
          </p>
          <Link href="/chat">
            <Button size="lg" className="btn-game font-semibold text-lg cursor-pointer">
              Contact Support
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
