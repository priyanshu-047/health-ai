import { useState, useEffect, useRef } from 'react'
import {
  Search, AlertCircle, Clock, Pill,
  X, Activity, Moon, Sun,
  Stethoscope, Droplets, AlertTriangle, Shield, Brain
} from 'lucide-react'
import toast from 'react-hot-toast'
import { symptomApi } from '../services/api'

type TriageType = 'LOW_RISK' | 'MID_RISK' | 'HIGH_RISK' | 'CRITICAL_RISK'

type Disease = {
  name: string
  prob: number
}

type ResultType = {
  condition: string
  confidence: number
  triage: TriageType
  riskScore: number
  topDiseases: Disease[]
  recommendations: string[]
  remedies: string[]
  medicines: string[]
}

const getRiskFromTriage = (triage: TriageType) => {
  switch (triage) {
    case 'LOW_RISK':
      return { text: 'Low Risk', color: 'text-green-600', bg: 'bg-green-100' }
    case 'MID_RISK':
      return { text: 'Medium Risk', color: 'text-yellow-600', bg: 'bg-yellow-100' }
    case 'HIGH_RISK':
      return { text: 'High Risk', color: 'text-red-600', bg: 'bg-red-100' }
    case 'CRITICAL_RISK':
      return { text: 'Critical Risk', color: 'text-red-800', bg: 'bg-red-200' }
    default:
      return { text: 'Unknown', color: 'text-gray-500', bg: 'bg-gray-100' }
  }
}

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ResultType | null>(null)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const allSymptoms = [
    'Headache', 'Fever', 'Cough', 'Fatigue', 'Nausea',
    'Dizziness', 'Chest Pain', 'Shortness of Breath',
    'Diarrhea', 'Vomiting', 'Weight Loss', 'Anxiety'
  ]

  useEffect(() => {
    if (inputValue.length > 1) {
      setSuggestions(
        allSymptoms.filter(s =>
          s.toLowerCase().includes(inputValue.toLowerCase())
        ).slice(0, 5)
      )
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }, [inputValue])

  const addSymptom = (symptom: string) => {
    if (!symptoms.includes(symptom)) {
      setSymptoms([...symptoms, symptom])
      setInputValue('')
      toast.success(`Added: ${symptom}`)
    }
  }

  const removeSymptom = (symptom: string) => {
    setSymptoms(symptoms.filter(s => s !== symptom))
  }

  const handleSubmit = async () => {
    if (symptoms.length === 0) {
      toast.error('Add at least one symptom')
      return
    }

    setLoading(true)
    try {
      const res = await symptomApi.checkSymptoms(symptoms)
      const api = res.data

      const confidence = api.prediction?.confidence || 0

      const topDiseases = api.prediction?.all_predictions
        ?.slice(0, 3)
        .map((d: any) => ({
          name: d.disease.replace(/_/g, ' '),
          prob: Math.round(d.probability * 100)
        }))

      let condition = api.prediction?.top_disease || 'Unknown'
      if (confidence < 0.2) {
        condition = 'Multiple possible conditions'
      }

      setResult({
        condition,
        confidence: Math.round(confidence * 100),
        triage: api.triage || 'LOW_RISK',
        riskScore: api.risk_score || 0,
        topDiseases,
        recommendations: [
          api.recommendation || 'No recommendation',
          ...(api.warnings || [])
        ],
        remedies: api.home_remedies || [],
        medicines: (api.medicines || []).slice(0, 2)
      })

      toast.success('Analysis completed!')
    } catch {
      toast.error('API failed (demo mode)')
      setResult({
        condition: 'Common Cold',
        confidence: 85,
        triage: 'LOW_RISK',
        riskScore: 2,
        topDiseases: [
          { name: 'Common Cold', prob: 85 },
          { name: 'Flu', prob: 60 }
        ],
        recommendations: ['Rest', 'Drink fluids'],
        remedies: ['Warm water', 'Steam'],
        medicines: ['Paracetamol']
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-emerald-50'} min-h-screen p-6`}>

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold flex items-center">
          <Stethoscope className="mr-2 text-blue-500" /> Health-AI
        </h1>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Sun /> : <Moon />}
        </button>
      </div>

      {/* Input */}
      <div className="mb-6 relative max-w-xl">
        <Search className="absolute top-3 left-3 text-gray-400" />
        <input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter symptoms..."
          className="pl-10 p-3 w-full rounded-xl border shadow-sm"
        />

        {showSuggestions && (
          <div className="absolute w-full bg-white border mt-1 rounded-xl shadow z-10">
            {suggestions.map((s, i) => (
              <div key={i} onClick={() => addSymptom(s)} className="p-2 hover:bg-gray-100 cursor-pointer text-black">
                {s}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selected */}
      <div className="mb-4">
        {symptoms.map(s => (
          <span key={s} className="mr-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            {s}
            <X onClick={() => removeSymptom(s)} className="inline ml-1 cursor-pointer" size={14}/>
          </span>
        ))}
      </div>

      {/* Button */}
      <button onClick={handleSubmit} disabled={loading} className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg">
        {loading ? 'Analyzing...' : 'Check Symptoms'}
      </button>

      {/* Empty State */}
      {!result && (
        <div className="mt-10 text-center text-gray-400">
          <Brain size={40} className="mx-auto mb-2"/>
          <p>Enter symptoms and click "Check Symptoms"</p>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className={`mt-10 p-6 rounded-2xl shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          
          <h2 className="text-xl font-bold flex items-center mb-4">
            <Activity className="mr-2 text-blue-500" /> Analysis Result
          </h2>

          {/* Condition */}
          <h3 className="text-2xl font-bold">{result.condition}</h3>

          {/* Confidence */}
          <div className="mt-3">
            <div className="flex justify-between text-sm">
              <span>Confidence</span>
              <span>{result.confidence}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full mt-1">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"
                style={{ width: `${result.confidence}%` }}
              />
            </div>
          </div>

          {/* Risk */}
          <div className="mt-4">
            {(() => {
              const risk = getRiskFromTriage(result.triage)
              return (
                <span className={`px-4 py-1 rounded-full ${risk.bg} ${risk.color}`}>
                  <Shield className="inline mr-1" size={14}/> {risk.text}
                </span>
              )
            })()}
          </div>

          {/* Diseases */}
          <div className="mt-6">
            <h4 className="font-semibold">Possible Conditions</h4>
            <ul>
              {result.topDiseases.map((d, i) => (
                <li key={i}>{d.name} ({d.prob}%)</li>
              ))}
            </ul>
          </div>

          {/* Recommendations */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <h4 className="font-semibold flex items-center">
              <AlertCircle className="mr-2 text-blue-500"/> Recommendations
            </h4>
            <ul>
              {result.recommendations.map((r, i) => (
                <li key={i}>• {r}</li>
              ))}
            </ul>
          </div>

          {/* Remedies */}
          <div className="mt-4 p-4 bg-emerald-50 rounded-xl">
            <h4 className="font-semibold flex items-center">
              <Droplets className="mr-2 text-emerald-500"/> Remedies
            </h4>
            <ul>
              {result.remedies.map((r, i) => (
                <li key={i}>• {r}</li>
              ))}
            </ul>
          </div>

          {/* Medicines */}
          <div className="mt-4 p-4 bg-purple-50 rounded-xl">
            <h4 className="font-semibold flex items-center">
              <Pill className="mr-2 text-purple-500"/> Medicines
            </h4>
            <ul>
              {result.medicines.map((m, i) => (
                <li key={i}>• {m}</li>
              ))}
            </ul>
          </div>

          {/* Warning */}
          <div className="mt-6 p-3 bg-yellow-100 border-l-4 border-yellow-400 rounded">
            <AlertTriangle className="inline mr-2 text-yellow-600"/>
            AI-generated result. Consult a doctor if symptoms persist.
          </div>

        </div>
      )}
    </div>
  )
}

export default SymptomChecker