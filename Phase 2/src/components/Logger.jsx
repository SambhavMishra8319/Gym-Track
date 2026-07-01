import React, { useState } from 'react'
import { addDoc } from 'firebase/firestore'
// import { workoutsCollection } from '../firebase'
import { workoutsCollection } from "../firebase/config";

const defaultExercise = { name: '', sets: 3, reps: 8, weight: '', notes: '' }

export default function Logger({ userId }){
  const [date, setDate] = useState(new Date().toISOString().slice(0,10))
  const [exercises, setExercises] = useState([ {...defaultExercise} ])
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  function updateExercise(idx, field, value){
    const copy = [...exercises]
    copy[idx][field] = value
    setExercises(copy)
  }

  function addRow(){ setExercises(prev => [...prev, {...defaultExercise}]) }
  function removeRow(i){ setExercises(prev => prev.filter((_,idx)=>idx!==i)) }

  async function save(){
    setSaving(true)
    setMessage('')
    try{
      const payload = { date, exercises, createdAt: new Date().toISOString() }
      await addDoc(workoutsCollection(userId), payload)
      setMessage('Saved ✅')
      setExercises([ {...defaultExercise} ])
    }catch(e){
      console.error(e)
      setMessage('Error saving')
    }
    setSaving(false)
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Log Workout</h2>
      <div className="mb-4">
        <label className="block text-sm">Date</label>
        <input type="date" className="mt-1 p-2 border rounded" value={date} onChange={e=>setDate(e.target.value)} />
      </div>

      <div className="space-y-3 mb-4">
        {exercises.map((ex, idx)=> (
          <div key={idx} className="grid grid-cols-12 gap-2 items-end">
            <div className="col-span-4">
              <label className="text-xs">Exercise</label>
              <input value={ex.name} onChange={e=>updateExercise(idx,'name',e.target.value)} placeholder="e.g. Bench Press" className="w-full p-2 border rounded" />
            </div>
            <div className="col-span-2">
              <label className="text-xs">Sets</label>
              <input type="number" value={ex.sets} onChange={e=>updateExercise(idx,'sets',Number(e.target.value))} className="w-full p-2 border rounded" />
            </div>
            <div className="col-span-2">
              <label className="text-xs">Reps</label>
              <input type="number" value={ex.reps} onChange={e=>updateExercise(idx,'reps',Number(e.target.value))} className="w-full p-2 border rounded" />
            </div>
            <div className="col-span-2">
              <label className="text-xs">Weight</label>
              <input value={ex.weight} onChange={e=>updateExercise(idx,'weight',e.target.value)} placeholder="kg" className="w-full p-2 border rounded" />
            </div>
            <div className="col-span-2">
              <button onClick={()=>removeRow(idx)} className="text-sm text-red-600">Remove</button>
            </div>

            <div className="col-span-12">
              <label className="text-xs">Notes</label>
              <input value={ex.notes} onChange={e=>updateExercise(idx,'notes',e.target.value)} className="w-full p-2 border rounded" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button onClick={addRow} className="px-4 py-2 bg-gray-100 rounded">Add Exercise</button>
        <button onClick={save} disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded">{saving? 'Saving...' : 'Save Workout'}</button>
      </div>

      {message && <p className="mt-3">{message}</p>}
    </div>
  )
}
