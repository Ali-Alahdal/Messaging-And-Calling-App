import { auth, db } from "../firebase/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from "firebase/auth";
import {
    collection,
    addDoc,
    query,
    where,
    getDocs,
    setDoc,
    doc,
    getDoc,
    onSnapshot,
    orderBy,
    serverTimestamp
} from "firebase/firestore";

//  *******************
//  User Operations 
//  *******************

export const registerAPI = async (first_name, last_name, email, username, password) => {
    try {
        // 1. Create user in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 2. Update Auth Profile
        await updateProfile(user, {
            displayName: `${first_name} ${last_name}`
        });

        // 3. Store additional user data in Firestore
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            first_name,
            last_name,
            email,
            username,
            username_lowercase: username.toLowerCase() // Add lowercase field for searching
        });

        return { success: true, user: { uid: user.uid, email: user.email, username } };
    } catch (error) {
        console.error("Register Error:", error);
        throw error;
    }
}

export const loginAPI = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        // Auto-repair: Ensure username_lowercase exists for legacy users upon login
        const user = userCredential.user;
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.username && !userData.username_lowercase) {
                await setDoc(userDocRef, {
                    username_lowercase: userData.username.toLowerCase()
                }, { merge: true });
            }
        }

        return { success: true, user: userCredential.user };
    } catch (error) {
        console.error("Login Error:", error);
        throw error;
    }
}

export const logoutAPI = async () => {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        console.error("Logout Error:", error);
        throw error;
    }
}

export const getProfileAPI = async () => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("No user logged in");

        // Optionally fetch more data from Firestore if needed
        const userDoc = await getDoc(doc(db, "users", user.uid));

        if (userDoc.exists()) {
            return { success: true, data: userDoc.data() };
        } else {
            // Fallback to auth profile if doc doesn't exist
            return {
                success: true,
                data: {
                    email: user.email,
                    displayName: user.displayName,
                    uid: user.uid
                }
            };
        }
    } catch (error) {
        console.error("Get Profile Error:", error);
        throw error;
    }
}

export const searchUsersAPI = async (searchTerm) => {
    try {
        if (!searchTerm) return [];
        const currentUser = auth.currentUser;
        if (!currentUser) return [];

        const searchTermLower = searchTerm.toLowerCase();
        const searchTermCapitalized = searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1).toLowerCase();

        // 1. New users (case-insensitive)
        const q1 = query(
            collection(db, "users"),
            where("username_lowercase", ">=", searchTermLower),
            where("username_lowercase", "<=", searchTermLower + '\uf8ff')
        );

        // 2. Legacy users (exact case) -> Mostly useful if they typed it exactly right
        const q2 = query(
            collection(db, "users"),
            where("username", ">=", searchTerm),
            where("username", "<=", searchTerm + '\uf8ff')
        );

        // 3. Legacy users (Capitalized) -> Handles "ali" -> "Ali"
        const q3 = query(
            collection(db, "users"),
            where("username", ">=", searchTermCapitalized),
            where("username", "<=", searchTermCapitalized + '\uf8ff')
        );

        const [snap1, snap2, snap3] = await Promise.all([
            getDocs(q1),
            getDocs(q2),
            getDocs(q3)
        ]);

        const usersMap = new Map();
        const processDoc = (doc) => {
            if (doc.id !== currentUser.uid && !usersMap.has(doc.id)) {
                usersMap.set(doc.id, { id: doc.id, ...doc.data() });
            }
        };

        snap1.forEach(processDoc);
        snap2.forEach(processDoc);
        snap3.forEach(processDoc);

        return Array.from(usersMap.values());
    } catch (error) {
        console.error("Search Users Error:", error);
        throw error;
    }
}

// ... existing code ...

//  *******************
//  Messaging Operations 
//  *******************

export const getChatsAPI = async () => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("User not authenticated");

        // Query chats where 'participants' array contains the current user's UID
        const q = query(
            collection(db, "chats"),
            where("participants", "array-contains", user.uid)
        );

        const querySnapshot = await getDocs(q);
        const chats = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            let displayName = data.chat_name;
            let otherUserId = null;

            if (data.group) {
                // It's a group, strictly use the group name set by creator
                displayName = data.chat_name;
            } else {
                // Logic to determine other user's ID
                // If it's a 1-on-1 chat (2 participants), find the ID that isn't the current user
                if (data.participants && data.participants.length === 2) {
                    otherUserId = data.participants.find(p => p !== user.uid);
                }

                if (data.createdBy !== user.uid && data.chat_name2) {
                    displayName = data.chat_name2;
                }
            }

            chats.push({
                id: doc.id,
                ...data,
                // Override chat_name with the correct display name for the frontend
                chat_name: displayName,
                other_user_id: otherUserId // Add this for Dialog usage
            });
        });

        return chats;
    } catch (error) {
        console.error("Get Chats Error:", error);
        throw error; // Propagate error or return empty array
    }
}

