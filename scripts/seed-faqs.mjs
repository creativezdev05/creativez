import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

function getAdminApp() {
  const existing = getApps()[0];
  if (existing) return existing;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      'Missing Firebase Admin credentials. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY (e.g. via --env-file=.env.local).'
    );
  }

  return initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
}

const db = getFirestore(getAdminApp());

const faqs = [
  {
    slug: 'where-is-your-agency-based',
    question: 'Where is your agency based?',
    answer:
      "Pixgro is a remote-first creative agency with team members distributed across multiple time zones. This lets us assemble the right designers, developers and strategists for your project instead of limiting you to a single local office, while still keeping overlap hours for live calls with your team.",
    order: 1,
  },
  {
    slug: 'how-can-i-give-support-to-your-agency',
    question: 'How can I give support to your agency?',
    answer:
      "The best way to support us is by referring us to other founders and teams, leaving a review of your project experience, or featuring the work we built together in your own case studies. Word of mouth from happy clients is how most of our projects come to us.",
    order: 2,
  },
  {
    slug: 'how-can-i-give-feedback-to-your-agency',
    question: 'How can I give feedback to your agency?',
    answer:
      "Share your feedback anytime via our contact form, email, or your project dashboard. We review every submission as a team and use it to refine our process, so even small notes on communication or delivery help us serve the next client better.",
    order: 3,
  },
  {
    slug: 'what-should-i-do-if-i-have-a-complaint',
    question: 'What should I do if I have a complaint?',
    answer:
      "Raise it directly with your project manager first, since they can act on it immediately. If it isn't resolved to your satisfaction, escalate through our contact form marked 'Complaint' and a senior team member will respond within 48 hours with a resolution plan.",
    order: 4,
  },
  {
    slug: 'what-is-your-agencys-purpose',
    question: "What is your agency's purpose?",
    answer:
      "Our purpose is to turn ambitious ideas into products and brands that actually perform — pairing strong design with measurable business outcomes like traffic, conversions and revenue, rather than delivering visuals that look good but don't move the needle.",
    order: 5,
  },
  {
    slug: 'what-are-your-agencys-hours',
    question: "What are your agency's hours?",
    answer:
      "Our core working hours are Monday to Friday, 9 AM to 6 PM, with project managers available for calls across overlapping time zones. Urgent production issues on live projects are monitored outside these hours too, so you're never left waiting on something critical.",
    order: 6,
  },
  {
    slug: 'how-can-i-reach-your-agency-for-support',
    question: 'How can I reach your agency for support?',
    answer:
      "Every active client gets a dedicated project manager reachable by email and through the shared project dashboard. For general enquiries, use the contact form on our website and our team typically responds within one business day.",
    order: 7,
  },
  {
    slug: 'what-services-does-your-agency-offer',
    question: 'What services does your agency offer?',
    answer:
      "We offer strategic branding, UI/UX design, website development, 3D modeling and animation, game development, digital marketing, and AI-powered content and automation — covering everything from early brand strategy to shipped, scalable products.",
    order: 8,
  },
];

async function clearCollection() {
  const snapshot = await db.collection('faqs').get();
  if (snapshot.empty) return;
  const batch = db.batch();
  snapshot.docs.forEach((doc) => batch.delete(doc.ref));
  await batch.commit();
  console.log(`Cleared ${snapshot.size} existing faq(s).`);
}

async function seed() {
  await clearCollection();
  const batch = db.batch();
  for (const faq of faqs) {
    const ref = db.collection('faqs').doc(faq.slug);
    batch.set(ref, faq);
  }
  await batch.commit();
  console.log(`Seeded ${faqs.length} faqs into Firestore.`);
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Failed to seed faqs:', error);
    process.exit(1);
  });
