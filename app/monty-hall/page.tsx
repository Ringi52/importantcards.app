"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"
import LanguageSwitcherComponent from "@/components/language-switcher-component"

enum GameState {
  Initial = 0,
  DoorSelected = 1,
  RevealedDoor = 2,
  GameOver = 3,
}

export default function MontyHall() {
  const { t } = useLanguage()
  const [gameState, setGameState] = useState<GameState>(GameState.Initial)
  const [doors, setDoors] = useState<Array<"goat" | "car" | "unknown">>(["unknown", "unknown", "unknown"])
  const [selectedDoor, setSelectedDoor] = useState<number | null>(null)
  const [revealedDoor, setRevealedDoor] = useState<number | null>(null)
  const [result, setResult] = useState<"win" | "lose" | null>(null)

  const initGame = () => {
    setDoors(["unknown", "unknown", "unknown"])
    setSelectedDoor(null)
    setRevealedDoor(null)
    setResult(null)
    setGameState(GameState.Initial)
  }

  const selectDoor = (doorIndex: number) => {
    setSelectedDoor(doorIndex)

    // Create the actual doors with a car behind one of them
    const carPosition = Math.floor(Math.random() * 3)
    const actualDoors: Array<"goat" | "car"> = ["goat", "goat", "goat"]
    actualDoors[carPosition] = "car"

    // Find a door with a goat that is not the selected door
    const goatDoorIndexes = actualDoors
      .map((content, index) => ({ content, index }))
      .filter((door) => door.content === "goat" && door.index !== doorIndex)
      .map((door) => door.index)

    const doorToReveal = goatDoorIndexes[Math.floor(Math.random() * goatDoorIndexes.length)]
    setRevealedDoor(doorToReveal)

    // Store the actual doors for later use
    setDoors(actualDoors)
    setGameState(GameState.RevealedDoor)
  }

  const switchDoor = () => {
    if (selectedDoor === null || revealedDoor === null) return

    // Find the door that is neither selected nor revealed
    const newDoor = [0, 1, 2].find((i) => i !== selectedDoor && i !== revealedDoor)

    if (newDoor !== undefined) {
      setSelectedDoor(newDoor)
      finishGame(newDoor)
    }
  }

  const keepDoor = () => {
    if (selectedDoor === null) return
    finishGame(selectedDoor)
  }

  const finishGame = (finalDoor: number) => {
    // Determine if player won
    setResult(doors[finalDoor] === "car" ? "win" : "lose")
    setGameState(GameState.GameOver)
  }

  const renderDoor = (index: number) => {
    const isSelected = selectedDoor === index
    const isRevealed = revealedDoor === index || gameState === GameState.GameOver

    let content
    if (isRevealed) {
      content = doors[index] === "car" ? "🚗" : "🐐"
    } else {
      content = `${index + 1}`
    }

    return (
      <Button
        key={index}
        onClick={() => gameState === GameState.Initial && selectDoor(index)}
        disabled={gameState !== GameState.Initial}
        variant={isSelected ? "default" : "outline"}
        className="h-32 w-24 text-2xl"
      >
        {content}
      </Button>
    )
  }

  return (
    <div className="max-w-md mx-auto py-6">
      <div className="flex justify-end mb-4">
        <LanguageSwitcherComponent />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t("montyHall")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center gap-4">{[0, 1, 2].map(renderDoor)}</div>

          <div className="space-y-2">
            {gameState === GameState.Initial && <div className="text-center text-lg">{t("chooseADoor")}</div>}

            {gameState === GameState.RevealedDoor && (
              <div className="flex gap-2">
                <Button onClick={switchDoor} className="flex-1">
                  {t("switchDoor")}
                </Button>
                <Button onClick={keepDoor} variant="outline" className="flex-1">
                  {t("keepDoor")}
                </Button>
              </div>
            )}

            {gameState === GameState.GameOver && (
              <div className="text-center">
                <div className="text-xl font-bold mb-2">{result === "win" ? t("youWon") : t("youLost")}</div>
                <Button onClick={initGame}>{t("reset")}</Button>
              </div>
            )}

            {gameState === GameState.Initial && (
              <div className="text-sm text-muted-foreground mt-4">{t("montyHallExplanation")}</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
