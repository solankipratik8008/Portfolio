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
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { getFirebaseDb, getFirebaseStorage } from '../config/firebase';

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
  const docRef = await addDoc(collection(db, collectionName), data);
  return docRef.id;
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

export async function uploadFile(path: string, file: File): Promise<string> {
  const storage = getFirebaseStorage();
  if (!storage) throw new Error('Firebase Storage not initialized');
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}

export async function deleteFile(storagePath: string): Promise<void> {
  const storage = getFirebaseStorage();
  if (!storage) throw new Error('Firebase Storage not initialized');
  const storageRef = ref(storage, storagePath);
  await deleteObject(storageRef);
}
