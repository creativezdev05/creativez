import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { adminDb } from '@/lib/firebase-admin';
import { encrypt, hashEmail } from '@/lib/encryption';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const COLLECTION = 'service_quotes';

export async function POST(request: NextRequest) {
  let serviceSlug: unknown;
  let serviceType: unknown;
  let name: unknown;
  let email: unknown;
  let customInstructions: unknown;

  try {
    const body = await request.json();
    serviceSlug = body?.serviceSlug;
    serviceType = body?.serviceType;
    name = body?.name;
    email = body?.email;
    customInstructions = body?.customInstructions;
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (typeof serviceSlug !== 'string' || !serviceSlug.trim() || serviceSlug.length > 150) {
    return NextResponse.json({ error: 'Invalid service.' }, { status: 400 });
  }
  if (typeof serviceType !== 'string' || !serviceType.trim() || serviceType.length > 150) {
    return NextResponse.json({ error: 'Invalid service.' }, { status: 400 });
  }
  if (typeof name !== 'string' || !name.trim() || name.length > 150) {
    return NextResponse.json({ error: 'Please provide your name.' }, { status: 400 });
  }
  if (typeof email !== 'string' || email.length > 256 || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
  }
  if (
    typeof customInstructions !== 'string' ||
    !customInstructions.trim() ||
    customInstructions.length > 5000
  ) {
    return NextResponse.json({ error: 'Please provide your instructions.' }, { status: 400 });
  }

  try {
    const emailHash = hashEmail(email);
    const { ciphertext, iv, authTag } = encrypt(
      JSON.stringify({
        serviceType: serviceType.trim(),
        name: name.trim(),
        email: email.trim(),
        customInstructions: customInstructions.trim(),
      })
    );

    await adminDb.collection(COLLECTION).add({
      serviceSlug: serviceSlug.trim(),
      emailHash,
      ciphertext,
      iv,
      authTag,
      createdAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Failed to save service quote submission:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
