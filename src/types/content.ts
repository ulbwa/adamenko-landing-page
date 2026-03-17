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
}

export interface AlumnusItem {
    name: string;
    graduation: string;
    achievement: string;
}

export interface ScientistItem {
    names: string;
    description: string;
}

export interface InstituteItem {
    name: string;
    description: string;
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
    ctaTitle: string;
    ctaSubtitle: string;
    ctaLinks: { label: string; href: string }[];
}
