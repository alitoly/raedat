// Simple stroked line icons for the goal cards. White stroke, drawn on the mesh bg.
const base = {
  width: 40, height: 40, viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
};

export const icons: Record<string, React.ReactNode> = {
  star: (
    <svg {...base}><path d="M12 3.5l2.5 5.2 5.7.8-4.1 4 1 5.7L12 16.6 6.9 19.2l1-5.7-4.1-4 5.7-.8z" /></svg>
  ),
  doc: (
    <svg {...base}><path d="M7 3h7l4 4v14H7z" /><path d="M14 3v4h4" /><path d="M9.5 12.5h5M9.5 16h5" /></svg>
  ),
  briefcase: (
    <svg {...base}><rect x="3" y="8" width="18" height="12" rx="2.5" /><path d="M9 8V6.5A2.5 2.5 0 0 1 11.5 4h1A2.5 2.5 0 0 1 15 6.5V8" /><path d="M3 13h18" /></svg>
  ),
  people: (
    <svg {...base}><circle cx="9" cy="8" r="2.4" /><circle cx="16.5" cy="9" r="2" /><path d="M4 19a5 5 0 0 1 10 0M14.5 19a4.5 4.5 0 0 1 6.5-2" /></svg>
  ),
  spark: (
    <svg {...base}><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" /><circle cx="12" cy="12" r="3" /></svg>
  ),
  women: (
    <svg {...base}><circle cx="9" cy="7" r="3" /><circle cx="17" cy="8" r="2.4" /><path d="M3.5 20a5.5 5.5 0 0 1 11 0M15 20a4.5 4.5 0 0 1 6 0" /></svg>
  ),
  vision: (
    <svg {...base}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1" /></svg>
  ),
  compass: (
    <svg {...base}><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5l-2 5-5 2 2-5z" /></svg>
  ),
  skills: (
    <svg {...base}><path d="M12 4 2 9l10 5 10-5z" /><path d="M6 11v5c0 1 3 2.5 6 2.5s6-1.5 6-2.5v-5" /></svg>
  ),
  fund: (
    <svg {...base}><ellipse cx="12" cy="6.5" rx="7" ry="3" /><path d="M5 6.5v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5M5 11.5v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5" /></svg>
  ),
  network: (
    <svg {...base}><circle cx="12" cy="5" r="2.2" /><circle cx="5" cy="18" r="2.2" /><circle cx="19" cy="18" r="2.2" /><path d="M12 7.2 6.4 16M12 7.2 17.6 16M7 18h10" /></svg>
  ),
  growth: (
    <svg {...base}><path d="M4 19h16M6 19v-6M11 19V8M16 19v-9" /><path d="M14 5l3-1 1 3" /><path d="M5 13c4 0 5-9 12-9" /></svg>
  ),
};
