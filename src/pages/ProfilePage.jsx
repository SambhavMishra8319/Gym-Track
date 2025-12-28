// // // // // // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // // // // // import { getWorkouts, updateProfilePhoto } from "../firebase/exercises"; // or users.js
// // // // // // // // // // // import ProgressChart from "../components/ProgressChart";
// // // // // // // // // // // import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// // // // // // // // // // // import { storage } from "../firebase/config"; // make sure you have firebase initialized

// // // // // // // // // // // export default function ProfilePage({ user }) {
// // // // // // // // // // //   const [workouts, setWorkouts] = useState([]);
// // // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // // //   const [photo, setPhoto] = useState(user.photoURL || "");
// // // // // // // // // // //   const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

// // // // // // // // // // //   // Load workouts
// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     if (!user) return;
// // // // // // // // // // //     async function load() {
// // // // // // // // // // //       const data = await getWorkouts(user.uid);
// // // // // // // // // // //       setWorkouts(data);
// // // // // // // // // // //       setLoading(false);
// // // // // // // // // // //     }
// // // // // // // // // // //     load();
// // // // // // // // // // //   }, [user]);

// // // // // // // // // // //   // Theme toggle
// // // // // // // // // // //   const toggleTheme = () => {
// // // // // // // // // // //     const newTheme = theme === "light" ? "dark" : "light";
// // // // // // // // // // //     setTheme(newTheme);
// // // // // // // // // // //     document.documentElement.classList.toggle("dark", newTheme === "dark");
// // // // // // // // // // //     localStorage.setItem("theme", newTheme);
// // // // // // // // // // //   };

// // // // // // // // // // //   // Upload photo
// // // // // // // // // // //   const handlePhotoUpload = async (e) => {
// // // // // // // // // // //     const file = e.target.files[0];
// // // // // // // // // // //     if (!file) return;
// // // // // // // // // // //     const storageRef = ref(storage, `users/${user.uid}/profile.jpg`);
// // // // // // // // // // //     await uploadBytes(storageRef, file);
// // // // // // // // // // //     const url = await getDownloadURL(storageRef);
// // // // // // // // // // //     setPhoto(url);
// // // // // // // // // // //     await updateProfilePhoto(user.uid, url);
// // // // // // // // // // //   };

// // // // // // // // // // //   // Prepare data for ProgressChart
// // // // // // // // // // //   const chartData = {
// // // // // // // // // // //     labels: workouts.map((w) => w.date),
// // // // // // // // // // //     datasets: [
// // // // // // // // // // //       {
// // // // // // // // // // //         label: "Total Volume",
// // // // // // // // // // //         data: workouts.map((w) =>
// // // // // // // // // // //           w.exercises.reduce(
// // // // // // // // // // //             (sum, ex) =>
// // // // // // // // // // //               sum +
// // // // // // // // // // //               ex.sets.reduce(
// // // // // // // // // // //                 (sSum, set) => sSum + (set.reps || 0) * (set.weight || 0),
// // // // // // // // // // //                 0
// // // // // // // // // // //               ),
// // // // // // // // // // //             0
// // // // // // // // // // //           )
// // // // // // // // // // //         ),
// // // // // // // // // // //         borderColor: "#3b82f6",
// // // // // // // // // // //         backgroundColor: "rgba(59, 130, 246, 0.2)",
// // // // // // // // // // //       },
// // // // // // // // // // //     ],
// // // // // // // // // // //   };

// // // // // // // // // // //   if (loading) return <p>Loading profile...</p>;

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div className="p-8 min-h-screen">
// // // // // // // // // // //       <div className="flex items-center gap-6 mb-8">
// // // // // // // // // // //         <div className="relative">
// // // // // // // // // // //           <img
// // // // // // // // // // //             src={photo || "https://ui-avatars.com/api/?name=User&background=E0F2FE&color=0284C7"}
// // // // // // // // // // //             alt="Profile"
// // // // // // // // // // //             className="h-24 w-24 rounded-full object-cover border-2 border-blue-400"
// // // // // // // // // // //           />
// // // // // // // // // // //           <input
// // // // // // // // // // //             type="file"
// // // // // // // // // // //             accept="image/*"
// // // // // // // // // // //             onChange={handlePhotoUpload}
// // // // // // // // // // //             className="absolute bottom-0 right-0 opacity-0 w-full h-full cursor-pointer"
// // // // // // // // // // //           />
// // // // // // // // // // //           <div className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full text-xs cursor-pointer">
// // // // // // // // // // //             ✎
// // // // // // // // // // //           </div>
// // // // // // // // // // //         </div>
// // // // // // // // // // //         <div>
// // // // // // // // // // //           <h2 className="text-2xl font-semibold">{user.displayName || "User"}</h2>
// // // // // // // // // // //           <p className="text-gray-600">{user.email}</p>
// // // // // // // // // // //           <button
// // // // // // // // // // //             onClick={toggleTheme}
// // // // // // // // // // //             className="mt-2 px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-sm"
// // // // // // // // // // //           >
// // // // // // // // // // //             {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
// // // // // // // // // // //           </button>
// // // // // // // // // // //         </div>
// // // // // // // // // // //       </div>

// // // // // // // // // // //       <div className="bg-white p-6 rounded-xl shadow mb-8">
// // // // // // // // // // //         <h3 className="text-xl font-semibold mb-4">Progress Chart</h3>
// // // // // // // // // // //         <ProgressChart data={chartData} />
// // // // // // // // // // //       </div>
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // }
// // // // // // // // // // // src/pages/ProfilePage.jsx
// // // // // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // // // // import { db, storage, auth } from "../firebase/config";
// // // // // // // // // // import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// // // // // // // // // // import { doc, getDoc, setDoc } from "firebase/firestore";

// // // // // // // // // // export default function ProfilePage({ user }) {
// // // // // // // // // //   const [profileData, setProfileData] = useState({
// // // // // // // // // //     displayName: user?.displayName || "",
// // // // // // // // // //     email: user?.email || "",
// // // // // // // // // //     photoURL: "",
// // // // // // // // // //   });
// // // // // // // // // //   const [uploading, setUploading] = useState(false);

// // // // // // // // // //   // Load profile data from Firestore
// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     if (!user) return;

// // // // // // // // // //     const loadProfile = async () => {
// // // // // // // // // //       const docRef = doc(db, "users", user.uid);
// // // // // // // // // //       const docSnap = await getDoc(docRef);
// // // // // // // // // //       if (docSnap.exists()) {
// // // // // // // // // //         setProfileData((prev) => ({ ...prev, ...docSnap.data() }));
// // // // // // // // // //       }
// // // // // // // // // //     };

// // // // // // // // // //     loadProfile();
// // // // // // // // // //   }, [user]);

// // // // // // // // // //   // Handle profile picture upload
// // // // // // // // // //   const handleFileChange = async (e) => {
// // // // // // // // // //     const file = e.target.files[0];
// // // // // // // // // //     if (!file) return;

// // // // // // // // // //     setUploading(true);
// // // // // // // // // //     const storageRef = ref(storage, `users/${user.uid}/profile.jpg`);
// // // // // // // // // //     try {
// // // // // // // // // //       await uploadBytes(storageRef, file);
// // // // // // // // // //       const url = await getDownloadURL(storageRef);

// // // // // // // // // //       // Update Firestore
// // // // // // // // // //       await setDoc(
// // // // // // // // // //         doc(db, "users", user.uid),
// // // // // // // // // //         { photoURL: url },
// // // // // // // // // //         { merge: true }
// // // // // // // // // //       );

// // // // // // // // // //       setProfileData((prev) => ({ ...prev, photoURL: url }));
// // // // // // // // // //       alert("Profile picture updated ✅");
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //       console.error(err);
// // // // // // // // // //       alert("Failed to upload profile picture");
// // // // // // // // // //     }
// // // // // // // // // //     setUploading(false);
// // // // // // // // // //   };

// // // // // // // // // //   return (
// // // // // // // // // //     <div className="p-8">
// // // // // // // // // //       <h2 className="text-3xl font-semibold mb-6">Your Profile</h2>

// // // // // // // // // //       {/* Profile Picture */}
// // // // // // // // // //       <div className="mb-6 flex items-center gap-4">
// // // // // // // // // //         {profileData.photoURL ? (
// // // // // // // // // //           <img
// // // // // // // // // //             src={profileData.photoURL}
// // // // // // // // // //             alt="Profile"
// // // // // // // // // //             className="w-24 h-24 rounded-full object-cover border"
// // // // // // // // // //           />
// // // // // // // // // //         ) : (
// // // // // // // // // //           <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
// // // // // // // // // //             No Photo
// // // // // // // // // //           </div>
// // // // // // // // // //         )}

// // // // // // // // // //         <div>
// // // // // // // // // //           <label className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded">
// // // // // // // // // //             {uploading ? "Uploading..." : "Change Photo"}
// // // // // // // // // //             <input
// // // // // // // // // //               type="file"
// // // // // // // // // //               accept="image/*"
// // // // // // // // // //               onChange={handleFileChange}
// // // // // // // // // //               className="hidden"
// // // // // // // // // //             />
// // // // // // // // // //           </label>
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>

// // // // // // // // // //       {/* User Info */}
// // // // // // // // // //       <div className="bg-white p-6 rounded-xl shadow-md">
// // // // // // // // // //         <p>
// // // // // // // // // //           <strong>Name:</strong> {profileData.displayName}
// // // // // // // // // //         </p>
// // // // // // // // // //         <p>
// // // // // // // // // //           <strong>Email:</strong> {profileData.email}
// // // // // // // // // //         </p>
// // // // // // // // // //       </div>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // }
// // // // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // // // // import { db, storage, auth, signInWithGoogle, logOut } from "../firebase/config";
// // // // // // // // // import { db, storage, auth, signInWithGoogle, logOut } from "../firebase/config";

// // // // // // // // // import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// // // // // // // // // import { doc, getDoc, setDoc } from "firebase/firestore";

// // // // // // // // // export default function ProfilePage({ user }) {
// // // // // // // // //   const [profileData, setProfileData] = useState({
// // // // // // // // //     displayName: user?.displayName || "",
// // // // // // // // //     email: user?.email || "",
// // // // // // // // //     photoURL: "",
// // // // // // // // //   });
// // // // // // // // //   const [uploading, setUploading] = useState(false);

// // // // // // // // //   // Load Firestore data
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     if (!user) return;

// // // // // // // // //     const loadProfile = async () => {
// // // // // // // // //       const docRef = doc(db, "users", user.uid);
// // // // // // // // //       const docSnap = await getDoc(docRef);
// // // // // // // // //       if (docSnap.exists()) {
// // // // // // // // //         setProfileData((prev) => ({ ...prev, ...docSnap.data() }));
// // // // // // // // //       } else {
// // // // // // // // //         setDoc(docRef, {
// // // // // // // // //           displayName: user.displayName,
// // // // // // // // //           email: user.email,
// // // // // // // // //           photoURL: user.photoURL || "",
// // // // // // // // //         });
// // // // // // // // //       }
// // // // // // // // //     };

