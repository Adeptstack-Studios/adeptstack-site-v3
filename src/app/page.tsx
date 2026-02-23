import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import NewsSection from "@/components/NewsSection";
import AppGrid from "@/components/AppGrid";
import {getBlogPosts} from "@/libs/getNews";
import {getApps} from "@/libs/getApps";

export default async function Home() {
  const newsData = getBlogPosts();
  const appsData = getApps();

  const [news, apps] = await Promise.all([newsData, appsData]);
  const safeNews = Array.isArray(news) ? news : [];
  const safeApps = Array.isArray(apps) ? apps : [];
  const latestNews = safeNews.slice(0, 3);
  const hApps = safeApps.filter(app => app.highlighted === true);


  return (
      <div className="min-h-screen bg-slate-950 font-sans overflow-x-hidden">
        <Header />
        <Hero />
        <NewsSection posts={latestNews} />
        <AppGrid apps={hApps} />
        <Footer />
      </div>
  );
}