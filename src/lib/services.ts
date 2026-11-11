import { adminDb } from '@/lib/firebase-admin';
import type { Service } from '@/lib/types/service';

const COLLECTION = 'services';

const convertedPng = new Set([
  '/images/services/game-development.png',
  '/images/services/3d.png',
  '/images/services/website-development.png',
  '/images/services/game-development-thumb-feature.png',
  '/images/services/ui-ux-thumb-feature.png',
  '/images/services/website-development-thumb-feature.png',
  '/images/services/ai-creative-thumb-feature.png',
]);

function preferWebp(src: string) {
  return convertedPng.has(src) ? src.replace(/\.png$/, '.webp') : src;
}

function withWebp(service: Service): Service {
  return {
    ...service,
    thumbnail: preferWebp(service.thumbnail),
    featureThumbnail: service.featureThumbnail ? preferWebp(service.featureThumbnail) : service.featureThumbnail,
    detail: service.detail
      ? { ...service.detail, heroImage: preferWebp(service.detail.heroImage) }
      : service.detail,
  };
}

export async function getServices(): Promise<Service[]> {
  const snapshot = await adminDb.collection(COLLECTION).orderBy('order', 'asc').get();
  return snapshot.docs.map((doc) => withWebp(doc.data() as Service));
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const doc = await adminDb.collection(COLLECTION).doc(slug).get();
  if (!doc.exists) return null;
  return withWebp(doc.data() as Service);
}