// // // // // // // // //     loadProfile();
// // // // // // // // //   }, [user]);

// // // // // // // // //   // Handle profile picture upload
// // // // // // // // //   const handleFileChange = async (e) => {
// // // // // // // // //     if (!user) return alert("Please sign in first!");
// // // // // // // // //     const file = e.target.files[0];
// // // // // // // // //     if (!file) return;

// // // // // // // // //     setUploading(true);

// // // // // // // // //     try {
// // // // // // // // //       const storageRef = ref(storage, `users/${user.uid}/profile.jpg`);
// // // // // // // // //       await uploadBytes(storageRef, file);
// // // // // // // // //       const url = await getDownloadURL(storageRef);

// // // // // // // // //       await setDoc(doc(db, "users", user.uid), { photoURL: url }, { merge: true });

// // // // // // // // //       setProfileData((prev) => ({ ...prev, photoURL: url }));
// // // // // // // // //       alert("Profile picture updated successfully!");
// // // // // // // // //     } catch (err) {
// // // // // // // // //       console.error(err);
// // // // // // // // //       alert("Failed to upload profile picture");
// // // // // // // // //     }

// // // // // // // // //     setUploading(false);
// // // // // // // // //   };

// // // // // // // // //   // Fallback avatar
// // // // // // // // //   const avatarUrl =
// // // // // // // // //     profileData.photoURL ||
// // // // // // // // //     `https://ui-avatars.com/api/?name=${encodeURIComponent(
// // // // // // // // //       profileData.displayName || "User"
// // // // // // // // //     )}&rounded=true&background=E0F2FE&color=0284C7`;

// // // // // // // // //   return (
// // // // // // // // //     <div className="p-8">
// // // // // // // // //       <h2 className="text-3xl font-semibold mb-6">Your Profile</h2>

// // // // // // // // //       {/* If not signed in */}
// // // // // // // // //       {!user && (
// // // // // // // // //         <div className="bg-white p-6 rounded-xl shadow-md text-center">
// // // // // // // // //           <p className="mb-4 text-gray-600 text-lg">You are not signed in.</p>
// // // // // // // // //           <button
// // // // // // // // //             onClick={signInWithGoogle}
// // // // // // // // //             className="px-4 py-2 bg-blue-600 text-white rounded-lg"
// // // // // // // // //           >
// // // // // // // // //             Sign In with Google
// // // // // // // // //           </button>
// // // // // // // // //         </div>
// // // // // // // // //       )}

// // // // // // // // //       {/* If user is signed in */}
// // // // // // // // //       {user && (
// // // // // // // // //         <>
// // // // // // // // //           {/* Profile Picture */}
// // // // // // // // //           <div className="mb-6 flex items-center gap-4">
// // // // // // // // //             <img
// // // // // // // // //               src={avatarUrl}
// // // // // // // // //               alt="Profile"
// // // // // // // // //               className="w-24 h-24 rounded-full object-cover border"
// // // // // // // // //             />

// // // // // // // // //             <div>
// // // // // // // // //               <label className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded">
// // // // // // // // //                 {uploading ? "Uploading..." : "Change Photo"}
// // // // // // // // //                 <input
// // // // // // // // //                   type="file"
// // // // // // // // //                   accept="image/*"
// // // // // // // // //                   onChange={handleFileChange}
// // // // // // // // //                   className="hidden"
// // // // // // // // //                 />
// // // // // // // // //               </label>
// // // // // // // // //             </div>
// // // // // // // // //           </div>

// // // // // // // // //           {/* User Info */}
// // // // // // // // //           <div className="bg-white p-6 rounded-xl shadow-md space-y-3">
// // // // // // // // //             <p>
// // // // // // // // //               <strong>Name:</strong> {profileData.displayName}
// // // // // // // // //             </p>
// // // // // // // // //             <p>
// // // // // // // // //               <strong>Email:</strong> {profileData.email}
// // // // // // // // //             </p>
// // // // // // // // //           </div>

// // // // // // // // //           {/* Sign Out Button */}
// // // // // // // // //           <div className="mt-6">
// // // // // // // // //             <button
// // // // // // // // //               onClick={logOut}
// // // // // // // // //               className="px-4 py-2 bg-red-500 text-white rounded-lg"
// // // // // // // // //             >
// // // // // // // // //               Sign Out
// // // // // // // // //             </button>
// // // // // // // // //           </div>
// // // // // // // // //         </>
// // // // // // // // //       )}
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }
// // // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // // import {
// // // // // // // //   db,
// // // // // // // //   storage,
// // // // // // // //   auth,
// // // // // // // //   signInWithGoogle,
// // // // // // // //   logOut
// // // // // // // // } from "../firebase/config";

// // // // // // // // import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// // // // // // // // import { doc, getDoc, setDoc } from "firebase/firestore";
// // // // // // // // import { getRedirectResult } from "firebase/auth";

// // // // // // // // export default function ProfilePage({ user, setUser }) {
// // // // // // // //   const [profileData, setProfileData] = useState({
// // // // // // // //     displayName: user?.displayName || "",
// // // // // // // //     email: user?.email || "",
// // // // // // // //     photoURL: "",
// // // // // // // //   });
// // // // // // // //   const [uploading, setUploading] = useState(false);

// // // // // // // //   // --------------------------------------------------------
// // // // // // // //   // 🔥 FIX: Handle Google Redirect Login (for mobile)
// // // // // // // //   // --------------------------------------------------------
// // // // // // // //   useEffect(() => {
// // // // // // // //     getRedirectResult(auth)
// // // // // // // //       .then((result) => {
// // // // // // // //         if (result?.user) {
// // // // // // // //           console.log("Mobile Google Login Success:", result.user);
// // // // // // // //           setUser(result.user);
// // // // // // // //         }
// // // // // // // //       })
// // // // // // // //       .catch(console.error);
// // // // // // // //   }, []);
// // // // // // // //   // --------------------------------------------------------

// // // // // // // //   // Load Firestore data
// // // // // // // //   useEffect(() => {
// // // // // // // //     if (!user) return;

// // // // // // // //     const loadProfile = async () => {
// // // // // // // //       const docRef = doc(db, "users", user.uid);
// // // // // // // //       const docSnap = await getDoc(docRef);

// // // // // // // //       if (docSnap.exists()) {
// // // // // // // //         setProfileData((prev) => ({ ...prev, ...docSnap.data() }));
// // // // // // // //       } else {
// // // // // // // //         await setDoc(docRef, {
// // // // // // // //           displayName: user.displayName,
// // // // // // // //           email: user.email,
// // // // // // // //           photoURL: user.photoURL || "",
// // // // // // // //         });
// // // // // // // //       }
// // // // // // // //     };

// // // // // // // //     loadProfile();
// // // // // // // //   }, [user]);

// // // // // // // //   // Handle profile picture upload
// // // // // // // //   const handleFileChange = async (e) => {
// // // // // // // //     if (!user) return alert("Please sign in first!");
// // // // // // // //     const file = e.target.files[0];
// // // // // // // //     if (!file) return;

// // // // // // // //     setUploading(true);

// // // // // // // //     try {
// // // // // // // //       const storageRef = ref(storage, `users/${user.uid}/profile.jpg`);
// // // // // // // //       await uploadBytes(storageRef, file);
// // // // // // // //       const url = await getDownloadURL(storageRef);

// // // // // // // //       await setDoc(
// // // // // // // //         doc(db, "users", user.uid),
// // // // // // // //         { photoURL: url },
// // // // // // // //         { merge: true }
// // // // // // // //       );

// // // // // // // //       setProfileData((prev) => ({ ...prev, photoURL: url }));
// // // // // // // //       alert("Profile picture updated successfully!");
// // // // // // // //     } catch (err) {
// // // // // // // //       console.error(err);
// // // // // // // //       alert("Failed to upload profile picture");
// // // // // // // //     }

// // // // // // // //     setUploading(false);
// // // // // // // //   };

// // // // // // // //   // Fallback avatar
// // // // // // // //   const avatarUrl =
// // // // // // // //     profileData.photoURL ||
// // // // // // // //     `https://ui-avatars.com/api/?name=${encodeURIComponent(
// // // // // // // //       profileData.displayName || "User"
// // // // // // // //     )}&rounded=true&background=E0F2FE&color=0284C7`;

// // // // // // // //   return (
// // // // // // // //     <div className="p-8">
// // // // // // // //       <h2 className="text-3xl font-semibold mb-6">Your Profile</h2>

// // // // // // // //       {/* If not signed in */}
// // // // // // // //       {!user && (
// // // // // // // //         <div className="bg-white p-6 rounded-xl shadow-md text-center">
// // // // // // // //           <p className="mb-4 text-gray-600 text-lg">You are not signed in.</p>
// // // // // // // //           <button
// // // // // // // //             onClick={signInWithGoogle}
// // // // // // // //             className="px-4 py-2 bg-blue-600 text-white rounded-lg"
// // // // // // // //           >
// // // // // // // //             Sign In with Google
// // // // // // // //           </button>
// // // // // // // //         </div>
// // // // // // // //       )}

// // // // // // // //       {/* If user is signed in */}
// // // // // // // //       {user && (
// // // // // // // //         <>
// // // // // // // //           {/* Profile Picture */}
// // // // // // // //           <div className="mb-6 flex items-center gap-4">
// // // // // // // //             <img
// // // // // // // //               src={avatarUrl}
// // // // // // // //               alt="Profile"
// // // // // // // //               className="w-24 h-24 rounded-full object-cover border"
// // // // // // // //             />

// // // // // // // //             <div>
// // // // // // // //               <label className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded">
// // // // // // // //                 {uploading ? "Uploading..." : "Change Photo"}
// // // // // // // //                 <input
// // // // // // // //                   type="file"
// // // // // // // //                   accept="image/*"
// // // // // // // //                   onChange={handleFileChange}
// // // // // // // //                   className="hidden"
// // // // // // // //                 />
// // // // // // // //               </label>
// // // // // // // //             </div>
// // // // // // // //           </div>

// // // // // // // //           {/* User Info */}
// // // // // // // //           <div className="bg-white p-6 rounded-xl shadow-md space-y-3">
// // // // // // // //             <p>
// // // // // // // //               <strong>Name:</strong> {profileData.displayName}
// // // // // // // //             </p>
// // // // // // // //             <p>
// // // // // // // //               <strong>Email:</strong> {profileData.email}
// // // // // // // //             </p>
// // // // // // // //           </div>

