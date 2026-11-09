
export const navItems = [
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
] as const

export const problems = [
  {
    title: "Customers call while staff are busy.",
    body: "The person who would normally answer is already with someone else.",
  },
  {
    title: "Leads wait too long for a response.",
    body: "An inquiry that sits until the end of the day often cools off.",
  },
  {
    title: "After-hours inquiries go unanswered.",
    body: "Evening and weekend calls meet voicemail.",
  },
  {
    title: "Website visitors leave without converting.",
    body: "A site that cannot answer a question or take a request ends the visit.",
  },
  {
    title: "Manual follow-up falls through the cracks.",
    body: "The lead was real. The next message never went out.",
  },
  {
    title: "Owners absorb repetitive admin.",
    body: "Hours go to call-backs and inbox triage instead of the work itself.",
  },
] as const

export const services = [
  {
    id: "ai-receptionist",
    eyebrow: "Calls",
    headline: "Your Front Desk. Always Ready.",
    lede: "An intelligent voice assistant designed to handle incoming calls, answer common questions, qualify callers, and help book appointments—even outside normal business hours.",
    paragraphs: [
      "When the phone rings and your team is with a customer, the call still needs an answer. The AI Receptionist is a voice assistant on a dedicated business number. It is designed to answer, cover common questions, qualify the caller, and help request an appointment.",
      "Urgent calls can be handed to a person you choose. Summaries and transcripts are prepared so you can see what happened. About 600 call minutes are included each month. Minutes beyond that allowance, and how the number connects to the phone system you already use, are confirmed before launch.",
      "The phone screens on this website are illustrations of the workflow. They are not a live telephone connection.",
    ],
    note: "The assistant collects and routes requests. It does not provide medical, dental, or legal advice.",
  },
  {
    id: "lead-follow-up",
    eyebrow: "Follow-up",
    headline: "Follow Up Faster. Lose Fewer Leads.",
    lede: "Help turn incoming inquiries and overlooked opportunities into active conversations through timely, automated follow-up.",
    paragraphs: [
      "A new inquiry should not wait for someone to notice it between jobs. This package is built to respond by text and email, continue a short sequence of follow-ups, and reopen conversations with older leads that never converted.",
      "Review requests and a pipeline view are part of the same system, so you can see which conversations are moving. Message volume, consent language, and which past contacts may be included are confirmed in the scope of work.",
      "Examples on this site use a sample inquiry. They are not records from a real client.",
    ],
    note: "Messaging follows the consent and opt-out rules that apply to your business. Those details are set in the agreement.",
  },
  {
    id: "website-chatbot",
    eyebrow: "Website",
    headline: "A Website That Does More Than Look Good.",
    lede: "Conversion-focused websites combined with intelligent assistants that help visitors find answers and take the next step.",
    paragraphs: [
      "The package pairs a custom 5–8 page website with an assistant trained on information you approve: services, hours, service area, and the questions customers already ask. A visitor can get an answer and request a time.",
      "Hosting, basic SEO setup, analytics, and monthly updates are part of the retainer. The assistant stays inside the facts you approved. It is not a place to invent offers or give regulated advice.",
      "Chat examples on this site are scripted product illustrations unless a working assistant has been connected for your business.",
    ],
    note: "Booking and analytics connections are confirmed for the tools in your scope of work.",
  },
] as const

export const steps = [
  {
    number: "01",
    title: "Discover",
    body: "We learn how your business handles calls, leads, and customer inquiries.",
    detail:
      "You walk us through the hours, the services, the questions customers repeat, and where inquiries currently stall. We listen before we recommend a package.",
  },
  {
    number: "02",
    title: "Design",
    body: "We map the right automation to your workflows, systems, and goals.",
    detail:
      "We decide what the assistant may say, how a lead should move, and which calendar, phone, or CRM connections are realistic. If a system is not a fit, that is said before build.",
  },
  {
    number: "03",
    title: "Implement",
    body: "We build, connect, and test the solution before launch.",
    detail:
      "We configure the package, connect what was agreed, and test the paths a customer would actually take. You review the wording and the handoff before anything goes live.",
  },
  {
    number: "04",
    title: "Optimize",
    body: "We monitor performance and refine the system as your business evolves.",
    detail:
      "After launch we watch how the system is used and adjust scripts, follow-up steps, and pages as the business changes. The depth of that work follows the package you chose.",
  },
] as const

