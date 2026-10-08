import { adminDb } from '@/lib/firebase-admin';
import type { Faq } from '@/lib/types/faq';

const COLLECTION = 'faqs';

export async function getFaqs(): Promise<Faq[]> {
  const snapshot = await adminDb.collection(COLLECTION).orderBy('order', 'asc').get();
  return snapshot.docs.map((doc) => doc.data() as Faq);
}
