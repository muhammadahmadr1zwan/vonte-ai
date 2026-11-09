export const packages = [
  {
    id: "ai-receptionist",
    name: "AI Receptionist",
    setup: 2500,
    monthly: 997,
    description:
      "An AI-powered receptionist designed to answer incoming calls, qualify leads, and help schedule appointments.",
    included: [
      "Natural-sounding AI voice receptionist.",
      "Dedicated business number.",
      "Appointment booking integration.",
      "Lead capture.",
      "Missed-call text-back.",
      "After-hours coverage.",
      "Call summaries and transcripts.",
      "Urgent-call handoff.",
      "Approximately 600 included call minutes monthly.",
    ],
    bestFor: "Home services, dental practices, law firms, and med spas.",
    featured: false,
  },
  {
    id: "lead-follow-up",
    name: "Lead Follow-Up & Reactivation",
    setup: 1500,
    monthly: 497,
    description:
      "Automated follow-up that helps you respond to new inquiries and reconnect with older leads.",
    included: [
      "Automated SMS and email responses.",
      "Multi-step follow-up sequences.",
      "Past-lead reactivation workflows.",
      "Review request automation.",
      "Lead pipeline dashboard.",
    ],
    bestFor:
      "Businesses with incoming leads and an existing database of unconverted inquiries.",
    featured: false,
  },
  {
    id: "website-chatbot",
    name: "Website & AI Chatbot",
    setup: 3500,
    monthly: 297,
    description:
      "A conversion-focused custom website paired with an AI assistant that helps visitors get answers and request bookings.",
    included: [
      "Custom 5–8-page website.",
      "Responsive design.",
      "AI chatbot trained on approved business information.",
      "Booking integration.",
      "Analytics.",
      "Basic SEO setup.",
      "Hosting and monthly updates.",
    ],
    bestFor: "Businesses that need a stronger online presence.",
    featured: false,
  },
  {
    id: "vonte-complete",
    name: "Vonte Complete",
    setup: 5500,
    monthly: 1497,
    description:
      "The complete front-office automation system—calls, leads, and website working together.",
    included: [
      "Everything in the AI Receptionist package.",
      "Everything in Lead Follow-Up & Reactivation.",
      "Everything in Website & AI Chatbot.",
      "Monthly results reporting and strategy review.",
      "Priority support.",
      "Quarterly optimization.",
    ],
    bestFor: "Business owners seeking one integrated solution.",
    featured: true,
  },
] as const

export type Package = (typeof packages)[number]
export type PackageId = Package["id"]

export const packageIds = packages.map((item) => item.id)

export function getPackage(id: string | undefined | null) {
  return packages.find((item) => item.id === id)
}

export const standardPackages = packages.filter((item) => !item.featured)
export const completePackage = packages.find((item) => item.featured)!

export const separatePurchase = {
  setup: standardPackages.reduce((sum, item) => sum + item.setup, 0),
  monthly: standardPackages.reduce((sum, item) => sum + item.monthly, 0),
}

export const completeSavings = {
  setup: separatePurchase.setup - completePackage.setup,
  monthly: separatePurchase.monthly - completePackage.monthly,
}

export const scopeNote =
  "Setup covers configuration, the connections agreed in writing, testing, and launch for the selected package. The monthly fee covers operation of that package, the included usage listed above, monitoring, and the updates or reporting named in the package. Usage above included allowances, third-party platform fees, and compatibility with a specific phone system, calendar, or CRM are confirmed before work begins. Commercial terms are set in the written agreement. This page is not a contract."

export const includedCallMinutes = 600