// // // // // // // //           {/* Sign Out Button */}
// // // // // // // //           <div className="mt-6">
// // // // // // // //             <button
// // // // // // // //               onClick={logOut}
// // // // // // // //               className="px-4 py-2 bg-red-500 text-white rounded-lg"
// // // // // // // //             >
// // // // // // // //               Sign Out
// // // // // // // //             </button>
// // // // // // // //           </div>
// // // // // // // //         </>
// // // // // // // //       )}
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }
// // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // import { db, storage, logOut } from "../firebase/config";
// // // // // // // import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// // // // // // // import { doc, getDoc, setDoc } from "firebase/firestore";

// // // // // // // export default function ProfilePage({ user }) {
// // // // // // //   const [profileData, setProfileData] = useState({
// // // // // // //     displayName: "",
// // // // // // //     email: "",
// // // // // // //     photoURL: "",
// // // // // // //   });
// // // // // // //   const [uploading, setUploading] = useState(false);

// // // // // // //   /* ================= LOAD PROFILE ================= */
// // // // // // //   useEffect(() => {
// // // // // // //     if (!user) return;

// // // // // // //     const loadProfile = async () => {
// // // // // // //       const docRef = doc(db, "users", user.uid);
// // // // // // //       const snap = await getDoc(docRef);

// // // // // // //       if (snap.exists()) {
// // // // // // //         setProfileData(snap.data());
// // // // // // //       } else {
// // // // // // //         const data = {
// // // // // // //           displayName: user.email.split("@")[0],
// // // // // // //           email: user.email,
// // // // // // //           photoURL: "",
// // // // // // //         };
// // // // // // //         await setDoc(docRef, data);
// // // // // // //         setProfileData(data);
// // // // // // //       }
// // // // // // //     };

// // // // // // //     loadProfile();
// // // // // // //   }, [user]);

// // // // // // //   /* ================= UPLOAD PHOTO ================= */
// // // // // // //   const handleFileChange = async (e) => {
// // // // // // //     const file = e.target.files[0];
// // // // // // //     if (!file) return;

// // // // // // //     setUploading(true);

// // // // // // //     const storageRef = ref(storage, `users/${user.uid}/profile.jpg`);
// // // // // // //     await uploadBytes(storageRef, file);
// // // // // // //     const url = await getDownloadURL(storageRef);

// // // // // // //     await setDoc(
// // // // // // //       doc(db, "users", user.uid),
// // // // // // //       { photoURL: url },
// // // // // // //       { merge: true }
// // // // // // //     );

// // // // // // //     setProfileData((p) => ({ ...p, photoURL: url }));
// // // // // // //     setUploading(false);
// // // // // // //   };

// // // // // // //   const avatar =
// // // // // // //     profileData.photoURL ||
// // // // // // //     `https://ui-avatars.com/api/?name=${profileData.displayName}&rounded=true`;

// // // // // // //   /* ================= UI ================= */
// // // // // // //   if (!user) {
// // // // // // //     return (
// // // // // // //       <div className="p-8 text-center">
// // // // // // //         <h2 className="text-xl">Please log in to view profile</h2>
// // // // // // //       </div>
// // // // // // //     );
// // // // // // //   }

// // // // // // //   return (
// // // // // // //     <div className="p-8 max-w-xl mx-auto">
// // // // // // //       <h2 className="text-3xl font-semibold mb-6">Your Profile</h2>

// // // // // // //       <div className="flex items-center gap-4 mb-6">
// // // // // // //         <img
// // // // // // //           src={avatar}
// // // // // // //           alt="Profile"
// // // // // // //           className="w-24 h-24 rounded-full border"
// // // // // // //         />

// // // // // // //         <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded">
// // // // // // //           {uploading ? "Uploading..." : "Change Photo"}
// // // // // // //           <input
// // // // // // //             type="file"
// // // // // // //             hidden
// // // // // // //             accept="image/*"
// // // // // // //             onChange={handleFileChange}
// // // // // // //           />
// // // // // // //         </label>
// // // // // // //       </div>

// // // // // // //       <div className="bg-white shadow rounded p-4 space-y-2">
// // // // // // //         <p><strong>Name:</strong> {profileData.displayName}</p>
// // // // // // //         <p><strong>Email:</strong> {profileData.email}</p>
// // // // // // //       </div>

// // // // // // //       <button
// // // // // // //         onClick={logOut}
// // // // // // //         className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
// // // // // // //       >
// // // // // // //         Sign Out
// // // // // // //       </button>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }
// // // // // // import React, { useEffect, useState } from "react";
// // // // // // import { db, storage, logOut } from "../firebase/config";
// // // // // // import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// // // // // // import { doc, getDoc, setDoc } from "firebase/firestore";

// // // // // // export default function ProfilePage({ user }) {
// // // // // //   const [profileData, setProfileData] = useState({
// // // // // //     displayName: "",
// // // // // //     email: "",
// // // // // //     photoURL: "",
// // // // // //   });
// // // // // //   const [uploading, setUploading] = useState(false);

// // // // // //   useEffect(() => {
// // // // // //     if (!user) return;

// // // // // //     const loadProfile = async () => {
// // // // // //       const docRef = doc(db, "users", user.uid);
// // // // // //       const snap = await getDoc(docRef);

// // // // // //       if (snap.exists()) {
// // // // // //         setProfileData(snap.data());
// // // // // //       } else {
// // // // // //         const data = {
// // // // // //           displayName: user.email.split("@")[0],
// // // // // //           email: user.email,
// // // // // //           photoURL: "",
// // // // // //         };
// // // // // //         await setDoc(docRef, data);
// // // // // //         setProfileData(data);
// // // // // //       }
// // // // // //     };

// // // // // //     loadProfile();
// // // // // //   }, [user]);

// // // // // //   const handleFileChange = async (e) => {
// // // // // //     const file = e.target.files[0];
// // // // // //     if (!file) return;
// // // // // //     if (!user) return;

// // // // // //     setUploading(true);

// // // // // //     const storageRef = ref(storage, `users/${user.uid}/profile.jpg`);
// // // // // //     await uploadBytes(storageRef, file);
// // // // // //     const url = await getDownloadURL(storageRef);

// // // // // //     await setDoc(
// // // // // //       doc(db, "users", user.uid),
// // // // // //       { photoURL: url },
// // // // // //       { merge: true }
// // // // // //     );

// // // // // //     setProfileData((p) => ({ ...p, photoURL: url }));
// // // // // //     setUploading(false);
// // // // // //   };

// // // // // //   const avatar =
// // // // // //     profileData.photoURL ||
// // // // // //     `https://ui-avatars.com/api/?name=${profileData.displayName}&rounded=true`;