export const industries = [
  {
    id: "home-services",
    name: "Home Services",
    help: "Answer inquiries even when your team is on a job.",
    problem:
      "HVAC, plumbing, and roofing calls often arrive while the crew is already on site. Voicemail is a weak stand-in for a person who can capture the job.",
    boundary: "",
  },
  {
    id: "dental",
    name: "Dental Practices",
    help: "Help prospective patients request appointments without waiting on hold.",
    problem:
      "The front desk is with a patient. A new patient who reaches a long hold, or no one at all, may not try again.",
    boundary:
      "The assistant does not provide medical or dental advice. It collects the request for your staff to review.",
  },
  {
    id: "law",
    name: "Law Firms",
    help: "Capture potential client inquiries and route them for appropriate staff review.",
    problem:
      "Intake calls compete with the work already on a lawyer’s desk. A missed inquiry is a conversation the firm never gets to evaluate.",
    boundary:
      "The assistant does not provide legal advice. It captures the inquiry and routes it to your team.",
  },
  {
    id: "real-estate",
    name: "Real Estate",
    help: "Respond to property inquiries and help organize prospective client follow-up.",
    problem:
      "Property questions arrive while an agent is in a showing. Slow replies lose the next conversation.",
    boundary:
      "The assistant does not provide legal, lending, or investment advice.",
  },
  {
    id: "med-spa",
    name: "Med Spas",
    help: "Support appointment inquiries and timely follow-up.",
    problem:
      "Treatment rooms and a busy front desk leave little room for every new question about availability.",
    boundary:
      "The assistant does not provide medical advice. Clinical questions stay with your staff.",
  },
  {
    id: "other-appointment",
    name: "Appointment-Based Businesses",
    help: "Keep the next request from depending on who is free to answer.",
    problem:
      "Any business that books time has the same pressure: the phone, the inbox, and the website all create work while the owner is serving someone else.",
    boundary:
      "What the assistant is allowed to say is limited to the business information you approve.",
  },
] as const

export type IndustryId = (typeof industries)[number]["id"]

export const contactMethods = [
  { id: "phone", label: "Phone" },
  { id: "email", label: "Email" },
] as const

export const faqs = [
  {
    question: "What does VONTE actually do?",
    answer:
      "VONTE sets up automation for appointment-driven service businesses. The work covers three areas: an AI receptionist for incoming calls, follow-up for new and older leads, and a conversion-focused website with an assistant that answers from information you approve. You can start with one package or use Vonte Complete, which combines all three. Each engagement has a one-time setup fee and a monthly retainer.",
  },
  {
    question: "Will the AI receptionist replace my existing phone number?",
    answer:
      "The AI Receptionist package includes a dedicated business number. Some businesses forward an existing number to it. Others publish the new number. Whether forwarding is possible depends on the phone system you already use, and that routing is confirmed during setup. Where a compatible connection exists, the goal is to work with your current number rather than force a replacement.",
  },
  {
    question: "Can VONTE work with my current calendar or CRM?",
    answer:
      "The intention is to book appointments and capture leads in the calendar and CRM you already use, where those products allow a connection. Not every platform can be connected. During the consultation we name what will be connected, what will not, and how the workflow will run. Compatibility is confirmed before build.",
  },
  {
    question: "What happens when a caller needs a real person?",
    answer:
      "Urgent calls are designed to be handed to a person you designate. The receptionist package also includes summaries and transcripts so your team can review what was said. Who receives the handoff, and what counts as urgent, is defined before launch. The assistant is not a substitute for professional judgment in medical, dental, or legal matters.",
  },
  {
    question: "What is included in the setup fee?",
    answer:
      "Setup is the one-time work to configure the package, connect the systems agreed in writing, test those paths, and launch. The included list on the pricing page is the scope. Extra pages, unusual integrations, and usage beyond the included allowances are quoted before that work starts.",
  },
  {
    question: "What does the monthly fee cover?",
    answer:
      "The monthly fee keeps the selected package running. That includes the usage described for the package, monitoring, and the updates or reporting named in the package. For the AI Receptionist, about 600 call minutes are included each month. The monthly fee is a defined retainer. Minutes, messages, support, and third-party subscriptions outside the written scope are confirmed separately.",
  },
  {
    question: "Can I start with one service and add more later?",
    answer:
      "Yes. Each service can be engaged on its own. Vonte Complete includes all three and costs $2,000 less in setup and $294 less per month than buying the three packages separately. Adding a service later is a new scope, agreed before the extra work begins.",
  },
  {
    question: "How long does implementation usually take?",
    answer:
      "A launch date is set once the scope is confirmed. Planning materials describe a common target of roughly 7 to 14 days after onboarding, once access and decisions are in place. That range is a planning reference, not a guaranteed date. Your timeline depends on the package, your systems, and the approvals required to go live.",
  },
  {
    question: "How are customer data and call recordings handled?",
    answer:
      "The receptionist package is designed so calls can be logged, summarized, and reviewed by your business. Recording notice, AI disclosure, message consent, and how long records are kept have to match the rules that apply to your business. Those terms belong in the written agreement and in the wording used on calls and messages. They are discussed during the consultation. VONTE does not claim HIPAA compliance or other regulated-industry certifications on this website.",
  },
  {
    question: "How do I get started?",
    answer:
      "Send a consultation request with your name, your business, and the package you want to discuss. We review it and follow up using the contact method you choose. Submitting the form does not reserve a meeting time. If a scheduling link is configured later, it will appear on the contact page.",
  },
] as const

export const expectations = [
  {
    title: "You tell us where inquiries stall.",
    body: "Calls, web forms, old leads, or the website. A sentence on the form is enough to start.",
  },
  {
    title: "We review the fit.",
    body: "We look at the package you selected, the systems you already use, and what a first launch would include.",
  },
  {
    title: "We follow up directly.",
    body: "The next step is a conversation by the method you chose. The form itself does not book a time.",
  },
] as const
