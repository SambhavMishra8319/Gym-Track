
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
