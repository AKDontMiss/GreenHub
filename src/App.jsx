import { useState, useEffect, useCallback } from 'react'
import BootSequence from './components/BootSequence'
import MainExperience from './components/MainExperience'

export default function App() {
  const [booted, setBooted] = useState(false)
  const [config, setConfig] = useState(null)

  useEffect(() => {
    fetch('./config.json') 
      .then((res) => res.json())
      .then((data) => {
        if (data.showBirthdayIntro === false) {
          window.location.replace(data.redirectUrl);
        } else {
          setConfig(data);
        }
      })
      .catch((err) => {
        console.error("Config missing or error:", err);
        setConfig({ showBirthdayIntro: true, redirectUrl: '#' });
      });
  }, []);

  const handleBootComplete = useCallback(() => {
    setBooted(true)
  }, [])

  if (!config) return null;

  return (
    <>
      {!booted && <BootSequence onComplete={handleBootComplete} />}
      {booted  && <MainExperience config={config} />}
    </>
  )
}
