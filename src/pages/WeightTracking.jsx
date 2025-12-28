// // src/pages/WeightTracking.jsx - FULL WORKING FILE (copy entire):
// import React, { useState, useEffect } from "react";
// import { addWeight, getWeights, deleteWeight } from "../firebase/weightTracking";
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { format } from 'date-fns';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// export default function WeightTracking({ user }) {
//   const [weights, setWeights] = useState([]);
//   const [currentWeight, setCurrentWeight] = useState('');
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (user) loadWeights();
//   }, [user]);

//   const loadWeights = async () => {
//     setLoading(true);
//     const data = await getWeights(user.uid);
//     setWeights(data.sort((a, b) => new Date(a.date) - new Date(b.date)));
//     setLoading(false);
//   };

//   const saveWeight = async () => {
//     if (!currentWeight || !user) return;
    
//     await addWeight(user.uid, {
//       date: selectedDate,
//       weight: parseFloat(currentWeight),
//       createdAt: new Date().toISOString()
//     });
    
//     setCurrentWeight('');
//     loadWeights();
//     alert('✅ Weight saved!');
//   };

//   const deleteWeightEntry = async (id) => {
//     if (confirm('Delete this weight?')) {
//       await deleteWeight(user.uid, id);
//       loadWeights();
//     }
//   };

//   // Chart data
//   const chartData = {
//     labels: weights.map(w => format(new Date(w.date), 'MMM dd')),
//     datasets: [{
//       label: 'Body Weight (kg)',
//       data: weights.map(w => w.weight),
//       borderColor: 'rgb(59, 130, 246)',
//       backgroundColor: 'rgba(59, 130, 246, 0.1)',
//       tension: 0.4,
//       fill: true
//     }]
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: { position: 'top' },
//       title: { display: true, text: 'Weight Progress' }
//     },
//     scales: {
//       y: {
//         beginAtZero: false,
//         ticks: { callback: value => value + 'kg' }
//       }
//     }
//   };
  

//   if (loading) return <div className="p-8 text-center">Loading...</div>;

//   return (
//     <div className="p-4 max-w-6xl mx-auto">
//       <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//         ⚖️ Weight Tracking
//       </h1>

//       {/* Add Weight Section */}
//       <div className="bg-white p-8 rounded-2xl shadow-xl mb-8">
//         <h2 className="text-2xl font-bold mb-6">Add Weight</h2>
//         <div className="grid md:grid-cols-3 gap-6 items-end">
//           <div>
//             <label className="block text-sm font-medium mb-2">Date</label>
//             <input
//               type="date"
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value)}
//               max={new Date().toISOString().slice(0, 10)}
//               className="w-full p-3 border rounded-xl"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-2">Weight (kg)</label>
//             <input
//               type="number"
//               step="0.1"
//               value={currentWeight}
//               onChange={(e) => setCurrentWeight(e.target.value)}
//               placeholder="70.5"
//               className="w-full p-3 border rounded-xl text-2xl font-bold"
//             />
//           </div>
//           <button
//             onClick={saveWeight}
//             disabled={!currentWeight}
//             className="px-8 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 disabled:opacity-50 shadow-lg"
//           >
//             Save Weight
//           </button>
//         </div>
//       </div>

//      {/* Recent Weights */}
// <div className="bg-white p-6 rounded-2xl shadow-xl mb-8">
//   <h3 className="text-xl font-bold mb-4">Recent Weights</h3>
//   <div className="space-y-3">
//     {weights.slice(-10).reverse().map((w) => (
//       <div key={w.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
//         <div className="flex-1">
//           <div className="font-bold text-lg">{w.weight}kg</div>
//           <div className="text-sm text-gray-500">{format(new Date(w.date), 'MMM dd, yyyy')}</div>
//         </div>
//         <div className="flex gap-2">
//           <button
//             onClick={() => {
//               setCurrentWeight(w.weight.toString());
//               setSelectedDate(w.date);
//             }}
//             className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded hover:bg-blue-200 font-medium"
//             title="Edit weight"
//           >
//             ✏️ Edit
//           </button>
//           <button
//             onClick={() => deleteWeightEntry(w.id)}
//             className="px-3 py-1 bg-red-100 text-red-700 text-xs rounded hover:bg-red-200 font-medium"
//             title="Delete weight"
//           >
//             🗑️ Delete
//           </button>
//         </div>
//       </div>
//     ))}
//     {weights.length === 0 && (
//       <p className="text-center py-8 text-gray-500">No weights recorded yet</p>
//     )}
//   </div>
// </div>