// // // // // //   if (!user) {
// // // // // //     return (
// // // // // //       <div className="pt-16 pb-24 px-4 text-center">
// // // // // //         <h2 className="text-xl">Please log in to view profile</h2>
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   return (
// // // // // //     <div className="pt-16 pb-24 px-4 md:pt-20 md:pb-10 md:px-8 min-h-screen bg-gray-100">
// // // // // //       <div className="max-w-xl mx-auto">
// // // // // //         <h2 className="text-2xl md:text-3xl font-semibold mb-6">
// // // // // //           Your Profile
// // // // // //         </h2>

// // // // // //         <div className="flex items-center gap-4 mb-6">
// // // // // //           <img
// // // // // //             src={avatar}
// // // // // //             alt="Profile"
// // // // // //             className="w-24 h-24 rounded-full border object-cover"
// // // // // //           />

// // // // // //           <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded text-sm md:text-base">
// // // // // //             {uploading ? "Uploading..." : "Change Photo"}
// // // // // //             <input
// // // // // //               type="file"
// // // // // //               hidden
// // // // // //               accept="image/*"
// // // // // //               onChange={handleFileChange}
// // // // // //             />
// // // // // //           </label>
// // // // // //         </div>

// // // // // //         <div className="bg-white shadow rounded p-4 space-y-2">
// // // // // //           <p>
// // // // // //             <strong>Name:</strong> {profileData.displayName}
// // // // // //           </p>
// // // // // //           <p>
// // // // // //             <strong>Email:</strong> {profileData.email}
// // // // // //           </p>
// // // // // //         </div>

// // // // // //         <button
// // // // // //           onClick={logOut}
// // // // // //           className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
// // // // // //         >
// // // // // //           Sign Out
// // // // // //         </button>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }
// // // // // // src/pages/ProfilePage.jsx - GYM UPGRADE VERSION
// // // // // import React, { useEffect, useState } from "react";
// // // // // import { db, storage, logOut } from "../firebase/config";
// // // // // import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// // // // // import { doc, getDoc, setDoc } from "firebase/firestore";
// // // // // import { getWorkouts } from "../firebase/exercises";
// // // // // import { formatDistanceToNow } from 'date-fns';

// // // // // export default function ProfilePage({ user }) {
// // // // //   const [profileData, setProfileData] = useState({
// // // // //     displayName: "",
// // // // //     email: "",
// // // // //     photoURL: "",
// // // // //     totalWorkouts: 0,
// // // // //     longestStreak: 0,
// // // // //     lastWorkout: null,
// // // // //   });
// // // // //   const [uploading, setUploading] = useState(false);
// // // // //   const [stats, setStats] = useState({ workouts: 0, totalVolume: 0 });

// // // // //   useEffect(() => {
// // // // //     if (!user) return;

// // // // //     const loadProfile = async () => {
// // // // //       const docRef = doc(db, "users", user.uid);
// // // // //       const snap = await getDoc(docRef);

// // // // //       if (snap.exists()) {
// // // // //         setProfileData(snap.data());
// // // // //       } else {
// // // // //         const data = {
// // // // //           displayName: user.email.split("@")[0],
// // // // //           email: user.email,
// // // // //           photoURL: "",
// // // // //           totalWorkouts: 0,
// // // // //           longestStreak: 0,
// // // // //           lastWorkout: null,
// // // // //         };
// // // // //         await setDoc(docRef, data);
// // // // //         setProfileData(data);
// // // // //       }
// // // // //     };

// // // // //     loadStats();
// // // // //     loadProfile();
// // // // //   }, [user]);

// // // // //   const loadStats = async () => {
// // // // //     if (!user) return;
// // // // //     try {
// // // // //       const workouts = await getWorkouts(user.uid);
// // // // //       const totalVolume = workouts.reduce((sum, workout) => {
// // // // //         return sum + workout.exercises.reduce((exSum, ex) => {
// // // // //           return exSum + ex.sets.reduce((setSum, set) => 
// // // // //             setSum + (set.reps * set.weight || 0), 0);
// // // // //         }, 0);
// // // // //       }, 0);

// // // // //       setStats({
// // // // //         workouts: workouts.length,
// // // // //         totalVolume: totalVolume.toFixed(0),
// // // // //         daysSinceLast: workouts.length > 0 ? formatDistanceToNow(new Date(workouts[0].date)) : null
// // // // //       });
// // // // //     } catch (error) {
// // // // //       console.error("Error loading stats:", error);
// // // // //     }
// // // // //   };

// // // // //   const handleFileChange = async (e) => {
// // // // //     const file = e.target.files[0];
// // // // //     if (!file) return;
// // // // //     if (!user) return;

// // // // //     setUploading(true);

// // // // //     try {
// // // // //       const storageRef = ref(storage, `users/${user.uid}/profile.jpg`);
// // // // //       await uploadBytes(storageRef, file);
// // // // //       const url = await getDownloadURL(storageRef);

// // // // //       await setDoc(
// // // // //         doc(db, "users", user.uid),
// // // // //         { photoURL: url },
// // // // //         { merge: true }
// // // // //       );

// // // // //       setProfileData((p) => ({ ...p, photoURL: url }));
// // // // //     } catch (error) {
// // // // //       alert("Upload failed");
// // // // //       console.error(error);
// // // // //     }
// // // // //     setUploading(false);
// // // // //   };

// // // // //   const avatar = profileData.photoURL || 
// // // // //     `https://ui-avatars.com/api/?name=${profileData.displayName}&background=4F46E5&color=fff&rounded=true&size=128&bold=true`;

// // // // //   if (!user) {
// // // // //     return (
// // // // //       <div className="pt-16 pb-24 px-4 text-center">
// // // // //         <h2 className="text-xl">Please log in to view profile</h2>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <div className="pt-16 pb-24 px-4 md:pt-20 md:pb-10 md:px-8 min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
// // // // //       <div className="max-w-4xl mx-auto">
// // // // //         {/* HEADER */}
// // // // //         <div className="text-center mb-12">
// // // // //           <div className="relative inline-block mb-6">
// // // // //             <img
// // // // //               src={avatar}
// // // // //               alt="Profile"
// // // // //               className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-2xl object-cover mx-auto"
// // // // //             />
// // // // //             <label className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-full shadow-lg cursor-pointer hover:shadow-xl transition-all">
// // // // //               {uploading ? "⏳" : "📸"}
// // // // //               <input
// // // // //                 type="file"
// // // // //                 hidden
// // // // //                 accept="image/*"
// // // // //                 onChange={handleFileChange}
// // // // //               />
// // // // //             </label>
// // // // //           </div>
// // // // //           <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
// // // // //             {profileData.displayName}
// // // // //           </h1>
// // // // //           <p className="text-xl text-gray-600 mb-1">{profileData.email}</p>
// // // // //           <div className="flex justify-center gap-6 text-sm text-gray-500 flex-wrap">
// // // // //             <span>Joined {formatDistanceToNow(new Date(user.metadata.creationTime))}</span>
// // // // //             <span>•</span>
// // // // //             <span>{stats.daysSinceLast ? `Last workout ${stats.daysSinceLast} ago` : 'No workouts yet'}</span>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* STATS CARDS */}
// // // // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
// // // // //           <div className="bg-white p-8 rounded-3xl shadow-xl border border-blue-100 hover:shadow-2xl transition-all text-center">
// // // // //             <div className="text-4xl font-black text-blue-600 mb-2">{stats.workouts}</div>
// // // // //             <div className="text-gray-700 font-semibold">Total Workouts</div>
// // // // //           </div>
// // // // //           <div className="bg-white p-8 rounded-3xl shadow-xl border border-green-100 hover:shadow-2xl transition-all text-center">
// // // // //             <div className="text-4xl font-black text-green-600 mb-2">{stats.totalVolume}kg</div>
// // // // //             <div className="text-gray-700 font-semibold">Total Volume Lifted</div>
// // // // //           </div>
// // // // //           <div className="bg-white p-8 rounded-3xl shadow-xl border border-purple-100 hover:shadow-2xl transition-all text-center">
// // // // //             <div className="text-4xl font-black text-purple-600 mb-2">
// // // // //               {profileData.longestStreak || 0}
// // // // //             </div>
// // // // //             <div className="text-gray-700 font-semibold">Longest Streak</div>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* BASIC INFO */}
// // // // //         <div className="bg-white shadow-xl rounded-3xl p-8 mb-8 border border-gray-100">
// // // // //           <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">Account Info</h3>
// // // // //           <div className="space-y-4 text-lg">
// // // // //             <div>
// // // // //               <span className="font-semibold text-gray-700 w-24 inline-block">Name:</span>
// // // // //               <span className="bg-gray-50 px-4 py-2 rounded-xl">{profileData.displayName}</span>
// // // // //             </div>
// // // // //             <div>
// // // // //               <span className="font-semibold text-gray-700 w-24 inline-block">Email:</span>
// // // // //               <span className="bg-gray-50 px-4 py-2 rounded-xl">{profileData.email}</span>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* ACTIONS */}
// // // // //         <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200">
// // // // //           <button
// // // // //             onClick={logOut}
// // // // //             className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:from-red-600 hover:to-red-700 transition-all"
// // // // //           >
// // // // //             🚪 Sign Out
// // // // //           </button>
// // // // //           <button
// // // // //             onClick={() => window.open('https://app.fitnesstracker.com/privacy', '_blank')}
// // // // //             className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:from-gray-600 hover:to-gray-700 transition-all"
// // // // //           >
// // // // //             📄 Privacy Policy
// // // // //           </button>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }
// // // // // src/pages/ProfilePage.jsx - FULL WORKING VERSION (copy entire file)
// // // // import React, { useEffect, useState } from "react";
// // // // import { db, storage, logOut } from "../firebase/config";
// // // // import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// // // // import { doc, getDoc, setDoc } from "firebase/firestore";
// // // // import { getWorkouts } from "../firebase/exercises";
// // // // import { formatDistanceToNow } from 'date-fns';

// // // // export default function ProfilePage({ user }) {
// // // //   const [profileData, setProfileData] = useState({
// // // //     displayName: "",
// // // //     email: "",
// // // //     photoURL: "",
// // // //     totalWorkouts: 0,
// // // //     longestStreak: 0,
// // // //     lastWorkout: null,
// // // //   });
// // // //   const [uploading, setUploading] = useState(false);
// // // //   const [stats, setStats] = useState({ workouts: 0, totalVolume: 0 });

// // // //   useEffect(() => {
// // // //     if (!user) return;

// // // //     const loadProfile = async () => {
// // // //       try {
// // // //         const docRef = doc(db, "users", user.uid);
// // // //         const snap = await getDoc(docRef);

// // // //         if (snap.exists()) {
// // // //           setProfileData(snap.data());
// // // //         } else {
// // // //           const data = {
// // // //             displayName: user.email.split("@")[0],
// // // //             email: user.email,
// // // //             photoURL: "",
// // // //             totalWorkouts: 0,
// // // //             longestStreak: 0,
// // // //             lastWorkout: null,
// // // //           };
// // // //           await setDoc(docRef, data);
// // // //           setProfileData(data);
// // // //         }
// // // //       } catch (error) {
// // // //         console.error("Error loading profile:", error);
// // // //       }
// // // //     };

// // // //     loadStats();
// // // //     loadProfile();
// // // //   }, [user]);

// // // //   const loadStats = async () => {
// // // //     if (!user) return;
// // // //     try {
// // // //       const workouts = await getWorkouts(user.uid);
// // // //       const totalVolume = workouts.reduce((sum, workout) => {
// // // //         return sum + workout.exercises.reduce((exSum, ex) => {
// // // //           return exSum + ex.sets.reduce((setSum, set) => 
// // // //             setSum + (set.reps * set.weight || 0), 0);
// // // //         }, 0);
// // // //       }, 0);

// // // //       setStats({
// // // //         workouts: workouts.length,
// // // //         totalVolume: Math.round(totalVolume),
// // // //         daysSinceLast: workouts.length > 0 ? formatDistanceToNow(new Date(workouts[0].date)) : null
// // // //       });
// // // //     } catch (error) {
// // // //       console.error("Error loading stats:", error);
// // // //     }
// // // //   };

// // // //   const handleFileChange = async (e) => {
// // // //     const file = e.target.files[0];
// // // //     if (!file) return;
// // // //     if (!user) return;

// // // //     setUploading(true);

// // // //     try {
// // // //       const storageRef = ref(storage, `users/${user.uid}/profile.jpg`);
// // // //       await uploadBytes(storageRef, file);
// // // //       const url = await getDownloadURL(storageRef);

// // // //       await setDoc(
// // // //         doc(db, "users", user.uid),
// // // //         { photoURL: url },
// // // //         { merge: true }
// // // //       );

// // // //       setProfileData((p) => ({ ...p, photoURL: url }));
// // // //       alert("✅ Profile photo updated!");
// // // //     } catch (error) {
// // // //       alert("❌ Upload failed. Please try again.");
// // // //       console.error("Upload error:", error);
// // // //     }
// // // //     setUploading(false);
// // // //   };

// // // //   const avatar = profileData.photoURL || 
// // // //     `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData.displayName)}&background=4F46E5&color=fff&rounded=true&size=128&bold=true&font-size=0.6`;

// // // //   if (!user) {
// // // //     return (
// // // //       <div className="pt-16 pb-24 px-4 text-center">
// // // //         <h2 className="text-xl">Please log in to view profile</h2>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="pt-16 pb-24 px-4 md:pt-20 md:pb-10 md:px-8 min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
// // // //       <div className="max-w-4xl mx-auto">
// // // //         {/* HEADER */}
// // // //         <div className="text-center mb-12">
// // // //           <div className="relative inline-block mb-6">
// // // //             <img
// // // //               src={avatar}
// // // //               alt="Profile"
// // // //               className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-2xl object-cover mx-auto"
// // // //               onError={(e) => {
// // // //                 e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData.displayName)}&background=6B7280&color=fff&rounded=true&size=128&bold=true`;
// // // //               }}
// // // //             />
// // // //             <label className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-full shadow-lg cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-200 hover:from-blue-600 hover:to-blue-700">
// // // //               {uploading ? "⏳" : "📸"}
// // // //               <input
// // // //                 type="file"
// // // //                 hidden
// // // //                 accept="image/*"
// // // //                 onChange={handleFileChange}
// // // //               />
// // // //             </label>
// // // //           </div>
// // // //           <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent mb-2">
// // // //             {profileData.displayName}
// // // //           </h1>
// // // //           <p className="text-xl text-gray-600 mb-1">{profileData.email}</p>
// // // //           <div className="flex justify-center gap-6 text-sm text-gray-500 flex-wrap">
// // // //             <span>Joined {formatDistanceToNow(new Date(user.metadata.creationTime))} ago</span>
// // // //             <span>•</span>
// // // //             <span>{stats.daysSinceLast ? `Last workout ${stats.daysSinceLast} ago` : 'No workouts yet'}</span>
// // // //           </div>
// // // //         </div>

// // // //         {/* STATS CARDS */}
// // // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
// // // //           <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all text-center group hover:scale-[1.02]">
// // // //             <div className="text-4xl md:text-5xl font-black mb-2">{stats.workouts}</div>
// // // //             <div className="text-blue-100 font-semibold text-lg">Total Workouts</div>
// // // //           </div>
// // // //           <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all text-center group hover:scale-[1.02]">
// // // //             <div className="text-4xl md:text-5xl font-black mb-2">{stats.totalVolume}kg</div>
// // // //             <div className="text-green-100 font-semibold text-lg">Total Volume Lifted</div>
// // // //           </div>
// // // //           <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all text-center group hover:scale-[1.02]">
// // // //             <div className="text-4xl md:text-5xl font-black mb-2">
// // // //               {profileData.longestStreak || 0}
// // // //             </div>
// // // //             <div className="text-purple-100 font-semibold text-lg">Longest Streak</div>
// // // //           </div>
// // // //         </div>

// // // //         {/* BASIC INFO */}
// // // //         <div className="bg-white shadow-2xl rounded-3xl p-8 mb-12 border border-gray-100">
// // // //           <h3 className="text-3xl font-bold mb-8 text-gray-800 border-b-2 border-blue-100 pb-4">
// // // //             Account Information
// // // //           </h3>
// // // //           <div className="grid md:grid-cols-2 gap-6 text-lg">
// // // //             <div className="space-y-3">
// // // //               <div>
// // // //                 <span className="font-semibold text-gray-700 w-24 inline-block">Name:</span>
// // // //                 <span className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-3 rounded-2xl border border-blue-100 inline-block ml-4 shadow-sm">
// // // //                   {profileData.displayName}
// // // //                 </span>
// // // //               </div>
// // // //               <div>
// // // //                 <span className="font-semibold text-gray-700 w-24 inline-block">Email:</span>
// // // //                 <span className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-3 rounded-2xl border border-green-100 inline-block ml-4 shadow-sm">
// // // //                   {profileData.email}
// // // //                 </span>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         {/* ACTIONS */}
// // // //         <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t-2 border-gray-200 bg-white rounded-3xl p-8 shadow-xl">
// // // //           <button
// // // //             onClick={logOut}
// // // //             className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:from-red-600 hover:to-red-700 transition-all duration-200 flex items-center justify-center gap-2"
// // // //           >
// // // //             🚪 Sign Out
// // // //           </button>
// // // //           <button
// // // //             onClick={() => window.open('https://app.fitnesstracker.com/privacy', '_blank')}
// // // //             className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:from-gray-600 hover:to-gray-700 transition-all duration-200 flex items-center justify-center gap-2"
// // // //           >
// // // //             📄 Privacy Policy
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }
// // // // src/pages/ProfilePage.jsx - FIRESTORE PHOTOS (FREE)
// // // import React, { useEffect, useState } from "react";
// // // import { db, logOut } from "../firebase/config";
// // // import { doc, getDoc, setDoc, arrayUnion, writeBatch } from "firebase/firestore";
// // // import { getWorkouts } from "../firebase/exercises";
// // // import { formatDistanceToNow } from 'date-fns';

