import React from 'react'

export default function Stats({ entries = [] }) {
  const totalWorkouts = entries.length
  let totalSets = 0
  let totalReps = 0

  entries.forEach(e => {
    ;(e.exercises || []).forEach(ex => {
      ;(ex.sets || []).forEach(s => {
        totalSets += 1
        totalReps += Number(s.reps) || 0
      })
    })
  })

  const items = [
    ['Workouts', totalWorkouts, '🏋️'],
    ['Sets', totalSets, '📈'],
    ['Reps', totalReps, '⚡'],
  ]

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-500 dark:text-blue-300">Overview</p>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">Stats</h3>
        </div>
      </div>
      <div className="grid gap-3">
        {items.map(([label, value, icon]) => (
          <div key={label} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-300">{label}</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{value}</p>
            </div>
            <span className="text-2xl">{icon}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