export const subscribeToChatsAPI = (callback) => {
    const user = auth.currentUser;
    if (!user) return () => { };

    const q = query(
        collection(db, "chats"),
        where("participants", "array-contains", user.uid)
    );

    return onSnapshot(q, (snapshot) => {
        const chats = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            let displayName = data.chat_name;
            let otherUserId = null;

            if (data.group) {
                // It's a group, strictly use the group name set by creator
                displayName = data.chat_name;
            } else {
                // Logic to determine other user's ID
                // If it's a 1-on-1 chat (2 participants), find the ID that isn't the current user
                if (data.participants && data.participants.length === 2) {
                    otherUserId = data.participants.find(p => p !== user.uid);
                }

                if (data.createdBy !== user.uid && data.chat_name2) {
                    displayName = data.chat_name2;
                }
            }

            chats.push({
                id: doc.id,
                ...data,
                chat_name: displayName,
                other_user_id: otherUserId
            });
        });
        callback(chats);
    });
}

export const createChatsAPI = async (chat_name, participants, isGroup = false) => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("User not authenticated");

        // Ensure current user is in participants
        const uniqueParticipants = [...new Set([...participants, user.uid])];

        // Prevent self-chat (if unique participants is only 1 and it is the current user)
        if (uniqueParticipants.length < 2 && !isGroup) {
            throw new Error("Cannot create a chat with yourself");
        }

        // Check if chat already exists (ONLY FOR 1-on-1 DMs)
        if (!isGroup) {
            const q = query(
                collection(db, "chats"),
                where("participants", "array-contains", user.uid)
            );
            const querySnapshot = await getDocs(q);
            let existingChatId = null;

            querySnapshot.forEach(doc => {
                const data = doc.data();
                // Ensure we only match against other non-group chats
                if (!data.group) {
                    const dataParts = data.participants.sort();
                    const newParts = uniqueParticipants.sort();
                    if (JSON.stringify(dataParts) === JSON.stringify(newParts)) {
                        existingChatId = doc.id;
                    }
                }
            });

            if (existingChatId) {
                console.log("Chat already exists:", existingChatId);
                return { success: true, id: existingChatId };
            }
        }

        // Fetch current user's profile to get their name for 'chat_name2'
        let currentUserName = user.displayName;
        if (!currentUserName) {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                currentUserName = userDoc.data().username || userDoc.data().email;
            } else {
                currentUserName = user.email;
            }
        }

        const docRef = await addDoc(collection(db, "chats"), {
            chat_name: chat_name,        // Name for the Creator to see (Target's Name) OR Group Name
            chat_name2: currentUserName, // Name for the Target to see (Creator's Name)
            participants: uniqueParticipants,
            createdAt: new Date(),
            createdBy: user.uid,
            group: isGroup
        });

        console.log("Chat created with ID: ", docRef.id);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Create Chat Error:", error);
        throw error;
    }
}

export const sendMessageAPI = async (chatId, content) => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("User not authenticated");
        if (!chatId) throw new Error("No chat selected");

        const messagesRef = collection(db, "chats", chatId, "messages");



        // Always fetch the latest username from Firestore to ensure correctness
        // and consistency (preferring the unique 'username' over 'displayName')
        let senderName = "Unknown";
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
            senderName = userDoc.data().username || user.displayName || user.email;
        } else {
            senderName = user.displayName || user.email;
        }

        await addDoc(messagesRef, {
            sender_id: user.uid,
            sender_name: senderName,
            content: content,
            sent_time: serverTimestamp(), // Use server timestamp for ordering
            type: "text"
        });

        return { success: true };
    } catch (error) {
        console.error("Send Message Error:", error);
        throw error;
    }
}

export const subscribeToMessagesAPI = (chatId, callback) => {
    if (!chatId) return () => { };

    const messagesRef = collection(db, "chats", chatId, "messages");
    const q = query(messagesRef, orderBy("sent_time", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
        const messages = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            // Convert timestamp to date/string if needed, or handle in UI
            messages.push({
                id: doc.id,
                ...data,
                // Ensure sent_time is safely convertible if it's null (pending server write)
                sent_time: data.sent_time?.toDate ? data.sent_time.toDate().toISOString() : new Date().toISOString()
            });
        });
        callback(messages);
    });

    return unsubscribe;
}
