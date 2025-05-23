"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import LanguageSwitcherComponent from "@/components/language-switcher-component"

export default function DiceRoller() {
  const { t } = useLanguage()
  const [diceType, setDiceType] = useState("20")
  const [numberOfDice, setNumberOfDice] = useState(1)
  const [results, setResults] = useState<number[]>([])
  const [total, setTotal] = useState<number | null>(null)
  const [isRolling, setIsRolling] = useState(false)

  const diceTypes = ["4", "6", "8", "10", "12", "20", "100"]

  const rollDice = () => {
    setIsRolling(true)

    // Play dice rolling sound effect - shorter and quieter
    const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/3125/3125-preview.mp3")
    audio.volume = 0.2 // Reduced volume to 20%
    audio.play().catch((e) => console.error("Error playing sound:", e))

    setTimeout(() => {
      const max = Number.parseInt(diceType)
      const rolls = Array.from({ length: numberOfDice }, () => Math.floor(Math.random() * max) + 1)
      setResults(rolls)
      setTotal(rolls.reduce((sum, roll) => sum + roll, 0))
      setIsRolling(false)
    }, 800)
  }

  const getDiceIcon = (result: number) => {
    if (diceType === "6") {
      switch (result) {
        case 1:
          return <Dice1 className="h-8 w-8" />
        case 2:
          return <Dice2 className="h-8 w-8" />
        case 3:
          return <Dice3 className="h-8 w-8" />
        case 4:
          return <Dice4 className="h-8 w-8" />
        case 5:
          return <Dice5 className="h-8 w-8" />
        case 6:
          return <Dice6 className="h-8 w-8" />
        default:
          return result
      }
    }
    return result
  }

  return (
    <div className="max-w-md mx-auto py-6">
      <div className="flex justify-end mb-4">
        <LanguageSwitcherComponent />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t("dndDiceRoller")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label>{t("selectDiceType")}</label>
            <Select value={diceType} onValueChange={setDiceType}>
              <SelectTrigger>
                <SelectValue placeholder="D20" />
              </SelectTrigger>
              <SelectContent>
                {diceTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    D{type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label>{t("numberOfDice")}</label>
            <Input
              type="number"
              min="1"
              max="10"
              value={numberOfDice}
              onChange={(e) => setNumberOfDice(Number.parseInt(e.target.value) || 1)}
            />
          </div>

          <Button onClick={rollDice} className="w-full" disabled={isRolling}>
            {isRolling ? "..." : t("roll")}
          </Button>

          {results.length > 0 && (
            <div className="mt-4 space-y-2">
              <div className="text-lg font-bold">
                {t("result")}: {total}
              </div>
              <div className="flex flex-wrap gap-2">
                {results.map((result, index) => (
                  <div key={index} className="flex items-center justify-center bg-muted rounded-md p-2">
                    {getDiceIcon(result)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
