import { adminDb } from '@/lib/firebase-admin';
import type { Service } from '@/lib/types/service';

const COLLECTION = 'services';

export async function getServices(): Promise<Service[]> {
  const snapshot = await adminDb.collection(COLLECTION).orderBy('order', 'asc').get();
  return snapshot.docs.map((doc) => doc.data() as Service);
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const doc = await adminDb.collection(COLLECTION).doc(slug).get();
  if (!doc.exists) return null;
  return doc.data() as Service;
}
