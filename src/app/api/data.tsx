export const footerlabels: { label: string; herf: string }[] = [
  { label: "Terms", herf: "/documentation" },
  { label: "Disclosures", herf: "/documentation" },
  { label: "Latest News", herf: "/documentation" },
];

export const pricedeta: {
  title: string;
  short: string;
  icon: string;
  background: string;
  price: string;
  mark: string;
  width: number;
  height: number;
  padding: string;
}[] = [
  {
    title: "React",
    short: "",
    icon: "/images/icons/react.svg",
    background: "bg-primary",
    price: "$93,291.24",
    mark: "$94,040.99 (-0.9%)",
    width: 18,
    height: 23,
    padding: "px-4 py-3",
  },
  {
    title: "Python",
    short: "",
    icon: "/images/icons/python.svg",
    background: "bg-primary",
    price: "$3,128.84",
    mark: "$4,878.26 (-35.9%)",
    width: 18,
    height: 23,
    padding: "px-4 py-3",
  },
  {
    title: "Fastapi",
    short: "",
    icon: "/images/icons/fastapi.svg",
    background: "bg-primary",
    price: "$443.27",
    mark: "$3,785.82 (-88.3%)",
    width: 18,
    height: 23,
    padding: "px-4 py-3",
  },
  {
    title: "Django",
    short: "",
    icon: "/images/icons/django.svg",
    background: "bg-primary",
    price: "$86.11",
    mark: "$410.26 (-79.1%)",
    width: 18,
    height: 23,
    padding: "px-4 py-3",
  },
  {
    title: "Next JS",
    short: "",
    icon: "/images/icons/nextdotjs.svg",
    background: "bg-primary",
    price: "$238.70",
    mark: "$259.96 (-8.2%)",
    width: 18,
    height: 23,
    padding: "px-4 py-3",
  },
  {
    title: "JavaScript",
    short: "",
    icon: "/images/icons/javascript.svg",
    background: "bg-primary",
    price: "$0.394",
    mark: "$0.7316 (-46.2%)",
    width: 18,
    height: 23,
    padding: "px-4 py-3",
  },
];

export const jobCards: {
  title: string;
  description: string;
  icon: string;
  openRoles: string;
  tag: string;
  background: string;
  padding: string;
  width: number;
  height: number;
}[] = [
  {
    title: "Frontend / React",
    description: "React, TypeScript, Next.js roles",
    icon: "/images/icons/react.svg",
    openRoles: "2.4k+",
    tag: "Remote & hybrid",
    background: "bg-primary",
    padding: "px-4 py-3",
    width: 24,
    height: 24,
  },
  {
    title: "Backend / Python",
    description: "Django, FastAPI, APIs",
    icon: "/images/icons/python.svg",
    openRoles: "1.8k+",
    tag: "High demand",
    background: "bg-primary",
    padding: "px-4 py-3",
    width: 24,
    height: 24,
  },
  {
    title: "Full-stack",
    description: "Node, React, full product ownership",
    icon: "/images/icons/nextdotjs.svg",
    openRoles: "1.2k+",
    tag: "Top salaries",
    background: "bg-primary",
    padding: "px-4 py-3",
    width: 24,
    height: 24,
  },
  {
    title: "DevOps / SRE",
    description: "Cloud, Kubernetes, CI/CD",
    icon: "/images/icons/django.svg",
    openRoles: "890+",
    tag: "Remote first",
    background: "bg-primary",
    padding: "px-4 py-3",
    width: 24,
    height: 24,
  },
  {
    title: "JavaScript / Node",
    description: "Serverless, real-time, APIs",
    icon: "/images/icons/javascript.svg",
    openRoles: "1.5k+",
    tag: "Flexible",
    background: "bg-primary",
    padding: "px-4 py-3",
    width: 24,
    height: 24,
  },
  {
    title: "API / Integrations",
    description: "REST, GraphQL, third-party",
    icon: "/images/icons/fastapi.svg",
    openRoles: "620+",
    tag: "Growing",
    background: "bg-primary",
    padding: "px-4 py-3",
    width: 24,
    height: 24,
  },
];

export const portfolioData: { image: string; title: string }[] = [
  {
    image: "/images/portfolio/icon-wallet.svg",
    title: "Unified view of all your job boards",
  },
  {
    image: "/images/portfolio/icon-vault.svg",
    title: "Smart matching to avoid low‑quality roles",
  },
  {
    image: "/images/portfolio/icon-mobileapp.svg",
    title: "Automated, yet personalised applications",
  },
];

export const upgradeData: { title: string }[] = [
  { title: "Spend less time filling forms" },
  { title: "Centralise replies and interviews" },
  { title: "Keep daily limits under control" },
  { title: "Personalise every application at scale" },
];

export const perksData: {
  icon: string;
  title: string;
  text: string;
  space: string;
}[] = [
  {
    icon: "/images/perks/icon-support.svg",
    title: "Human‑friendly automation",
    text: "Set clear guardrails so CrypGo never applies to roles you would not accept.",
    space: "lg:mt-8",
  },
  {
    icon: "/images/perks/icon-community.svg",
    title: "Signal over noise",
    text: "Prioritise roles with real budgets, clear requirements, and higher intent.",
    space: "lg:mt-14",
  },
  {
    icon: "/images/perks/icon-academy.svg",
    title: "Own your pipeline",
    text: "See every application, response, and interview in one clean timeline.",
    space: "lg:mt-4",
  },
];

export const timelineData: {
  icon: string;
  title: string;
  text: string;
  position: string;
}[] = [
  {
    icon: "/images/timeline/icon-planning.svg",
    title: "Planning",
    text: "Map the project's scope and architecture",
    position: "md:top-0 md:left-0",
  },
  {
    icon: "/images/timeline/icon-refinement.svg",
    title: "Refinement",
    text: "Refine and improve your solution",
    position: "md:top-0 md:right-0",
  },
  {
    icon: "/images/timeline/icon-prototype.svg",
    title: "Prototype",
    text: "Build a working prototype to test your product",
    position: "md:bottom-0 md:left-0",
  },
  {
    icon: "/images/timeline/icon-support.svg",
    title: "Support",
    text: "Deploy the product and ensure full support by us",
    position: "md:bottom-0 md:right-0",
  },
];

export const CryptoData: { name: string; price: number }[] = [
  { name: "Bitcoin BTC/USD", price: 67646.84 },
  { name: "Ethereum ETH/USD", price: 2515.93 },
  { name: "Bitcoin Cash BTC/USD", price: 366.96 },
  { name: "Litecoin LTC/USD", price: 61504.54 },
];
