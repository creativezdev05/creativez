import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { adminDb } from '@/lib/firebase-admin';
import { encrypt, hashEmail } from '@/lib/encryption';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const COLLECTION = 'newsletter_subscribers';

export async function POST(request: NextRequest) {
  let email: unknown;
  try {
    const body = await request.json();
    email = body?.email;
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (typeof email !== 'string' || email.length > 256 || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
  }

  const emailHash = hashEmail(email);

  try {
    const existing = await adminDb.collection(COLLECTION).where('emailHash', '==', emailHash).limit(1).get();
    if (!existing.empty) {
      return NextResponse.json({ ok: true, alreadySubscribed: true });
    }

    const { ciphertext, iv, authTag } = encrypt(email.trim());

    await adminDb.collection(COLLECTION).add({
      emailHash,
      ciphertext,
      iv,
      authTag,
      createdAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Failed to save newsletter subscriber:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
