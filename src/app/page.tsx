import { getLandingContent } from "@/lib/content";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { HistorySection } from "@/components/sections/history-section";
import { TimelineSection } from "@/components/sections/timeline-section";
import { StatsSection } from "@/components/sections/stats-section";
import { PeopleSection } from "@/components/sections/people-section";
import { StructureSection } from "@/components/sections/structure-section";
import { CtaSection } from "@/components/sections/cta-section";

export default function Home() {
  const content = getLandingContent();

  return (
    <>
      <Header />
      <main id="main-content">
        <HeroSection content={content.hero} />
        <HistorySection context={content.historyContext} events={content.historyEvents} />
        <TimelineSection items={content.timeline} />
        <StatsSection stats={content.stats} />
        <PeopleSection
          rectors={content.rectors}
          alumni={content.alumni}
          scientists={content.scientists}
        />
        <StructureSection institutes={content.institutes} />
        <CtaSection
          title={content.ctaTitle}
          subtitle={content.ctaSubtitle}
          links={content.ctaLinks}
        />
      </main>
      <Footer />
    </>
  );
}
