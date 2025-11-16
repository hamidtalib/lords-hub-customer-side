'use client'

import { firestore, realtimeDB, storage, auth } from './firebase'
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  getDoc,
  deleteDoc,
  orderBy,
  limit,
  onSnapshot,
} from 'firebase/firestore'
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'
import { ref as dbRef, push, set, update, onValue, off } from 'firebase/database'


// Products Actions
export async function addProduct(productData: any) {
  try {
    const docRef = await addDoc(collection(firestore, 'products'), {
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 0,
    })
    return docRef.id
  } catch (error) {
    console.error('[v0] Error adding product:', error)
    throw error
  }
}

export async function getProducts(category?: string) {
  try {
    let q
    if (category) {
      q = query(
        collection(firestore, 'products'),
        where('category', '==', category),
        orderBy('createdAt', 'desc')
      )
    } else {
      q = query(
        collection(firestore, 'products'),
        orderBy('createdAt', 'desc')
      )
    }
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('[v0] Error getting products:', error)
    return []
  }
}

// Chat Actions
export async function createChat(userId: string, userName: string, productId: string) {
  try {
    const docRef = await addDoc(collection(firestore, 'chats'), {
      userId,
      userName,
      productId,
      status: 'new-chat',
      createdAt: new Date(),
      lastMessageAt: new Date(),
    })
    return docRef.id
  } catch (error) {
    console.error('[v0] Error creating chat:', error)
    throw error
  }
}

export async function updateChatStatus(chatId: string, status: string) {
  try {
    await updateDoc(doc(firestore, 'chats', chatId), {
      status,
      lastMessageAt: new Date(),
    })
  } catch (error) {
    console.error('[v0] Error updating chat status:', error)
    throw error
  }
}

// Message Actions
export async function sendMessage(
  chatId: string,
  senderId: string,
  senderType: 'customer' | 'admin',
  message: string,
  mediaUrl?: string,
  mediaType?: string
) {
  try {
    await addDoc(collection(firestore, 'messages'), {
      chatId,
      senderId,
      senderType,
      message,
      mediaUrl,
      mediaType,
      timestamp: new Date(),
      read: false,
    })

    // Update chat lastMessageAt
    const chats = await getDocs(query(
      collection(firestore, 'chats'),
      where('id', '==', chatId)
    ))
    if (chats.docs.length > 0) {
      await updateDoc(chats.docs[0].ref, {
        lastMessageAt: new Date(),
      })
    }
  } catch (error) {
    console.error('[v0] Error sending message:', error)
    throw error
  }
}

export function subscribeToMessages(chatId: string, callback: (messages: any[]) => void) {
  try {
    const q = query(
      collection(firestore, 'messages'),
      where('chatId', '==', chatId),
      orderBy('timestamp', 'asc')
    )
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate?.() || doc.data().timestamp,
      }))
      callback(messages)
    }, (error) => {
      console.error('[v0] Error in message subscription:', error)
      callback([])
    })

    return unsubscribe
  } catch (error) {
    console.error('[v0] Error subscribing to messages:', error)
    return () => {}
  }
}

// Media Upload
export async function uploadMedia(file: File, path: string) {
  try {
    const storageRef = ref(storage, path)
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    return url
  } catch (error) {
    console.error('[v0] Error uploading media:', error)
    throw error
  }
}

export async function deleteMedia(path: string) {
  try {
    const storageRef = ref(storage, path)
    await deleteObject(storageRef)
  } catch (error) {
    console.error('[v0] Error deleting media:', error)
    throw error
  }
}

// Settings
export async function getSettings() {
  try {
    const snapshot = await getDoc(doc(firestore, 'settings', 'config'))
    return snapshot.data()
  } catch (error) {
    console.error('[v0] Error getting settings:', error)
    return null
  }
}