//       {/* Chart */}
//       {weights.length > 1 && (
//         <div className="bg-white p-8 rounded-2xl shadow-xl mb-8">
//           <Line data={chartData} options={options} />
//         </div>
//       )}

//       {/* 👇 WEIGHT ANALYTICS */}
//       {weights.length > 0 && (
//         <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
//           {/* Current Weight */}
//           <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-xl text-center">
//             <div className="text-3xl font-bold">{weights[weights.length - 1]?.weight}kg</div>
//             <div className="text-blue-100 mt-1">Current</div>
//           </div>

//           {/* Change from start */}
//           {weights.length > 1 && (
//             <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-xl text-center">
//               <div className="text-3xl font-bold">
//                 {((weights[weights.length - 1].weight - weights[0].weight).toFixed(1))}kg
//               </div>
//               <div className="text-green-100 mt-1">
//                 {weights[weights.length - 1].weight > weights[0].weight ? '↑ Total Gain' : '↓ Total Loss'}
//               </div>
//             </div>
//           )}

//           {/* 7-day average */}
//           {weights.length > 0 && (
//             <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-xl text-center">
//               <div className="text-3xl font-bold">
//                 {(weights.slice(-7).reduce((sum, w) => sum + w.weight, 0) / Math.max(1, weights.slice(-7).length)).toFixed(1)}kg
//               </div>
//               <div className="text-purple-100 mt-1">7-day Avg</div>
//             </div>
//           )}

