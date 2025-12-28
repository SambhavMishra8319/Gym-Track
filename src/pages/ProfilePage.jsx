// // // // // import React, { useEffect, useState } from "react";
// // // // // import { getWorkouts, updateProfilePhoto } from "../firebase/exercises"; // or users.js
// // // // // import ProgressChart from "../components/ProgressChart";
// // // // // import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// // // // // import { storage } from "../firebase/config"; // make sure you have firebase initialized

// // // // // export default function ProfilePage({ user }) {
// // // // //   const [workouts, setWorkouts] = useState([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [photo, setPhoto] = useState(user.photoURL || "");
// // // // //   const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

// // // // //   // Load workouts
// // // // //   useEffect(() => {
// // // // //     if (!user) return;
// // // // //     async function load() {
// // // // //       const data = await getWorkouts(user.uid);
// // // // //       setWorkouts(data);
// // // // //       setLoading(false);
// // // // //     }
// // // // //     load();
// // // // //   }, [user]);

// // // // //   // Theme toggle
// // // // //   const toggleTheme = () => {
// // // // //     const newTheme = theme === "light" ? "dark" : "light";
// // // // //     setTheme(newTheme);
// // // // //     document.documentElement.classList.toggle("dark", newTheme === "dark");
// // // // //     localStorage.setItem("theme", newTheme);
// // // // //   };

// // // // //   // Upload photo
// // // // //   const handlePhotoUpload = async (e) => {
// // // // //     const file = e.target.files[0];
// // // // //     if (!file) return;
// // // // //     const storageRef = ref(storage, `users/${user.uid}/profile.jpg`);
// // // // //     await uploadBytes(storageRef, file);
// // // // //     const url = await getDownloadURL(storageRef);
// // // // //     setPhoto(url);
// // // // //     await updateProfilePhoto(user.uid, url);
// // // // //   };

// // // // //   // Prepare data for ProgressChart
// // // // //   const chartData = {
// // // // //     labels: workouts.map((w) => w.date),
// // // // //     datasets: [
// // // // //       {
// // // // //         label: "Total Volume",
// // // // //         data: workouts.map((w) =>
// // // // //           w.exercises.reduce(
// // // // //             (sum, ex) =>
// // // // //               sum +
// // // // //               ex.sets.reduce(
// // // // //                 (sSum, set) => sSum + (set.reps || 0) * (set.weight || 0),
// // // // //                 0
// // // // //               ),
// // // // //             0
// // // // //           )
// // // // //         ),
// // // // //         borderColor: "#3b82f6",
// // // // //         backgroundColor: "rgba(59, 130, 246, 0.2)",
// // // // //       },
// // // // //     ],
// // // // //   };

// // // // //   if (loading) return <p>Loading profile...</p>;

// // // // //   return (
// // // // //     <div className="p-8 min-h-screen">
// // // // //       <div className="flex items-center gap-6 mb-8">
// // // // //         <div className="relative">
// // // // //           <img
// // // // //             src={photo || "https://ui-avatars.com/api/?name=User&background=E0F2FE&color=0284C7"}
// // // // //             alt="Profile"
// // // // //             className="h-24 w-24 rounded-full object-cover border-2 border-blue-400"
// // // // //           />
// // // // //           <input
// // // // //             type="file"
// // // // //             accept="image/*"
// // // // //             onChange={handlePhotoUpload}
// // // // //             className="absolute bottom-0 right-0 opacity-0 w-full h-full cursor-pointer"
// // // // //           />
// // // // //           <div className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full text-xs cursor-pointer">
// // // // //             ✎
// // // // //           </div>
// // // // //         </div>
// // // // //         <div>
// // // // //           <h2 className="text-2xl font-semibold">{user.displayName || "User"}</h2>
// // // // //           <p className="text-gray-600">{user.email}</p>
// // // // //           <button
// // // // //             onClick={toggleTheme}
// // // // //             className="mt-2 px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-sm"
// // // // //           >
// // // // //             {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
// // // // //           </button>
// // // // //         </div>
// // // // //       </div>

