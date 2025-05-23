"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"
import LanguageSwitcherComponent from "@/components/language-switcher-component"

type Choice = "rock" | "paper" | "scissors"

export default function RockPaperScissors() {
  const { t } = useLanguage()
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null)
  const [aiChoice, setAiChoice] = useState<Choice | null>(null)
  const [result, setResult] = useState<"win" | "lose" | "tie" | null>(null)
  const [playerHistory, setPlayerHistory] = useState<Choice[]>([])
  const [stats, setStats] = useState({ wins: 0, losses: 0, ties: 0 })

  const choices: Choice[] = ["rock", "paper", "scissors"]

  const getEmoji = (choice: Choice) => {
    switch (choice) {
      case "rock":
        return "🪨"
      case "paper":
        return "📄"
      case "scissors":
        return "✂️"
    }
  }

  const predictPlayerChoice = (): Choice => {
    if (playerHistory.length < 3) {
      return choices[Math.floor(Math.random() * 3)]
    }

    // Simple pattern detection: look for the most common choice in recent history
    const recent = playerHistory.slice(-5)
    const counts = { rock: 0, paper: 0, scissors: 0 }
    recent.forEach((choice) => counts[choice]++)

    const mostCommon = Object.entries(counts).reduce((a, b) =>
      counts[a[0] as Choice] > counts[b[0] as Choice] ? a : b,
    )[0] as Choice

    // Counter the predicted choice
    switch (mostCommon) {
      case "rock":
        return "paper"
      case "paper":
        return "scissors"
      case "scissors":
        return "rock"
    }
  }

  const playGame = (choice: Choice) => {
    const ai = predictPlayerChoice()
    setPlayerChoice(choice)
    setAiChoice(ai)
    setPlayerHistory((prev) => [...prev, choice])

    let gameResult: "win" | "lose" | "tie"
    if (choice === ai) {
      gameResult = "tie"
    } else if (
      (choice === "rock" && ai === "scissors") ||
      (choice === "paper" && ai === "rock") ||
      (choice === "scissors" && ai === "paper")
    ) {
      gameResult = "win"
    } else {
      gameResult = "lose"
    }

    setResult(gameResult)
    setStats((prev) => ({
      ...prev,
      [gameResult === "win" ? "wins" : gameResult === "lose" ? "losses" : "ties"]:
        prev[gameResult === "win" ? "wins" : gameResult === "lose" ? "losses" : "ties"] + 1,
    }))
  }

  const reset = () => {
    setPlayerChoice(null)
    setAiChoice(null)
    setResult(null)
  }

  return (
    <div className="max-w-md mx-auto py-6">
      <div className="flex justify-end mb-4">
        <LanguageSwitcherComponent />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t("rockPaperScissors")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            {playerChoice && aiChoice && (
              <div className="space-y-2">
                <div className="text-lg">
                  {t("youChose")}: {getEmoji(playerChoice)} {t(playerChoice)}
                </div>
                <div className="text-lg">
                  {t("aiChose")}: {getEmoji(aiChoice)} {t(aiChoice)}
                </div>
                <div className="text-xl font-bold">
                  {result === "win" && t("youWon")}
                  {result === "lose" && t("youLost")}
                  {result === "tie" && t("tie")}
                </div>
              </div>
            )}

            <div className="grid grid-cols-3 gap-2">
              {choices.map((choice) => (
                <Button key={choice} onClick={() => playGame(choice)} className="h-20 text-2xl" variant="outline">
                  <div className="text-center">
                    <div>{getEmoji(choice)}</div>
                    <div className="text-xs">{t(choice)}</div>
                  </div>
                </Button>
              ))}
            </div>

            <div className="text-sm text-muted-foreground">
              {t("wins")}: {stats.wins} | {t("losses")}: {stats.losses} | {t("ties")}: {stats.ties}
            </div>

            {result && (
              <Button onClick={reset} variant="outline" className="w-full">
                {t("reset")}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
