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
  const safeNews = Array.isArray(news) ? news : [];
  const latestNews = safeNews.slice(0, 3);

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