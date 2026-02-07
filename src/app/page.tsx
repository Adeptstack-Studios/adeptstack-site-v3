export const dynamic = 'force-dynamic';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import NewsSection from "@/components/NewsSection";
import AppGrid from "@/components/AppGrid";
import { getBlogPosts, getApps } from "@/libs/api";

export default async function Home() {
  const newsData = getBlogPosts();
  const appsData = getApps();

  const [news, apps] = await Promise.all([newsData, appsData]);
  const latestNews = news.slice(0, 3);

  return (
      <div className="min-h-screen bg-slate-950 font-sans overflow-x-hidden">
        <Header />
        <Hero />
        <NewsSection posts={latestNews} />
        <AppGrid apps={apps} />
        <Footer />
      </div>
  );
}