// // // // //       <div className="bg-white p-6 rounded-xl shadow mb-8">
// // // // //         <h3 className="text-xl font-semibold mb-4">Progress Chart</h3>
// // // // //         <ProgressChart data={chartData} />
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }
// // // // // src/pages/ProfilePage.jsx
// // // // import React, { useEffect, useState } from "react";
// // // // import { db, storage, auth } from "../firebase/config";
// // // // import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// // // // import { doc, getDoc, setDoc } from "firebase/firestore";

// // // // export default function ProfilePage({ user }) {
// // // //   const [profileData, setProfileData] = useState({
// // // //     displayName: user?.displayName || "",
// // // //     email: user?.email || "",
// // // //     photoURL: "",
// // // //   });
// // // //   const [uploading, setUploading] = useState(false);

// // // //   // Load profile data from Firestore
// // // //   useEffect(() => {
// // // //     if (!user) return;

// // // //     const loadProfile = async () => {
// // // //       const docRef = doc(db, "users", user.uid);
// // // //       const docSnap = await getDoc(docRef);
// // // //       if (docSnap.exists()) {
// // // //         setProfileData((prev) => ({ ...prev, ...docSnap.data() }));
// // // //       }
// // // //     };

// // // //     loadProfile();
// // // //   }, [user]);

// // // //   // Handle profile picture upload
// // // //   const handleFileChange = async (e) => {
// // // //     const file = e.target.files[0];
// // // //     if (!file) return;

// // // //     setUploading(true);
// // // //     const storageRef = ref(storage, `users/${user.uid}/profile.jpg`);
// // // //     try {
// // // //       await uploadBytes(storageRef, file);
// // // //       const url = await getDownloadURL(storageRef);

// // // //       // Update Firestore
// // // //       await setDoc(
// // // //         doc(db, "users", user.uid),
// // // //         { photoURL: url },
// // // //         { merge: true }
// // // //       );

// // // //       setProfileData((prev) => ({ ...prev, photoURL: url }));
// // // //       alert("Profile picture updated ✅");
// // // //     } catch (err) {
// // // //       console.error(err);
// // // //       alert("Failed to upload profile picture");
// // // //     }
// // // //     setUploading(false);
// // // //   };

// // // //   return (
// // // //     <div className="p-8">
// // // //       <h2 className="text-3xl font-semibold mb-6">Your Profile</h2>

// // // //       {/* Profile Picture */}
// // // //       <div className="mb-6 flex items-center gap-4">
// // // //         {profileData.photoURL ? (
// // // //           <img
// // // //             src={profileData.photoURL}
// // // //             alt="Profile"
// // // //             className="w-24 h-24 rounded-full object-cover border"
// // // //           />
// // // //         ) : (
// // // //           <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
// // // //             No Photo
// // // //           </div>
// // // //         )}

// // // //         <div>
// // // //           <label className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded">
// // // //             {uploading ? "Uploading..." : "Change Photo"}
// // // //             <input
// // // //               type="file"
// // // //               accept="image/*"
// // // //               onChange={handleFileChange}
// // // //               className="hidden"
// // // //             />
// // // //           </label>
// // // //         </div>
// // // //       </div>

// // // //       {/* User Info */}
// // // //       <div className="bg-white p-6 rounded-xl shadow-md">
// // // //         <p>
// // // //           <strong>Name:</strong> {profileData.displayName}
// // // //         </p>
// // // //         <p>
// // // //           <strong>Email:</strong> {profileData.email}
// // // //         </p>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }
// // // import React, { useEffect, useState } from "react";
// // // // import { db, storage, auth, signInWithGoogle, logOut } from "../firebase/config";
// // // import { db, storage, auth, signInWithGoogle, logOut } from "../firebase/config";

// // // import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// // // import { doc, getDoc, setDoc } from "firebase/firestore";

// // // export default function ProfilePage({ user }) {
// // //   const [profileData, setProfileData] = useState({
// // //     displayName: user?.displayName || "",
// // //     email: user?.email || "",
// // //     photoURL: "",
// // //   });
// // //   const [uploading, setUploading] = useState(false);

// // //   // Load Firestore data
// // //   useEffect(() => {
// // //     if (!user) return;

