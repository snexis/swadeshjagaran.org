// firebase.js - Swadesh Jagaran Samiti Firebase Configuration and Operations

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";
import { 
    getFirestore, 
    collection, 
    addDoc, 
    getDocs, 
    deleteDoc, 
    doc, 
    query, 
    orderBy, 
    onSnapshot 
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

// আপনার প্রজেক্টের আসল ফায়ারবেস কনফিগারেশন
const firebaseConfig = {
    apiKey: "AIzaSyCg5ttOQHcdqupwlD9lDam6IFfh6P1mdos",
    authDomain: "swadeshjagaran.firebaseapp.com",
    projectId: "swadeshjagaran",
    storageBucket: "swadeshjagaran.firebasestorage.app",
    messagingSenderId: "955311438612",
    appId: "1:955311438612:web:089ee627987ee0b5562001",
    measurementId: "G-WC17FQTESH"
};

// ফায়ারবেস এবং ক্লাউড ডাটাবেজ ইনিশিয়ালাইজ করা হচ্ছে
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * নতুন হিসাব (আয় বা ব্যয়) ডাটাবেজে সংরক্ষণ করার ফাংশন
 * @param {Object} transactionData - হিসাবের বিবরণ (date, type, description, amount, billNo)
 */
export async function addTransaction(transactionData) {
    try {
        const docRef = await addDoc(collection(db, "transactions"), {
            ...transactionData,
            createdAt: new Date()
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("হিসাব সংরক্ষণ করতে সমস্যা হয়েছে: ", error);
        return { success: false, error: error.message };
    }
}

/**
 * ডাটাবেজ থেকে সমস্ত হিসাব রিয়েল-টাইমে পড়ার ফাংশন
 * @param {Function} callback - ডেটা পরিবর্তনের পর রান করার ফাংশন
 */
export function listenTransactions(callback) {
    const q = query(collection(db, "transactions"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => {
        const transactions = [];
        snapshot.forEach((doc) => {
            transactions.push({ id: doc.id, ...doc.data() });
        });
        callback(transactions);
    });
}

/**
 * নির্দিষ্ট হিসাব ডাটাবেজ থেকে মুছে ফেলার ফাংশন
 * @param {String} id - ডকুমেন্টের আইডি
 */
export async function deleteTransaction(id) {
    try {
        await deleteDoc(doc(db, "transactions", id));
        return { success: true };
    } catch (error) {
        console.error("হিসাব মুছে ফেলতে সমস্যা হয়েছে: ", error);
        return { success: false, error: error.message };
    }
}

/**
 * নতুন নোটিশ ডাটাবেজে সংরক্ষণ করার ফাংশন
 * @param {Object} noticeData - নোটিশের বিবরণ (date, title, message)
 */
export async function addNotice(noticeData) {
    try {
        const docRef = await addDoc(collection(db, "notices"), {
            ...noticeData,
            createdAt: new Date()
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("নোটিশ সংরক্ষণ করতে সমস্যা হয়েছে: ", error);
        return { success: false, error: error.message };
    }
}

/**
 * নোটিশগুলো রিয়েল-টাইমে পড়ার ফাংশন
 * @param {Function} callback - ডেটা পরিবর্তনের পর রান করার ফাংশন
 */
export function listenNotices(callback) {
    const q = query(collection(db, "notices"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => {
        const notices = [];
        snapshot.forEach((doc) => {
            notices.push({ id: doc.id, ...doc.data() });
        });
        callback(notices);
    });
}

/**
 * নির্দিষ্ট নোটিশ ডাটাবেজ থেকে মুছে ফেলার ফাংশন
 * @param {String} id - ডকুমেন্টের আইডি
 */
export async function deleteNotice(id) {
    try {
        await deleteDoc(doc(db, "notices", id));
        return { success: true };
    } catch (error) {
        console.error("নোটিশ মুছে ফেলতে সমস্যা হয়েছে: ", error);
        return { success: false, error: error.message };
    }
}