// // // export default function ProfilePage({ user }) {
// // //   const [profileData, setProfileData] = useState({
// // //     displayName: "",
// // //     email: "",
// // //     photoURL: "",
// // //     totalWorkouts: 0,
// // //   });
// // //   const [stats, setStats] = useState({ workouts: 0, totalVolume: 0 });
// // //   const [photoPreview, setPhotoPreview] = useState(null);

// // //   useEffect(() => {
// // //     if (!user) return;
// // //     loadProfile();
// // //     loadStats();
// // //   }, [user]);

// // //   const loadProfile = async () => {
// // //     try {
// // //       const docRef = doc(db, "users", user.uid);
// // //       const snap = await getDoc(docRef);

// // //       if (snap.exists()) {
// // //         setProfileData(snap.data());
// // //       } else {
// // //         const data = {
// // //           displayName: user.email.split("@")[0],
// // //           email: user.email,
// // //           photoURL: "",
// // //           totalWorkouts: 0,
// // //         };
// // //         await setDoc(docRef, data);
// // //         setProfileData(data);
// // //       }
// // //     } catch (error) {
// // //       console.error("Error loading profile:", error);
// // //     }
// // //   };

// // //   const loadStats = async () => {
// // //     if (!user) return;
// // //     try {
// // //       const workouts = await getWorkouts(user.uid);
// // //       const totalVolume = workouts.reduce((sum, workout) => {
// // //         return sum + workout.exercises.reduce((exSum, ex) => {
// // //           return exSum + ex.sets.reduce((setSum, set) => 
// // //             setSum + (set.reps * set.weight || 0), 0);
// // //         }, 0);
// // //       }, 0);

// // //       setStats({
// // //         workouts: workouts.length,
// // //         totalVolume: Math.round(totalVolume),
// // //       });
// // //     } catch (error) {
// // //       console.error("Error loading stats:", error);
// // //     }
// // //   };

// // //   const handlePhotoChange = async (e) => {
// // //     const file = e.target.files[0];
// // //     if (!file) return;

// // //     // Show preview
// // //     const reader = new FileReader();
// // //     reader.onload = (e) => setPhotoPreview(e.target.result);
// // //     reader.readAsDataURL(file);

// // //     // Upload to Firestore (base64)
// // //     try {
// // //       const base64 = await new Promise((resolve) => {
// // //         const reader = new FileReader();
// // //         reader.onloadend = () => resolve(reader.result);
// // //         reader.readAsDataURL(file);
// // //       });

// // //       await setDoc(doc(db, "users", user.uid), {
// // //         photoURL: base64,
// // //       }, { merge: true });

// // //       setProfileData(prev => ({ ...prev, photoURL: base64 }));
// // //       alert("✅ Profile photo updated!");
// // //     } catch (error) {
// // //       alert("❌ Upload failed");
// // //       console.error(error);
// // //     }
// // //   };

// // //   const avatar = profileData.photoURL || 
// // //     `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData.displayName || user?.email?.split("@")[0])}&background=4F46E5&color=fff&rounded=true&size=128&bold=true`;

// // //   if (!user) {
// // //     return (
// // //       <div className="pt-16 pb-24 px-4 text-center">
// // //         <h2 className="text-xl">Please log in to view profile</h2>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="pt-16 pb-24 px-4 md:pt-20 md:pb-10 md:px-8 min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
// // //       <div className="max-w-4xl mx-auto">
// // //         {/* HEADER */}
// // //         <div className="text-center mb-12">
// // //           <div className="relative inline-block mb-6">
// // //             <img
// // //               src={avatar}
// // //               alt="Profile"
// // //               className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-2xl object-cover mx-auto"
// // //             />
// // //             <label className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-full shadow-lg cursor-pointer hover:shadow-xl hover:scale-105 transition-all">
// // //               📸
// // //               <input
// // //                 type="file"
// // //                 hidden
// // //                 accept="image/*"
// // //                 onChange={handlePhotoChange}
// // //               />
// // //             </label>
// // //           </div>
// // //           <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
// // //             {profileData.displayName}
// // //           </h1>
// // //           <p className="text-xl text-gray-600 mb-1">{profileData.email}</p>
// // //         </div>

// // //         {/* STATS CARDS */}
// // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
// // //           <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all text-center">
// // //             <div className="text-4xl md:text-5xl font-black mb-2">{stats.workouts}</div>
// // //             <div className="text-blue-100 font-semibold text-lg">Total Workouts</div>
// // //           </div>
// // //           <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all text-center">
// // //             <div className="text-4xl md:text-5xl font-black mb-2">{stats.totalVolume}kg</div>
// // //             <div className="text-green-100 font-semibold text-lg">Total Volume</div>
// // //           </div>
// // //           <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all text-center">
// // //             <div className="text-4xl md:text-5xl font-black mb-2">{stats.workouts}</div>
// // //             <div className="text-purple-100 font-semibold text-lg">Sessions</div>
// // //           </div>
// // //         </div>

// // //         {/* INFO */}
// // //         <div className="bg-white shadow-2xl rounded-3xl p-8 mb-12">
// // //           <h3 className="text-3xl font-bold mb-8 text-gray-800 border-b-2 border-blue-100 pb-4">
// // //             Account Information
// // //           </h3>
// // //           <div className="grid md:grid-cols-2 gap-6 text-lg">
// // //             <div>
// // //               <span className="font-semibold text-gray-700 w-24 inline-block">Name:</span>
// // //               <span className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-3 rounded-2xl border border-blue-100 inline-block ml-4 shadow-sm">
// // //                 {profileData.displayName}
// // //               </span>
// // //             </div>
// // //             <div>
// // //               <span className="font-semibold text-gray-700 w-24 inline-block">Email:</span>
// // //               <span className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-3 rounded-2xl border border-green-100 inline-block ml-4 shadow-sm">
// // //                 {profileData.email}
// // //               </span>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* ACTIONS */}
// // //         <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t-2 border-gray-200 bg-white rounded-3xl p-8 shadow-xl">
// // //           <button
// // //             onClick={logOut}
// // //             className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:from-red-600 hover:to-red-700 transition-all"
// // //           >
// // //             🚪 Sign Out
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // // src/pages/ProfilePage.jsx - CROP + RESIZE (copy entire)
// // import React, { useEffect, useState, useRef } from "react";
// // import { db, logOut } from "../firebase/config";
// // import { doc, getDoc, setDoc } from "firebase/firestore";
// // import { getWorkouts } from "../firebase/exercises";

// // export default function ProfilePage({ user }) {
// //   const [profileData, setProfileData] = useState({
// //     displayName: "",
// //     email: "",
// //     photoURL: "",
// //   });
// //   const [stats, setStats] = useState({ workouts: 0, totalVolume: 0 });
// //   const [uploading, setUploading] = useState(false);
// //   const [showCropper, setShowCropper] = useState(false);
// //   const [cropImage, setCropImage] = useState(null);
// //   const canvasRef = useRef(null);

// //   useEffect(() => {
// //     if (!user) return;
// //     loadProfile();
// //     loadStats();
// //   }, [user]);

// //   const loadProfile = async () => {
// //     try {
// //       const docRef = doc(db, "users", user.uid);
// //       const snap = await getDoc(docRef);
// //       if (snap.exists()) {
// //         setProfileData(snap.data());
// //       } else {
// //         const data = {
// //           displayName: user.email.split("@")[0],
// //           email: user.email,
// //           photoURL: "",
// //         };
// //         await setDoc(docRef, data);
// //         setProfileData(data);
// //       }
// //     } catch (error) {
// //       console.error("Error loading profile:", error);
// //     }
// //   };