//           {/* Best / Worst */}
//           {weights.length > 1 && (
//             <>
//               <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-6 rounded-2xl shadow-xl text-center">
//                 <div className="text-3xl font-bold">
//                   {Math.max(...weights.map(w => w.weight)).toFixed(1)}kg
//                 </div>
//                 <div className="text-emerald-100 mt-1">Peak</div>
//               </div>
//               <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-2xl shadow-xl text-center">
//                 <div className="text-3xl font-bold">
//                   {Math.min(...weights.map(w => w.weight)).toFixed(1)}kg
//                 </div>
//                 <div className="text-orange-100 mt-1">Lowest</div>
//               </div>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
// src/pages/WeightTracking.jsx - FULL EDIT VERSION
import React, { useState, useEffect } from "react";
import { addWeight, getWeights, deleteWeight, updateWeight } from "../firebase/weightTracking"; // 👈 ADD updateWeight
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { format } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function WeightTracking({ user }) {
  const [weights, setWeights] = useState([]);
  const [currentWeight, setCurrentWeight] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null); // 👈 EDIT STATE

  useEffect(() => {
    if (user) loadWeights();
  }, [user]);

  const loadWeights = async () => {
    setLoading(true);
    const data = await getWeights(user.uid);
    setWeights(data.sort((a, b) => new Date(a.date) - new Date(b.date)));
    setLoading(false);
  };

  // 👇 UPDATED SAVE FUNCTION (handles add + edit)
  const saveWeight = async () => {
    if (!currentWeight || !user) return;
    
    try {
      if (editingId) {
        // EDIT existing weight
        await updateWeight(user.uid, editingId, {
          date: selectedDate,
          weight: parseFloat(currentWeight),
          updatedAt: new Date().toISOString()
        });
        alert('✅ Weight updated!');
      } else {
        // ADD new weight
        await addWeight(user.uid, {
          date: selectedDate,
          weight: parseFloat(currentWeight),
          createdAt: new Date().toISOString()
        });
        alert('✅ Weight saved!');
      }
      
      // Reset form
      setCurrentWeight('');
      setSelectedDate(new Date().toISOString().slice(0, 10));
      setEditingId(null);
      loadWeights();
    } catch (error) {
      alert('Error saving weight');
      console.error(error);
    }
  };

  const deleteWeightEntry = async (id) => {
    if (confirm('Delete this weight?')) {
      await deleteWeight(user.uid, id);
      loadWeights();
    }
  };

  // Chart data
  const chartData = {
    labels: weights.map(w => format(new Date(w.date), 'MMM dd')),
    datasets: [{
      label: 'Body Weight (kg)',
      data: weights.map(w => w.weight),
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4,
      fill: true
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Weight Progress' }
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: { callback: value => value + 'kg' }
      }
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        ⚖️ Weight Tracking
      </h1>

      {/* Add/Edit Weight Section */}
      <div className="bg-white p-8 rounded-2xl shadow-xl mb-8">
        <h2 className="text-2xl font-bold mb-6">
          {editingId ? '✏️ Edit Weight' : '➕ Add Weight'}
        </h2>
        <div className="grid md:grid-cols-3 gap-6 items-end">
          <div>
            <label className="block text-sm font-medium mb-2">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              max={new Date().toISOString().slice(0, 10)}
              className="w-full p-3 border rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Weight (kg)</label>
            <input
              type="number"
              step="0.1"
              value={currentWeight}
              onChange={(e) => setCurrentWeight(e.target.value)}
              placeholder="70.5"
              className="w-full p-3 border rounded-xl text-2xl font-bold"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={saveWeight}
              disabled={!currentWeight}
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 disabled:opacity-50 shadow-lg"
            >
              {editingId ? 'Update Weight' : 'Save Weight'}
            </button>
            {editingId && (
              <button
                onClick={() => {
                  setCurrentWeight('');
                  setSelectedDate(new Date().toISOString().slice(0, 10));
                  setEditingId(null);
                }}
                className="px-6 py-3 bg-gray-500 text-white rounded-xl font-bold hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Recent Weights */}
      <div className="bg-white p-6 rounded-2xl shadow-xl mb-8">
        <h3 className="text-xl font-bold mb-4">Recent Weights</h3>
        <div className="space-y-3">
          {weights.slice(-10).reverse().map((w) => (
            <div key={w.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
              <div className="flex-1">
                <div className="font-bold text-lg">{w.weight}kg</div>
                <div className="text-sm text-gray-500">{format(new Date(w.date), 'MMM dd, yyyy')}</div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setCurrentWeight(w.weight.toString());
                    setSelectedDate(w.date);
                    setEditingId(w.id);
                  }}
                  className="px-4 py-2 bg-blue-100 text-blue-700 text-sm rounded-lg hover:bg-blue-200 font-medium"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => deleteWeightEntry(w.id)}
                  className="px-4 py-2 bg-red-100 text-red-700 text-sm rounded-lg hover:bg-red-200 font-medium"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
          {weights.length === 0 && (
            <p className="text-center py-8 text-gray-500">No weights recorded yet</p>
          )}
        </div>
      </div>

      {/* Chart */}
      {weights.length > 1 && (
        <div className="bg-white p-8 rounded-2xl shadow-xl mb-8">
          <Line data={chartData} options={options} />
        </div>
      )}

      {/* WEIGHT ANALYTICS */}
      {weights.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-xl text-center">
            <div className="text-3xl font-bold">{weights[weights.length - 1]?.weight}kg</div>
            <div className="text-blue-100 mt-1">Current</div>
          </div>
          {weights.length > 1 && (
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-xl text-center">
              <div className="text-3xl font-bold">
                {((weights[weights.length - 1].weight - weights[0].weight).toFixed(1))}kg
              </div>
              <div className="text-green-100 mt-1">
                {weights[weights.length - 1].weight > weights[0].weight ? '↑ Total Gain' : '↓ Total Loss'}
              </div>
            </div>
          )}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-xl text-center">
            <div className="text-3xl font-bold">
              {(weights.slice(-7).reduce((sum, w) => sum + w.weight, 0) / Math.max(1, weights.slice(-7).length)).toFixed(1)}kg
            </div>
            <div className="text-purple-100 mt-1">7-day Avg</div>
          </div>
          {weights.length > 1 && (
            <>
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-6 rounded-2xl shadow-xl text-center">
                <div className="text-3xl font-bold">
                  {Math.max(...weights.map(w => w.weight)).toFixed(1)}kg
                </div>
                <div className="text-emerald-100 mt-1">Peak</div>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-2xl shadow-xl text-center">
                <div className="text-3xl font-bold">
                  {Math.min(...weights.map(w => w.weight)).toFixed(1)}kg
                </div>
                <div className="text-orange-100 mt-1">Lowest</div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