// // //     const loadProfile = async () => {
// // //       const docRef = doc(db, "users", user.uid);
// // //       const docSnap = await getDoc(docRef);
// // //       if (docSnap.exists()) {
// // //         setProfileData((prev) => ({ ...prev, ...docSnap.data() }));
// // //       } else {
// // //         setDoc(docRef, {
// // //           displayName: user.displayName,
// // //           email: user.email,
// // //           photoURL: user.photoURL || "",
// // //         });
// // //       }
// // //     };

// // //     loadProfile();
// // //   }, [user]);

// // //   // Handle profile picture upload
// // //   const handleFileChange = async (e) => {
// // //     if (!user) return alert("Please sign in first!");
// // //     const file = e.target.files[0];
// // //     if (!file) return;

// // //     setUploading(true);

// // //     try {
// // //       const storageRef = ref(storage, `users/${user.uid}/profile.jpg`);
// // //       await uploadBytes(storageRef, file);
// // //       const url = await getDownloadURL(storageRef);

// // //       await setDoc(doc(db, "users", user.uid), { photoURL: url }, { merge: true });

// // //       setProfileData((prev) => ({ ...prev, photoURL: url }));
// // //       alert("Profile picture updated successfully!");
// // //     } catch (err) {
// // //       console.error(err);
// // //       alert("Failed to upload profile picture");
// // //     }

// // //     setUploading(false);
// // //   };

// // //   // Fallback avatar
// // //   const avatarUrl =
// // //     profileData.photoURL ||
// // //     `https://ui-avatars.com/api/?name=${encodeURIComponent(
// // //       profileData.displayName || "User"
// // //     )}&rounded=true&background=E0F2FE&color=0284C7`;

// // //   return (
// // //     <div className="p-8">
// // //       <h2 className="text-3xl font-semibold mb-6">Your Profile</h2>

// // //       {/* If not signed in */}
// // //       {!user && (
// // //         <div className="bg-white p-6 rounded-xl shadow-md text-center">
// // //           <p className="mb-4 text-gray-600 text-lg">You are not signed in.</p>
// // //           <button
// // //             onClick={signInWithGoogle}
// // //             className="px-4 py-2 bg-blue-600 text-white rounded-lg"
// // //           >
// // //             Sign In with Google
// // //           </button>
// // //         </div>
// // //       )}

// // //       {/* If user is signed in */}
// // //       {user && (
// // //         <>
// // //           {/* Profile Picture */}
// // //           <div className="mb-6 flex items-center gap-4">
// // //             <img
// // //               src={avatarUrl}
// // //               alt="Profile"
// // //               className="w-24 h-24 rounded-full object-cover border"
// // //             />

// // //             <div>
// // //               <label className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded">
// // //                 {uploading ? "Uploading..." : "Change Photo"}
// // //                 <input
// // //                   type="file"
// // //                   accept="image/*"
// // //                   onChange={handleFileChange}
// // //                   className="hidden"
// // //                 />
// // //               </label>
// // //             </div>
// // //           </div>

// // //           {/* User Info */}
// // //           <div className="bg-white p-6 rounded-xl shadow-md space-y-3">
// // //             <p>
// // //               <strong>Name:</strong> {profileData.displayName}
// // //             </p>
// // //             <p>
// // //               <strong>Email:</strong> {profileData.email}
// // //             </p>
// // //           </div>

// // //           {/* Sign Out Button */}
// // //           <div className="mt-6">
// // //             <button
// // //               onClick={logOut}
// // //               className="px-4 py-2 bg-red-500 text-white rounded-lg"
// // //             >
// // //               Sign Out
// // //             </button>
// // //           </div>
// // //         </>
// // //       )}
// // //     </div>
// // //   );
// // // }
// // import React, { useEffect, useState } from "react";
// // import {
// //   db,
// //   storage,
// //   auth,
// //   signInWithGoogle,
// //   logOut
// // } from "../firebase/config";

// // import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// // import { doc, getDoc, setDoc } from "firebase/firestore";
// // import { getRedirectResult } from "firebase/auth";

