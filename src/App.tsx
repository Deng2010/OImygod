import { useState } from 'react'
import { usePlayer } from './hooks/usePlayer'
import { NicknameSetup } from './components/NicknameSetup'
import { StartScreen } from './components/StartScreen'
import { GameScreen } from './components/GameScreen'

function App() {
  const { player, setNickname, hasNickname } = usePlayer()
  const [gameState, setGameState] = useState<'start' | 'playing'>('start')

  if (!hasNickname) {
    return <NicknameSetup onConfirm={setNickname} />
  }

  if (gameState === 'start') {
    return <StartScreen onStart={() => setGameState('playing')} />
  }

  return <GameScreen onBack={() => setGameState('start')} />
}

export default App
