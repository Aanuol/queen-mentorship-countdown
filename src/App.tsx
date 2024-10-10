// src/App.tsx
import { FC } from 'react'
import CountdownTimer from './components/CountdownTimer'

const App: FC = () => {
  return (
    <div className="min-h-screen bg-purple-50 py-8">
      <CountdownTimer />
    </div>
  )
}

export default App