// // export default function ProfilePage({ user, setUser }) {
// //   const [profileData, setProfileData] = useState({
// //     displayName: user?.displayName || "",
// //     email: user?.email || "",
// //     photoURL: "",
// //   });
// //   const [uploading, setUploading] = useState(false);

// //   // --------------------------------------------------------
// //   // 🔥 FIX: Handle Google Redirect Login (for mobile)
// //   // --------------------------------------------------------
// //   useEffect(() => {
// //     getRedirectResult(auth)
// //       .then((result) => {
// //         if (result?.user) {
// //           console.log("Mobile Google Login Success:", result.user);
// //           setUser(result.user);
// //         }
// //       })
// //       .catch(console.error);
// //   }, []);
// //   // --------------------------------------------------------

// //   // Load Firestore data
// //   useEffect(() => {
// //     if (!user) return;

// //     const loadProfile = async () => {
// //       const docRef = doc(db, "users", user.uid);
// //       const docSnap = await getDoc(docRef);

// //       if (docSnap.exists()) {
// //         setProfileData((prev) => ({ ...prev, ...docSnap.data() }));
// //       } else {
// //         await setDoc(docRef, {
// //           displayName: user.displayName,
// //           email: user.email,
// //           photoURL: user.photoURL || "",
// //         });
// //       }
// //     };

// //     loadProfile();
// //   }, [user]);

// //   // Handle profile picture upload
// //   const handleFileChange = async (e) => {
// //     if (!user) return alert("Please sign in first!");
// //     const file = e.target.files[0];
// //     if (!file) return;

// //     setUploading(true);

// //     try {
// //       const storageRef = ref(storage, `users/${user.uid}/profile.jpg`);
// //       await uploadBytes(storageRef, file);
// //       const url = await getDownloadURL(storageRef);

// //       await setDoc(
// //         doc(db, "users", user.uid),
// //         { photoURL: url },
// //         { merge: true }
// //       );

// //       setProfileData((prev) => ({ ...prev, photoURL: url }));
// //       alert("Profile picture updated successfully!");
// //     } catch (err) {
// //       console.error(err);
// //       alert("Failed to upload profile picture");
// //     }

// //     setUploading(false);
// //   };

// //   // Fallback avatar
// //   const avatarUrl =
// //     profileData.photoURL ||
// //     `https://ui-avatars.com/api/?name=${encodeURIComponent(
// //       profileData.displayName || "User"
// //     )}&rounded=true&background=E0F2FE&color=0284C7`;

// //   return (
// //     <div className="p-8">
// //       <h2 className="text-3xl font-semibold mb-6">Your Profile</h2>

// //       {/* If not signed in */}
// //       {!user && (
// //         <div className="bg-white p-6 rounded-xl shadow-md text-center">
// //           <p className="mb-4 text-gray-600 text-lg">You are not signed in.</p>
// //           <button
// //             onClick={signInWithGoogle}
// //             className="px-4 py-2 bg-blue-600 text-white rounded-lg"
// //           >
// //             Sign In with Google
// //           </button>
// //         </div>
// //       )}

// //       {/* If user is signed in */}
// //       {user && (
// //         <>
// //           {/* Profile Picture */}
// //           <div className="mb-6 flex items-center gap-4">
// //             <img
// //               src={avatarUrl}
// //               alt="Profile"
// //               className="w-24 h-24 rounded-full object-cover border"
// //             />

// //             <div>
// //               <label className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded">
// //                 {uploading ? "Uploading..." : "Change Photo"}
// //                 <input
// //                   type="file"
// //                   accept="image/*"
// //                   onChange={handleFileChange}
// //                   className="hidden"
// //                 />
// //               </label>
// //             </div>
// //           </div>

// //           {/* User Info */}
// //           <div className="bg-white p-6 rounded-xl shadow-md space-y-3">
// //             <p>
// //               <strong>Name:</strong> {profileData.displayName}
// //             </p>
// //             <p>
// //               <strong>Email:</strong> {profileData.email}
// //             </p>
// //           </div>