// //   const loadStats = async () => {
// //     if (!user) return;
// //     try {
// //       const workouts = await getWorkouts(user.uid);
// //       const totalVolume = workouts.reduce((sum, workout) => {
// //         return sum + workout.exercises.reduce((exSum, ex) => {
// //           return exSum + ex.sets.reduce((setSum, set) => 
// //             setSum + (set.reps * set.weight || 0), 0);
// //         }, 0);
// //       }, 0);
// //       setStats({
// //         workouts: workouts.length,
// //         totalVolume: Math.round(totalVolume),
// //       });
// //     } catch (error) {
// //       console.error("Error loading stats:", error);
// //     }
// //   };

// //   const openCropper = (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;

// //     const reader = new FileReader();
// //     reader.onload = (e) => {
// //       setCropImage(e.target.result);
// //       setShowCropper(true);
// //     };
// //     reader.readAsDataURL(file);
// //   };

// //   const cropAndSave = async () => {
// //     if (!canvasRef.current || !cropImage) return;

// //     setUploading(true);
// //     try {
// //       const canvas = canvasRef.current;
// //       const ctx = canvas.getContext('2d');
      
// //       // Crop 300x300 circle
// //       canvas.width = 300;
// //       canvas.height = 300;
// //       ctx.save();
      
// //       // Clear canvas
// //       ctx.fillStyle = '#fff';
// //       ctx.fillRect(0, 0, 300, 300);
      
// //       // Draw circular crop
// //       ctx.beginPath();
// //       ctx.arc(150, 150, 150, 0, Math.PI * 2);
// //       ctx.clip();
      
// //       // Load image and center it
// //       const img = new Image();
// //       img.onload = async () => {
// //         const imgRatio = img.width / img.height;
// //         let drawWidth, drawHeight, offsetX, offsetY;
        
// //         if (imgRatio > 1) {
// //           // Wide image
// //           drawWidth = 300;
// //           drawHeight = 300 / imgRatio;
// //           offsetY = (300 - drawHeight) / 2;
// //         } else {
// //           // Tall image
// //           drawHeight = 300;
// //           drawWidth = 300 * imgRatio;
// //           offsetX = (300 - drawWidth) / 2;
// //         }
        
// //         ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
// //         ctx.restore();
        
// //         // Convert to base64 (compress)
// //         const base64 = canvas.toDataURL('image/jpeg', 0.8);
        
// //         // Save to Firestore
// //         await setDoc(doc(db, "users", user.uid), {
// //           photoURL: base64,
// //         }, { merge: true });

// //         setProfileData(prev => ({ ...prev, photoURL: base64 }));
// //         setShowCropper(false);
// //         setCropImage(null);
// //         setUploading(false);
// //         alert("✅ Perfect profile photo saved!");
// //       };
// //       img.src = cropImage;
// //     } catch (error) {
// //       alert("❌ Save failed");
// //       console.error(error);
// //       setUploading(false);
// //     }
// //   };

// //   const avatar = profileData.photoURL || 
// //     `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData.displayName || user?.email?.split("@")[0])}&background=4F46E5&color=fff&rounded=true&size=128&bold=true`;

// //   if (!user) {
// //     return <div className="pt-16 pb-24 px-4 text-center"><h2 className="text-xl">Please log in</h2></div>;
// //   }
// // // Add to state:
// // const [translateX, setTranslateX] = useState(0);
// // const [translateY, setTranslateY] = useState(0);
// // const [scale, setScale] = useState(1);
// // const imageRef = useRef(null);
// // const isDragging = useRef(false);
// // const startPos = useRef({ x: 0, y: 0 });
// // const lastPos = useRef({ x: 0, y: 0 });

// // // Add these functions:
// // const resetCrop = () => {
// //   setTranslateX(0);
// //   setTranslateY(0);
// //   setScale(1);
// // };

// // const handleMouseDown = (e) => {
// //   isDragging.current = true;
// //   startPos.current = { x: e.clientX, y: e.clientY };
// //   lastPos.current = { x: translateX, y: translateY };
// // };

// // const handleMouseMove = (e) => {
// //   if (!isDragging.current) return;
// //   const deltaX = e.clientX - startPos.current.x;
// //   const deltaY = e.clientY - startPos.current.y;
// //   setTranslateX(Math.max(-200, Math.min(200, lastPos.current.x + deltaX)));
// //   setTranslateY(Math.max(-200, Math.min(200, lastPos.current.y + deltaY)));
// // };

// // const handleMouseUp = () => {
// //   isDragging.current = false;
// // };

// // // Touch events for mobile
// // const handleTouchStart = (e) => {
// //   const touch = e.touches[0];
// //   startPos.current = { x: touch.clientX, y: touch.clientY };
// //   lastPos.current = { x: translateX, y: translateY };
// // };

// // const handleTouchMove = (e) => {
// //   e.preventDefault();
// //   const touch = e.touches[0];
// //   const deltaX = touch.clientX - startPos.current.x;
// //   const deltaY = touch.clientY - startPos.current.y;
// //   setTranslateX(Math.max(-200, Math.min(200, lastPos.current.x + deltaX)));
// //   setTranslateY(Math.max(-200, Math.min(200, lastPos.current.y + deltaY)));
// // };

// // const handleTouchEnd = () => {
// //   isDragging.current = false;
// // };

// //   return (
// //     <div className="pt-16 pb-24 px-4 md:pt-20 md:pb-10 md:px-8 min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
// //       <div className="max-w-4xl mx-auto">
// //         {/* HEADER */}
// //         <div className="text-center mb-12">
// //           <div className="relative inline-block mb-6 group">
// //             <img
// //               src={avatar}
// //               alt="Profile"
// //               className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-2xl object-cover mx-auto transition-transform group-hover:scale-105"
// //             />
// //             <label className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-full shadow-lg cursor-pointer hover:shadow-xl hover:scale-110 transition-all z-10"
// //               title="Drag & zoom to crop perfect circle!">
// //               📸
// //               <input type="file" hidden accept="image/*" onChange={openCropper} />
// //             </label>
// //           </div>
// //           <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
// //             {profileData.displayName}
// //           </h1>
// //           <p className="text-xl text-gray-600">{profileData.email}</p>
// //         </div>

// //         {/* STATS */}
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
// //           <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all text-center">
// //             <div className="text-4xl md:text-5xl font-black mb-2">{stats.workouts}</div>
// //             <div className="text-blue-100 font-semibold text-lg">Workouts</div>
// //           </div>
// //           <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all text-center">
// //             <div className="text-4xl md:text-5xl font-black mb-2">{stats.totalVolume}kg</div>
// //             <div className="text-green-100 font-semibold text-lg">Volume</div>
// //           </div>
// //           <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all text-center">
// //             <div className="text-4xl md:text-5xl font-black mb-2">🏆</div>
// //             <div className="text-purple-100 font-semibold text-lg">Achievements</div>
// //           </div>
// //         </div>

// //         {/* INFO */}
// //         <div className="bg-white shadow-2xl rounded-3xl p-8 mb-12">
// //           <h3 className="text-3xl font-bold mb-8 text-gray-800 border-b-2 border-blue-100 pb-4">Account</h3>
// //           <div className="grid md:grid-cols-2 gap-6 text-lg">
// //             <div><span className="font-semibold text-gray-700 w-24 inline-block">Name:</span>
// //               <span className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-3 rounded-2xl border border-blue-100 inline-block ml-4 shadow-sm">{profileData.displayName}</span>
// //             </div>
// //             <div><span className="font-semibold text-gray-700 w-24 inline-block">Email:</span>
// //               <span className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-3 rounded-2xl border border-green-100 inline-block ml-4 shadow-sm">{profileData.email}</span>
// //             </div>
// //           </div>
// //         </div>

// //         {/* SIGN OUT */}
// //         <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t-2 border-gray-200 bg-white rounded-3xl p-8 shadow-xl">
// //           <button onClick={logOut} className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:from-red-600 hover:to-red-700 transition-all">
// //             🚪 Sign Out
// //           </button>
// //         </div>
// //       </div>

// //       {/* 👇 PHOTO CROPPER MODAL */}
// //       // REPLACE ENTIRE CROPPER MODAL with this:
// // {showCropper && cropImage && (
// //   <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
// //     <div className="bg-white rounded-3xl p-8 max-w-lg w-full max-h-[90vh] shadow-2xl border-4 border-blue-200">
// //       <div className="flex justify-between items-center mb-8">
// //         <h3 className="text-2xl font-bold text-gray-800">✂️ Crop Photo</h3>
// //         <div className="flex gap-3">
// //           <button
// //             onClick={cropAndSave}
// //             disabled={uploading}
// //             className="px-6 py-3 bg-green-600 text-white rounded-2xl font-bold shadow-lg hover:bg-green-700 disabled:opacity-50 transition-all"
// //           >
// //             {uploading ? "⏳ Saving..." : "✅ Save Crop"}
// //           </button>
// //           <button
// //             onClick={() => {
// //               setShowCropper(false);
// //               setCropImage(null);
// //             }}
// //             className="px-6 py-3 bg-gray-500 text-white rounded-2xl font-bold shadow-lg hover:bg-gray-600 transition-all"
// //           >
// //             ✕ Cancel
// //           </button>
// //         </div>
// //       </div>

// //       {/* 👇 DRAG + ZOOM CROPPER */}
// //       <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 p-4 rounded-2xl shadow-xl mb-6 border-4 border-dashed border-blue-300 min-h-[350px] overflow-hidden">
// //         {/* Circle Crop Guide */}
// //         <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
// //           <div className="w-40 h-40 border-8 border-blue-400/50 bg-white/70 rounded-full shadow-2xl flex items-center justify-center">
// //             <div className="w-32 h-32 border-4 border-blue-400 bg-gradient-to-br from-blue-400/20 to-blue-500/30 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg shadow-xl">
// //               👤 FACE HERE
// //             </div>
// //           </div>
// //         </div>

// //         {/* Draggable + Zoomable Image */}
// //         <div 
// //           className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden relative"
// //           style={{ touchAction: 'none' }}
// //           onMouseDown={handleMouseDown}
// //           onMouseMove={handleMouseMove}
// //           onMouseUp={handleMouseUp}
// //           onTouchStart={handleTouchStart}
// //           onTouchMove={handleTouchMove}
// //           onTouchEnd={handleTouchEnd}
// //         >
// //           <img
// //             ref={imageRef}
// //             src={cropImage}
// //             alt="Crop"
// //             className="max-w-none max-h-none object-contain transition-transform duration-100"
// //             style={{
// //               transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`
// //             }}
// //           />
// //         </div>

