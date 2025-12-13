import React from 'react'

export default function Stats({ entries = [] }) {
  const totalWorkouts = entries.length
  let totalSets = 0
  let totalReps = 0
  entries.forEach(e => {
    e.exercises.forEach(ex => {
      ex.sets.forEach(s => {
        totalSets += 1
        totalReps += Number(s.reps) || 0
      })
    })
  })

  return (
    <div className="p-4 bg-white border rounded">
      <div className="font-medium">Stats</div>
      <div className="mt-2 text-sm text-gray-700">Total workouts: {totalWorkouts}</div>
      <div className="text-sm text-gray-700">Total sets logged: {totalSets}</div>
      <div className="text-sm text-gray-700">Total reps logged: {totalReps}</div>
    </div>
  )
}
