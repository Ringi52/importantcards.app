"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { useLanguage } from "@/components/language-provider"
import LanguageSwitcherComponent from "@/components/language-switcher-component"

export default function Coinflip() {
  const { t } = useLanguage()
  const [result, setResult] = useState<"heads" | "tails" | null>(null)
  const [fairness, setFairness] = useState([50])
  const [isFlipping, setIsFlipping] = useState(false)

  const flipCoin = () => {
    setIsFlipping(true)
    setResult(null)

    setTimeout(() => {
      const random = Math.random() * 100
      const headsChance = fairness[0]
      setResult(random < headsChance ? "heads" : "tails")
      setIsFlipping(false)
    }, 1000)
  }

  return (
    <div className="max-w-md mx-auto py-6">
      <div className="flex justify-end mb-4">
        <LanguageSwitcherComponent />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t("coinflip")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">
                {t("fairness")}: {fairness[0]}% {t("heads")}
              </label>
              <Slider value={fairness} onValueChange={setFairness} max={100} min={0} step={1} className="mt-2" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>
                  {t("unfair")} ({t("tails")})
                </span>
                <span>{t("fair")}</span>
                <span>
                  {t("unfair")} ({t("heads")})
                </span>
              </div>
            </div>

            <div className="text-center">
              <div className="text-8xl mb-4">
                {isFlipping ? "🪙" : result === "heads" ? "👑" : result === "tails" ? "🦅" : "🪙"}
              </div>
              {result && !isFlipping && (
                <div className="text-2xl font-bold">{result === "heads" ? t("heads") : t("tails")}</div>
              )}
            </div>

            <Button onClick={flipCoin} disabled={isFlipping} className="w-full">
              {isFlipping ? "..." : t("flip")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
