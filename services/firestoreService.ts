import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { getFirebaseDb } from '../config/firebase';

export async function getCollectionData<T>(
  collectionName: string,
  orderByField: string = 'order'
): Promise<(T & { id: string })[]> {
  try {
    const db = getFirebaseDb();
    if (!db) return [];
    const q = query(collection(db, collectionName), orderBy(orderByField));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as T & { id: string }));
  } catch {
    return [];
  }
}

export async function getDocumentData<T>(
  collectionName: string,
  docId: string
): Promise<T | null> {
  try {
    const db = getFirebaseDb();
    if (!db) return null;
    const snap = await getDoc(doc(db, collectionName, docId));
    return snap.exists() ? (snap.data() as T) : null;
  } catch {
    return null;
  }
}

export async function addDocument<T extends Record<string, any>>(
  collectionName: string,
  data: T
): Promise<string> {
  const db = getFirebaseDb();
  if (!db) throw new Error('Firebase not initialized');
  const ref = await addDoc(collection(db, collectionName), data);
  return ref.id;
}

export async function updateDocument<T extends Record<string, any>>(
  collectionName: string,
  docId: string,
  data: Partial<T>
): Promise<void> {
  const db = getFirebaseDb();
  if (!db) throw new Error('Firebase not initialized');
  await updateDoc(doc(db, collectionName, docId), data);
}

export async function deleteDocument(
  collectionName: string,
  docId: string
): Promise<void> {
  const db = getFirebaseDb();
  if (!db) throw new Error('Firebase not initialized');
  await deleteDoc(doc(db, collectionName, docId));
}

export async function setDocument<T extends Record<string, any>>(
  collectionName: string,
  docId: string,
  data: T
): Promise<void> {
  const db = getFirebaseDb();
  if (!db) throw new Error('Firebase not initialized');
  await setDoc(doc(db, collectionName, docId), data);
}
