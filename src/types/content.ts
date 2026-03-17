export interface HeroContent {
    title: string;
    subtitle: string;
    body: string;
}

export interface HistoryEvent {
    year: string;
    description: string;
}

export interface TimelineItem {
    period: string;
    title: string;
    description: string;
}

export interface StatItem {
    label: string;
    value: string;
    suffix?: string;
}

export interface Rector {
    name: string;
    period: string;
    note?: string;
    photo?: string;
    bio?: string;
}

export interface AlumnusItem {
    name: string;
    graduation: string;
    achievement: string;
    photo?: string;
    bioExtended?: string;
    tags?: string[];
    wikiUrl?: string;
}

export interface ScientistItem {
    names: string;
    description: string;
}

export interface InstituteItem {
    name: string;
    description: string;
    image?: string;
    vkUrl?: string;
}

export interface TodayHighlight {
    icon: string;
    title: string;
    description: string;
    stat?: string;
    statLabel?: string;
}

export interface LandingContent {
    hero: HeroContent;
    historyContext: string;
    historyEvents: HistoryEvent[];
    timeline: TimelineItem[];
    stats: StatItem[];
    rectors: Rector[];
    alumni: AlumnusItem[];
    scientists: ScientistItem[];
    institutes: InstituteItem[];
    todayHighlights: TodayHighlight[];
    ctaTitle: string;
    ctaSubtitle: string;
    ctaLinks: { label: string; href: string }[];
}