// //           {/* Sign Out Button */}
// //           <div className="mt-6">
// //             <button
// //               onClick={logOut}
// //               className="px-4 py-2 bg-red-500 text-white rounded-lg"
// //             >
// //               Sign Out
// //             </button>
// //           </div>
// //         </>
// //       )}
// //     </div>
// //   );
// // }
// import React, { useEffect, useState } from "react";
// import { db, storage, logOut } from "../firebase/config";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { doc, getDoc, setDoc } from "firebase/firestore";

// export default function ProfilePage({ user }) {
//   const [profileData, setProfileData] = useState({
//     displayName: "",
//     email: "",
//     photoURL: "",
//   });
//   const [uploading, setUploading] = useState(false);

//   /* ================= LOAD PROFILE ================= */
//   useEffect(() => {
//     if (!user) return;

//     const loadProfile = async () => {
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
//     };

//     loadProfile();
//   }, [user]);

//   /* ================= UPLOAD PHOTO ================= */
//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setUploading(true);

//     const storageRef = ref(storage, `users/${user.uid}/profile.jpg`);
//     await uploadBytes(storageRef, file);
//     const url = await getDownloadURL(storageRef);

//     await setDoc(
//       doc(db, "users", user.uid),
//       { photoURL: url },
//       { merge: true }
//     );

//     setProfileData((p) => ({ ...p, photoURL: url }));
//     setUploading(false);
//   };

//   const avatar =
//     profileData.photoURL ||
//     `https://ui-avatars.com/api/?name=${profileData.displayName}&rounded=true`;

//   /* ================= UI ================= */
//   if (!user) {
//     return (
//       <div className="p-8 text-center">
//         <h2 className="text-xl">Please log in to view profile</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="p-8 max-w-xl mx-auto">
//       <h2 className="text-3xl font-semibold mb-6">Your Profile</h2>

//       <div className="flex items-center gap-4 mb-6">
//         <img
//           src={avatar}
//           alt="Profile"
//           className="w-24 h-24 rounded-full border"
//         />

//         <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded">
//           {uploading ? "Uploading..." : "Change Photo"}
//           <input
//             type="file"
//             hidden
//             accept="image/*"
//             onChange={handleFileChange}
//           />
//         </label>
//       </div>

//       <div className="bg-white shadow rounded p-4 space-y-2">
//         <p><strong>Name:</strong> {profileData.displayName}</p>
//         <p><strong>Email:</strong> {profileData.email}</p>
//       </div>

//       <button
//         onClick={logOut}
//         className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
//       >
//         Sign Out
//       </button>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { db, storage, logOut } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function ProfilePage({ user }) {
  const [profileData, setProfileData] = useState({
    displayName: "",
    email: "",
    photoURL: "",
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!user) return;

    const loadProfile = async () => {
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
    };

    loadProfile();
  }, [user]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!user) return;

    setUploading(true);

    const storageRef = ref(storage, `users/${user.uid}/profile.jpg`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    await setDoc(
      doc(db, "users", user.uid),
      { photoURL: url },
      { merge: true }
    );

    setProfileData((p) => ({ ...p, photoURL: url }));
    setUploading(false);
  };

  const avatar =
    profileData.photoURL ||
    `https://ui-avatars.com/api/?name=${profileData.displayName}&rounded=true`;

  if (!user) {
    return (
      <div className="pt-16 pb-24 px-4 text-center">
        <h2 className="text-xl">Please log in to view profile</h2>
      </div>
    );
  }

  return (
    <div className="pt-16 pb-24 px-4 md:pt-20 md:pb-10 md:px-8 min-h-screen bg-gray-100">
      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          Your Profile
        </h2>

        <div className="flex items-center gap-4 mb-6">
          <img
            src={avatar}
            alt="Profile"
            className="w-24 h-24 rounded-full border object-cover"
          />

          <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded text-sm md:text-base">
            {uploading ? "Uploading..." : "Change Photo"}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        </div>

        <div className="bg-white shadow rounded p-4 space-y-2">
          <p>
            <strong>Name:</strong> {profileData.displayName}
          </p>
          <p>
            <strong>Email:</strong> {profileData.email}
          </p>
        </div>

        <button
          onClick={logOut}
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
