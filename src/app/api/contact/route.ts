import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { adminDb } from '@/lib/firebase-admin';
import { encrypt, hashEmail } from '@/lib/encryption';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const COLLECTION = 'contact_form';

export async function POST(request: NextRequest) {
  let name: unknown;
  let email: unknown;
  let subject: unknown;
  let message: unknown;

  try {
    const body = await request.json();
    name = body?.name;
    email = body?.email;
    subject = body?.subject;
    message = body?.message;
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (typeof name !== 'string' || !name.trim() || name.length > 150) {
    return NextResponse.json({ error: 'Please provide your name.' }, { status: 400 });
  }
  if (typeof email !== 'string' || email.length > 256 || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
  }
  if (typeof subject !== 'string' || !subject.trim() || subject.length > 200) {
    return NextResponse.json({ error: 'Please provide a subject.' }, { status: 400 });
  }
  if (typeof message !== 'string' || !message.trim() || message.length > 5000) {
    return NextResponse.json({ error: 'Please provide a message.' }, { status: 400 });
  }

  try {
    const emailHash = hashEmail(email);
    const { ciphertext, iv, authTag } = encrypt(
      JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
      })
    );

    await adminDb.collection(COLLECTION).add({
      emailHash,
      ciphertext,
      iv,
      authTag,
      createdAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Failed to save contact form submission:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
