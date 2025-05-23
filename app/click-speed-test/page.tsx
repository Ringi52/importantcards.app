"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"
import LanguageSwitcherComponent from "@/components/language-switcher-component"

export default function ClickSpeedTest() {
  const { t, language } = useLanguage()
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(10)
  const [clicks, setClicks] = useState(0)
  const [result, setResult] = useState<number | null>(null)
  const [message, setMessage] = useState("")
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Get messages based on current language
  const getRandomMessage = () => {
    const messages = t("clickMessages") as string[]
    return messages[Math.floor(Math.random() * messages.length)]
  }

  const startTest = () => {
    setIsActive(true)
    setTimeLeft(10)
    setClicks(0)
    setResult(null)
    setMessage("")

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endTest()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const endTest = () => {
    setIsActive(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    const cps = clicks / 10
    setResult(cps)
    setMessage(getRandomMessage())
  }

  // Update message when language changes
  useEffect(() => {
    if (result !== null) {
      setMessage(getRandomMessage())
    }
  }, [language])

  const handleClick = () => {
    if (isActive) {
      setClicks((prev) => prev + 1)
    }
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return (
    <div className="max-w-md mx-auto py-6">
      <div className="flex justify-end mb-4">
        <LanguageSwitcherComponent />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t("clickSpeedTest")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            {!isActive && result === null && (
              <Button onClick={startTest} className="w-full h-20 text-xl">
                {t("startTest")}
              </Button>
            )}

            {isActive && (
              <div className="space-y-4">
                <div className="text-2xl font-bold">
                  {t("timeLeft")}: {timeLeft}s
                </div>
                <Button onClick={handleClick} className="w-full h-32 text-2xl" variant="destructive">
                  {t("clickMe")}!
                </Button>
                <div className="text-xl">Clicks: {clicks}</div>
              </div>
            )}

            {result !== null && (
              <div className="space-y-4">
                <div className="text-3xl font-bold">
                  {result.toFixed(2)} {t("clicksPerSecond")}
                </div>
                <div className="text-lg text-muted-foreground">{message}</div>
                <Button onClick={startTest} className="w-full">
                  {t("reset")}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
