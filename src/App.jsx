import { useState, useCallback } from 'react'
import BootSequence from './components/BootSequence'
import MainExperience from './components/MainExperience'

export default function App() {
  const [booted, setBooted] = useState(false)

  const handleBootComplete = useCallback(() => {
    setBooted(true)
  }, [])

  return (
    <>
      {!booted && <BootSequence onComplete={handleBootComplete} />}
      {booted  && <MainExperience />}
    </>
  )
}