// //         {/* Controls */}
// //         <div className="flex gap-2 absolute bottom-4 left-1/2 -translate-x-1/2">
// //           <button onClick={() => setScale(Math.max(0.5, scale - 0.1))} className="px-3 py-1 bg-gray-700 text-white rounded-full text-xs shadow">−</button>
// //           <button onClick={() => setScale(1)} className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs shadow font-bold">1x</button>
// //           <button onClick={() => setScale(Math.min(3, scale + 0.1))} className="px-3 py-1 bg-gray-700 text-white rounded-full text-xs shadow">+</button>
// //           <button onClick={resetCrop} className="px-3 py-1 bg-gray-500 text-white rounded-full text-xs shadow">↻ Reset</button>
// //         </div>
// //       </div>

// //       <p className="text-center text-sm text-gray-600">
// //         Drag photo • Pinch/scroll to zoom • Position face in circle
// //       </p>
// //     </div>
// //   </div>
// // )}

// //     </div>
// //   );
// // }
// import React, { useState, useCallback } from "react";
// import { db, logOut } from "../firebase/config";
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { getWorkouts } from "../firebase/exercises";
// import Cropper from "react-easy-crop";

// export default function ProfilePage({ user }) {
//   const [profileData, setProfileData] = useState({
//     displayName: "",
//     email: "",
//     photoURL: "",
//   });
//   const [stats, setStats] = useState({ workouts: 0, totalVolume: 0 });
//   const [uploading, setUploading] = useState(false);
//   const [showCropper, setShowCropper] = useState(false);
//   const [cropImage, setCropImage] = useState(null);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedImage, setCroppedImage] = useState(null);

//   React.useEffect(() => {
//     if (!user) return;
//     loadProfile();
//     loadStats();
//   }, [user]);

//   const loadProfile = async () => {
//     try {
//       const docRef = doc(db, "users", user.uid);
//       const snap = await getDoc(docRef);
//       if (snap.exists()) {
//         setProfileData(snap.data());
//       } else {
//         const data = {
//           displayName: user.email.split("@")[0],
//           email: user.email,
//           photoURL: "",
//         };
//         await setDoc(docRef, data);
//         setProfileData(data);
//       }
//     } catch (error) {
//       console.error("Error loading profile:", error);
//     }
//   };

//   const loadStats = async () => {
//     if (!user) return;
//     try {
//       const workouts = await getWorkouts(user.uid);
//       const totalVolume = workouts.reduce((sum, workout) => {
//         return sum + workout.exercises.reduce((exSum, ex) => {
//           return exSum + ex.sets.reduce((setSum, set) => 
//             setSum + (set.reps * set.weight || 0), 0);
//         }, 0);
//       }, 0);
//       setStats({
//         workouts: workouts.length,
//         totalVolume: Math.round(totalVolume),
//       });
//     } catch (error) {
//       console.error("Error loading stats:", error);
//     }
//   };

//   const openCropper = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       setCropImage(e.target.result);
//       setShowCropper(true);
//       setZoom(1);
//       setCrop({ x: 0, y: 0 });
//     };
//     reader.readAsDataURL(file);
//   };

//   const createImage = (url) =>
//     new Promise((resolve, reject) => {
//       const img = new Image();
//       img.addEventListener("load", () => resolve(img));
//       img.addEventListener("error", (error) => reject(error));
//       img.src = url;
//     });

//   const getCroppedImg = useCallback(async () => {
//     const image = await createImage(cropImage);
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");

//     canvas.width = 300;
//     canvas.height = 300;

//     ctx.fillStyle = "#fff";
//     ctx.fillRect(0, 0, 300, 300);

//     ctx.save();
//     ctx.beginPath();
//     ctx.arc(150, 150, 150, 0, Math.PI * 2);
//     ctx.clip();
    
//     const scaleX = image.naturalWidth / image.width;
//     const scaleY = image.naturalHeight / image.height;
    
//     ctx.drawImage(
//       image,
//       (crop.x * scaleX) / zoom,
//       (crop.y * scaleY) / zoom,
//       (image.naturalWidth * 300) / (image.width * zoom * scaleX),
//       (image.naturalHeight * 300) / (image.height * zoom * scaleY),
//       0,
//       0,
//       300,
//       300
//     );
//     ctx.restore();

//     return new Promise((resolve) => {
//       canvas.toBlob((blob) => {
//         const base64 = URL.createObjectURL(blob);
//         resolve(base64);
//       }, "image/jpeg", 0.8);
//     });
//   }, [crop, zoom, cropImage]);

//   const cropAndSave = async () => {
//     try {
//       setUploading(true);
//       const cropped = await getCroppedImg();
//       setCroppedImage(cropped);

//       await setDoc(doc(db, "users", user.uid), {
//         photoURL: cropped,
//       }, { merge: true });

//       setProfileData(prev => ({ ...prev, photoURL: cropped }));
//       setShowCropper(false);
//       setCropImage(null);
//       alert("✅ Profile photo saved perfectly!");
//     } catch (error) {
//       alert("❌ Save failed");
//       console.error(error);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const avatar = profileData.photoURL || 
//     `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData.displayName || user?.email?.split("@")[0])}&background=4F46E5&color=fff&rounded=true&size=128&bold=true`;

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-gray-50 to-blue-50">
//         <div className="text-center max-w-md">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">Please log in</h2>
//           <p className="text-gray-600">Sign in to view your profile and stats.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 py-12 sm:py-16 md:py-20">
//       <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
        
//         {/* Profile Header - Fully Responsive */}
//         <div className="text-center">
//           <div className="relative mx-auto mb-6 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 group">
//             <img
//               src={avatar}
//               alt="Profile"
//               className="w-full h-full rounded-full object-cover border-4 border-white shadow-2xl ring-4 ring-white/50 group-hover:scale-105 transition-all duration-300"
//               loading="lazy"
//             />
//             <label className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-full shadow-xl cursor-pointer hover:shadow-2xl hover:scale-110 transition-all duration-200 border-4 border-white z-10">
//               📸
//               <input 
//                 type="file" 
//                 hidden 
//                 accept="image/*" 
//                 onChange={openCropper} 
//               />
//             </label>
//           </div>
//           <h1 className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-slate-700 bg-clip-text text-transparent mb-3">
//             {profileData.displayName || "Loading..."}
//           </h1>
//           <p className="text-lg sm:text-xl text-gray-600 bg-white/70 px-6 py-3 rounded-2xl inline-block shadow-lg">
//             {profileData.email}
//           </p>
//         </div>

//         {/* Stats - Responsive Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//           <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center">
//             <div className="text-3xl sm:text-4xl md:text-5xl font-black mb-2">
//               {stats.workouts}
//             </div>
//             <div className="text-blue-100 font-semibold text-base sm:text-lg">Total Workouts</div>
//           </div>
//           <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center">
//             <div className="text-3xl sm:text-4xl md:text-5xl font-black mb-2">
//               {stats.totalVolume}kg
//             </div>
//             <div className="text-emerald-100 font-semibold text-base sm:text-lg">Total Volume</div>
//           </div>
//           <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center">
//             <div className="text-3xl sm:text-4xl md:text-5xl font-black mb-2">🏆</div>
//             <div className="text-purple-100 font-semibold text-base sm:text-lg">Achievements</div>
//           </div>
//         </div>

//         {/* Account Info - Better Mobile Layout */}
//         <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-6 sm:p-8 border border-white/50">
//           <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800 border-b-2 border-blue-100 pb-4">
//             Account Details
//           </h3>
//           <div className="space-y-4 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
//             <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
//               <span className="font-bold text-gray-700 w-24 sm:w-auto whitespace-nowrap">Name:</span>
//               <span className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 sm:px-6 py-3 rounded-2xl border border-blue-200 font-semibold shadow-sm flex-1 min-w-0 truncate">
//                 {profileData.displayName}
//               </span>
//             </div>
//             <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
//               <span className="font-bold text-gray-700 w-24 sm:w-auto whitespace-nowrap">Email:</span>
//               <span className="bg-gradient-to-r from-emerald-50 to-teal-50 px-4 sm:px-6 py-3 rounded-2xl border border-emerald-200 font-semibold shadow-sm flex-1 min-w-0 truncate">
//                 {profileData.email}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Sign Out - Full Width Mobile */}
//         <div className="pt-8 border-t-2 border-gray-200">
//           <button 
//             onClick={logOut}
//             className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 mx-auto max-w-sm"
//           >
//             🚪 Sign Out
//           </button>
//         </div>
//       </div>

//       {/* 👇 RESPONSIVE CROPPER MODAL */}
//       {showCropper && cropImage && (
//         <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in zoom-in duration-200">
//           <div className="bg-white rounded-3xl shadow-2xl max-w-[95vw] max-h-[95vh] w-full max-w-lg overflow-hidden border-4 border-blue-200/50">
//             {/* Header */}
//             <div className="p-6 pb-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//               <h3 className="text-2xl font-bold text-gray-800 flex-1">✂️ Crop Profile Photo</h3>
//               <div className="flex gap-3 flex-shrink-0">
//                 <button
//                   onClick={cropAndSave}
//                   disabled={uploading}
//                   className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
//                 >
//                   {uploading ? "⏳ Saving..." : "✅ Save Crop"}
//                 </button>
//                 <button
//                   onClick={() => {
//                     setShowCropper(false);
//                     setCropImage(null);
//                   }}
//                   className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-bold shadow-lg transition-all"
//                 >
//                   ✕ Cancel
//                 </button>
//               </div>
//             </div>

//             {/* Cropper Container - Fully Responsive */}
//             <div className="relative w-full h-96 sm:h-[500px] bg-gradient-to-br from-gray-100 to-gray-200">
//               <Cropper
//                 image={cropImage}
//                 crop={crop}
//                 zoom={zoom}
//                 aspect={1}
//                 cropShape="round"
//                 showGrid={false}
//                 onCropChange={setCrop}
//                 onZoomChange={setZoom}
//                 zoomWithScroll={false}
//                 restrictPosition={false}
//                 cropSize={{ width: 256, height: 256 }}
//               />
//             </div>

//             {/* Controls */}
//             <div className="p-6 pt-4 space-y-4">
//               <div className="flex items-center justify-center gap-3 bg-gray-50 p-3 rounded-2xl">
//                 <button 
//                   onClick={() => setZoom(Math.max(1, zoom - 0.1))}
//                   className="w-12 h-12 bg-white shadow-md rounded-full text-xl font-bold hover:bg-gray-100 transition-all"
//                 >
//                   −
//                 </button>
//                 <button 
//                   onClick={() => setZoom(1)}
//                   className="w-12 h-12 bg-blue-600 shadow-lg text-white rounded-full font-bold text-lg hover:bg-blue-700 transition-all"
//                 >
//                   Reset
//                 </button>
//                 <button 
//                   onClick={() => setZoom(Math.min(4, zoom + 0.1))}
//                   className="w-12 h-12 bg-white shadow-md rounded-full text-xl font-bold hover:bg-gray-100 transition-all"
//                 >
//                   +
//                 </button>
//               </div>
//               <p className="text-center text-sm text-gray-600">
//                 Drag to position • Scroll/pinch to zoom • Perfect circle preview
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useEffect, useState, useRef } from "react";
import { db, logOut } from "../firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getWorkouts } from "../firebase/exercises";

