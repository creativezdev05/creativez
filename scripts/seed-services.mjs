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

const imageRectangle6 =
  'https://cdn.prod.website-files.com/6597ccea909e42269476248f/68e4d3727754a626967e9649_Rectangle%206%20(2).webp';
const imageRectangle7 =
  'https://cdn.prod.website-files.com/6597ccea909e42269476248f/68e311939a3536f1e22384a5_Rectangle%207.webp';
const imageRectangle8 =
  'https://cdn.prod.website-files.com/6597ccea909e42269476248f/68e311931063d09a3e654980_Rectangle%208.webp';
const imageMaskGroup1 =
  'https://cdn.prod.website-files.com/6597ccea909e42269476248f/68e31193c2e072fddfcfd6c2_Mask%20group%20(1).webp';

const services = [
  {
    slug: 'game-development',
    title: 'Game Development',
    order: 1,
    thumbnail: imageMaskGroup1,
    description:
      'End-to-end game design and development across mobile, PC and console platforms.',
    detail: {
      heroImage: imageMaskGroup1,
      heading: 'Build immersive games players love',
      tags: ['Game Design', '2D/3D Development', 'Unity & Unreal', 'Multiplayer'],
      whatIncludes: [
        'Game concept & mechanics design',
        '2D/3D game development',
        'Multiplayer & backend integration',
        'Playtesting & QA',
        'App store & platform submission',
        'Post-launch support & updates',
      ],
      packages: [
        {
          name: 'Starter',
          price: 'From $1,999',
          features: ['Playable prototype', 'Single platform release', 'Basic game mechanics'],
        },
        {
          name: 'Growth',
          price: 'From $4,999',
          features: [
            'Full game development',
            'Multi-platform release',
            'Multiplayer support',
            'Monetization integration',
          ],
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          features: [
            'Dedicated development team',
            'Custom engine/tooling',
            'Live-ops & ongoing updates',
            'Cross-platform publishing',
          ],
        },
      ],
    },
  },
  {
    slug: '3d-modeling-animations',
    title: '3D Modeling Animations',
    order: 2,
    thumbnail: imageRectangle7,
    description:
      'High-quality 3D models, renders and animations for products, characters and environments.',
    detail: {
      heroImage: imageRectangle7,
      heading: 'Bring your ideas to life in 3D',
      tags: ['3D Modeling', 'Character Design', 'Rendering', 'Animation'],
      whatIncludes: [
        '3D asset & character modeling',
        'Texturing & material design',
        'Rigging & animation',
        'Photorealistic rendering',
        'Environment & scene design',
        'Final render export in required formats',
      ],
      packages: [
        {
          name: 'Starter',
          price: 'From $399',
          features: ['Single 3D model', 'Basic texturing', '2 revisions'],
        },
        {
          name: 'Growth',
          price: 'From $999',
          features: [
            'Multiple models/scenes',
            'Rigging & animation',
            'High-fidelity rendering',
            '5 revisions',
          ],
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          features: [
            'Full asset library',
            'Dedicated 3D artist team',
            'Animation sequences',
            'Unlimited revisions',
          ],
        },
      ],
    },
  },
  {
    slug: 'website-development',
    title: 'Website Development',
    order: 3,
    thumbnail: imageRectangle8,
    description: 'Fast, responsive websites and web apps built to convert.',
    detail: {
      heroImage: imageRectangle8,
      heading: 'Websites that perform as good as they look',
      tags: ['Web Design', 'Frontend Development', 'CMS Integration', 'Performance Optimization'],
      whatIncludes: [
        'UI/UX design for web',
        'Responsive frontend development',
        'CMS / headless CMS integration',
        'SEO-friendly markup & performance tuning',
        'Analytics & tracking setup',
        'Deployment & hosting support',
      ],
      packages: [
        {
          name: 'Starter',
          price: 'From $699',
          features: ['Up to 5 pages', 'Responsive design', 'Basic SEO setup'],
        },
        {
          name: 'Growth',
          price: 'From $1,999',
          features: [
            'Up to 15 pages',
            'CMS integration',
            'Custom animations',
            'Performance optimization',
          ],
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          features: [
            'Unlimited pages',
            'Custom web application',
            'Dedicated dev team',
            'Ongoing maintenance',
          ],
        },
      ],
    },
  },
  {
    slug: 'strategic-branding',
    title: 'Strategic Branding',
    order: 4,
    thumbnail: imageRectangle6,
    description: 'Brand strategy, identity and guidelines that make you memorable.',
    detail: {
      heroImage: imageRectangle6,
      heading: 'Build a brand people remember',
      tags: ['Brand Strategy', 'Logo Design', 'Brand Guidelines', 'Identity Systems'],
      whatIncludes: [
        'Brand discovery & positioning workshop',
        'Logo design & visual identity system',
        'Color palette and typography selection',
        'Brand guidelines document',
        'Business card & stationery design',
        'Social media brand kit',
      ],
      packages: [
        {
          name: 'Starter',
          price: 'From $499',
          features: ['Logo design (3 concepts)', 'Basic brand guidelines', 'Social media kit'],
        },
        {
          name: 'Growth',
          price: 'From $999',
          features: [
            'Everything in Starter',
            'Full brand identity system',
            'Stationery design',
            'Brand strategy workshop',
          ],
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          features: [
            'Everything in Growth',
            'Multi-brand architecture',
            'Dedicated brand strategist',
            'Unlimited revisions',
          ],
        },
      ],
    },
  },
  {
    slug: 'ui-ux-design',
    title: 'UI/UX Design',
    order: 5,
    thumbnail: imageRectangle8,
    description: 'User research, UI design and prototypes that make products easy to use.',
    detail: {
      heroImage: imageRectangle8,
      heading: 'Design experiences users love',
      tags: ['UI Design', 'UX Research', 'Prototyping', 'Design Systems'],
      whatIncludes: [
        'User research & competitor analysis',
        'Wireframing & user flows',
        'High-fidelity UI design',
        'Interactive prototypes',
        'Design system & component library',
        'Usability testing',
      ],
      packages: [
        {
          name: 'Starter',
          price: 'From $799',
          features: ['Up to 5 screens', 'Wireframes', 'Basic UI design'],
        },
        {
          name: 'Growth',
          price: 'From $1,999',
          features: [
            'Up to 20 screens',
            'Full UX research',
            'Interactive prototype',
            'Design system',
          ],
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          features: [
            'Unlimited screens',
            'Dedicated design team',
            'Usability testing',
            'Ongoing design support',
          ],
        },
      ],
    },
  },
  {
    slug: 'ai-content-creation',
    title: 'AI Content Creation',
    order: 6,
    thumbnail: imageMaskGroup1,
    description: 'AI-assisted copy, imagery and video content tailored to your brand voice.',
    detail: {
      heroImage: imageMaskGroup1,
      heading: 'Create content faster with AI',
      tags: ['AI Copywriting', 'AI Image Generation', 'Content Strategy', 'Brand Voice'],
      whatIncludes: [
        'AI-assisted copywriting',
        'AI-generated imagery & graphics',
        'Content strategy & calendar',
        'Brand voice training & guidelines',
        'Short-form video content',
        'Content performance review',
      ],
      packages: [
        {
          name: 'Starter',
          price: 'From $349/mo',
          features: ['10 pieces of content/mo', 'Basic brand voice setup', '1 revision round'],
        },
        {
          name: 'Growth',
          price: 'From $799/mo',
          features: [
            '30 pieces of content/mo',
            'AI image generation',
            'Content calendar',
            '2 revision rounds',
          ],
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          features: [
            'Unlimited content volume',
            'Dedicated content strategist',
            'Video content production',
            'Custom AI workflows',
          ],
        },
      ],
    },
  },
  {
    slug: 'generative-ai',
    title: 'Generative AI',
    order: 7,
    thumbnail: imageRectangle7,
    description: 'Custom generative AI tools, models and integrations for your product.',
    detail: {
      heroImage: imageRectangle7,
      heading: 'Ship generative AI features with confidence',
      tags: ['LLM Integration', 'Custom AI Models', 'AI Automation', 'Prompt Engineering'],
      whatIncludes: [
        'AI feature discovery & scoping',
        'LLM / model integration',
        'Prompt engineering & evaluation',
        'Custom AI workflow automation',
        'AI agent & tool development',
        'Monitoring & ongoing tuning',
      ],
      packages: [
        {
          name: 'Starter',
          price: 'From $1,499',
          features: ['Single AI feature integration', 'Prompt design', 'Basic testing'],
        },
        {
          name: 'Growth',
          price: 'From $3,999',
          features: [
            'Multi-feature AI integration',
            'Custom AI agents',
            'Workflow automation',
            'Performance evaluation',
          ],
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          features: [
            'Dedicated AI engineering team',
            'Custom model fine-tuning',
            'Production-grade infrastructure',
            'Ongoing monitoring & support',
          ],
        },
      ],
    },
  },
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    order: 8,
    thumbnail: imageRectangle7,
    description: 'SEO, paid ads and social media management that grows your audience.',
    detail: {
      heroImage: imageRectangle7,
      heading: 'Grow your reach with data-driven marketing',
      tags: ['SEO', 'Paid Ads', 'Social Media', 'Content Strategy'],
      whatIncludes: [
        'Marketing strategy & audit',
        'SEO optimization',
        'Paid ad campaign setup & management',
        'Social media management',
        'Content calendar & copywriting',
        'Monthly performance reporting',
      ],
      packages: [
        {
          name: 'Starter',
          price: 'From $399/mo',
          features: ['SEO audit', 'Social media management (1 platform)', 'Monthly report'],
        },
        {
          name: 'Growth',
          price: 'From $999/mo',
          features: [
            'Everything in Starter',
            'Paid ad management',
            'Content strategy',
            'Social media (3 platforms)',
          ],
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          features: [
            'Everything in Growth',
            'Dedicated marketing manager',
            'Multi-channel campaigns',
            'Weekly reporting',
          ],
        },
      ],
    },
  },
];

async function clearCollection() {
  const snapshot = await db.collection('services').get();
  if (snapshot.empty) return;
  const batch = db.batch();
  snapshot.docs.forEach((doc) => batch.delete(doc.ref));
  await batch.commit();
  console.log(`Cleared ${snapshot.size} existing service(s).`);
}

async function seed() {
  await clearCollection();
  const batch = db.batch();
  for (const service of services) {
    const ref = db.collection('services').doc(service.slug);
    batch.set(ref, service);
  }
  await batch.commit();
  console.log(`Seeded ${services.length} services into Firestore.`);
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Failed to seed services:', error);
    process.exit(1);
  });