export default function ProfilePage({ user }) {
  const [profileData, setProfileData] = useState({
    displayName: "",
    email: "",
    photoURL: "",
  });
  const [stats, setStats] = useState({ workouts: 0, totalVolume: 0 });
  const [uploading, setUploading] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [cropImage, setCropImage] = useState(null);
  
  // ✅ FIXED CUSTOM CROPPER STATES
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [scale, setScale] = useState(1);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!user) return;
    loadProfile();
    loadStats();
  }, [user]);

  const loadProfile = async () => {
    try {
      const docRef = doc(db, "users", user.uid);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setProfileData(snap.data());
      } else {
        const data = {
          displayName: user.email.split("@")[0],
          email: user.email,
          photoURL: "",
        };
        await setDoc(docRef, data);
        setProfileData(data);
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  };

  const loadStats = async () => {
    if (!user) return;
    try {
      const workouts = await getWorkouts(user.uid);
      const totalVolume = workouts.reduce((sum, workout) => {
        return sum + workout.exercises.reduce((exSum, ex) => {
          return exSum + ex.sets.reduce((setSum, set) => 
            setSum + (set.reps * set.weight || 0), 0);
        }, 0);
      }, 0);
      setStats({
        workouts: workouts.length,
        totalVolume: Math.round(totalVolume),
      });
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  const openCropper = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setCropImage(e.target.result);
      setShowCropper(true);
      // Reset cropper state
      setTranslateX(0);
      setTranslateY(0);
      setScale(1);
    };
    reader.readAsDataURL(file);
  };

  // ✅ FIXED DRAG FUNCTIONS
  const resetCrop = () => {
    setTranslateX(0);
    setTranslateY(0);
    setScale(1);
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startPos.current = { x: e.clientX, y: e.clientY };
    lastPos.current = { x: translateX, y: translateY };
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - startPos.current.x;
    const deltaY = e.clientY - startPos.current.y;
    setTranslateX(Math.max(-200, Math.min(200, lastPos.current.x + deltaX * 0.8)));
    setTranslateY(Math.max(-200, Math.min(200, lastPos.current.y + deltaY * 0.8)));
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // ✅ FIXED TOUCH EVENTS - Mobile friendly
  const handleTouchStart = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    isDragging.current = true;
    startPos.current = { x: touch.clientX, y: touch.clientY };
    lastPos.current = { x: translateX, y: translateY };
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const deltaX = touch.clientX - startPos.current.x;
    const deltaY = touch.clientY - startPos.current.y;
    setTranslateX(Math.max(-200, Math.min(200, lastPos.current.x + deltaX * 0.8)));
    setTranslateY(Math.max(-200, Math.min(200, lastPos.current.y + deltaY * 0.8)));
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  // ✅ PERFECT CROPPING LOGIC - Matches preview exactly
  const cropAndSave = async () => {
    if (!canvasRef.current || !cropImage) return;

    setUploading(true);
    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      // Set canvas to 300x300 for perfect profile photo
      canvas.width = 300;
      canvas.height = 300;
      
      // White background first
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, 300, 300);
      
      // Circular clip mask
      ctx.save();
      ctx.beginPath();
      ctx.arc(150, 150, 150, 0, Math.PI * 2);
      ctx.clip();
      
      // Load image with EXACT same transform as preview
      const img = new Image();
      img.onload = async () => {
        // Calculate draw dimensions based on current scale
        const drawSize = 420 * scale;
        const imgRatio = img.width / img.height;
        
        let drawWidth, drawHeight, offsetX, offsetY;
        
        if (imgRatio > 1) {
          // Wide image
          drawWidth = drawSize;
          drawHeight = drawSize / imgRatio;
          offsetY = (300 - drawHeight) / 2 + translateY * 0.6;
          offsetX = translateX * 0.6;
        } else {
          // Tall image
          drawHeight = drawSize;
          drawWidth = drawSize * imgRatio;
          offsetX = (300 - drawWidth) / 2 + translateX * 0.6;
          offsetY = translateY * 0.6;
        }
        
        // Draw with exact preview transform
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        ctx.restore();
        
        // Convert to optimized JPEG
        const base64 = canvas.toDataURL('image/jpeg', 0.85);
        
        // Save to Firestore
        await setDoc(doc(db, "users", user.uid), {
          photoURL: base64,
        }, { merge: true });

        setProfileData(prev => ({ ...prev, photoURL: base64 }));
        setShowCropper(false);
        setCropImage(null);
        setUploading(false);
        alert("✅ Perfect circular profile photo saved!");
      };
      img.src = cropImage;
    } catch (error) {
      alert("❌ Save failed");
      console.error(error);
      setUploading(false);
    }
  };

  const avatar = profileData.photoURL || 
    `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData.displayName || user?.email?.split("@")[0])}&background=4F46E5&color=fff&rounded=true&size=128&bold=true`;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please log in</h2>
          <p className="text-gray-600">Sign in to view your profile and stats.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 py-12 sm:py-16 md:py-20">
      <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
        
        {/* Profile Header - Fully Responsive */}
        <div className="text-center">
          <div className="relative mx-auto mb-8 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 group">
            <img
              src={avatar}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-white shadow-2xl ring-4 ring-white/50 group-hover:scale-105 transition-all duration-300"
              loading="lazy"
            />
            <label className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-full shadow-xl cursor-pointer hover:shadow-2xl hover:scale-110 transition-all duration-200 border-4 border-white z-10">
              📸
              <input 
                type="file" 
                hidden 
                accept="image/*" 
                onChange={openCropper} 
              />
            </label>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-slate-700 bg-clip-text text-transparent mb-3">
            {profileData.displayName || "Loading..."}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 bg-white/70 px-6 py-3 rounded-2xl inline-block shadow-lg">
            {profileData.email}
          </p>
        </div>

        {/* Stats Cards - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-black mb-2">
              {stats.workouts}
            </div>
            <div className="text-blue-100 font-semibold text-base sm:text-lg">Total Workouts</div>
          </div>
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-black mb-2">
              {stats.totalVolume}kg
            </div>
            <div className="text-emerald-100 font-semibold text-base sm:text-lg">Total Volume</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-black mb-2">🏆</div>
            <div className="text-purple-100 font-semibold text-base sm:text-lg">Achievements</div>
          </div>
        </div>

        {/* Account Info */}
        <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-6 sm:p-8 border border-white/50">
          <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800 border-b-2 border-blue-100 pb-4">
            Account Details
          </h3>
          <div className="space-y-4 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <span className="font-bold text-gray-700 w-24 sm:w-auto whitespace-nowrap">Name:</span>
              <span className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 sm:px-6 py-3 rounded-2xl border border-blue-200 font-semibold shadow-sm flex-1 min-w-0 truncate">
                {profileData.displayName}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <span className="font-bold text-gray-700 w-24 sm:w-auto whitespace-nowrap">Email:</span>
              <span className="bg-gradient-to-r from-emerald-50 to-teal-50 px-4 sm:px-6 py-3 rounded-2xl border border-emerald-200 font-semibold shadow-sm flex-1 min-w-0 truncate">
                {profileData.email}
              </span>
            </div>
          </div>
        </div>

        {/* Sign Out */}
        <div className="pt-8 border-t-2 border-gray-200">
          <button 
            onClick={logOut}
            className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 mx-auto max-w-sm"
          >
            🚪 Sign Out
          </button>
        </div>
      </div>

      {/* ✅ PERFECT RESPONSIVE CROPPER MODAL */}
      {showCropper && cropImage && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in zoom-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-[95vw] max-h-[95vh] w-full max-w-2xl overflow-hidden border-4 border-blue-200/50">
            {/* Header */}
            <div className="p-6 pb-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 className="text-2xl font-bold text-gray-800 flex-1">✂️ Crop Profile Photo</h3>
              <div className="flex gap-3 flex-shrink-0">
                <button
                  onClick={cropAndSave}
                  disabled={uploading}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                >
                  {uploading ? "⏳ Saving..." : "✅ Save Crop"}
                </button>
                <button
                  onClick={() => {
                    setShowCropper(false);
                    setCropImage(null);
                  }}
                  className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-bold shadow-lg transition-all"
                >
                  ✕ Cancel
                </button>
              </div>
            </div>

            {/* Cropper Container */}
            <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 p-4 sm:p-6 rounded-2xl shadow-xl mb-6 border-4 border-dashed border-blue-300 min-h-[300px] sm:min-h-[400px] max-h-[60vh] overflow-hidden mx-4 sm:mx-6">
              {/* Circle Crop Guide */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <div className="w-32 h-32 sm:w-40 sm:h-40 border-8 border-blue-400/50 bg-white/80 rounded-full shadow-2xl flex items-center justify-center">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-blue-400 bg-gradient-to-br from-blue-400/30 to-blue-500/40 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm sm:text-lg shadow-xl">
                    👤 FACE HERE
                  </div>
                </div>
              </div>

              {/* Draggable + Zoomable Image */}
              <div 
                className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden relative touch-none select-none"
                style={{ touchAction: 'none' }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <img
                  ref={imageRef}
                  src={cropImage}
                  alt="Crop"
                  className="max-w-none max-h-none object-contain transition-transform duration-100 drop-shadow-2xl"
                  style={{
                    transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
                    willChange: 'transform',
                  }}
                  draggable={false}
                />
              </div>

              {/* Controls */}
              <div className="flex gap-2 absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-2xl border">
                <button 
                  onClick={() => setScale(Math.max(0.8, scale - 0.1))}
                  className="w-10 h-10 bg-gray-200 hover:bg-gray-300 text-xl font-bold rounded-xl transition-all flex items-center justify-center shadow-sm"
                  title="Zoom Out"
                >
                  −
                </button>
                <button 
                  onClick={resetCrop}
                  className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center"
                  title="Reset"
                >
                  ↻
                </button>
                <button 
                  onClick={() => setScale(Math.min(3, scale + 0.1))}
                  className="w-10 h-10 bg-gray-200 hover:bg-gray-300 text-xl font-bold rounded-xl transition-all flex items-center justify-center shadow-sm"
                  title="Zoom In"
                >
                  +
                </button>
              </div>
            </div>

            {/* Hidden Canvas for Export */}
            <canvas ref={canvasRef} className="hidden" />

            <p className="px-6 pb-6 text-center text-sm text-gray-600 font-medium">
              👆 Drag to move • +/- to zoom • Position face in circle above
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
