"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/components/language-provider"
import LanguageSwitcherComponent from "@/components/language-switcher-component"

export default function TypingTest() {
  const { t } = useLanguage()
  const [currentSentence, setCurrentSentence] = useState("")
  const [userInput, setUserInput] = useState("")
  const [isActive, setIsActive] = useState(false)
  const [countdown, setCountdown] = useState(3)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [result, setResult] = useState<{ wpm: number; accuracy: number } | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const sentences = t("typingSentences") as string[]

  const startTest = () => {
    const randomSentence = sentences[Math.floor(Math.random() * sentences.length)]
    setCurrentSentence(randomSentence)
    setUserInput("")
    setResult(null)
    setCountdown(3)

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval)
          setIsActive(true)
          setStartTime(Date.now())
          if (inputRef.current) {
            inputRef.current.focus()
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleInputChange = (value: string) => {
    if (!isActive) return

    setUserInput(value)

    if (value === currentSentence) {
      finishTest()
    }
  }

  const finishTest = () => {
    if (!startTime) return

    setIsActive(false)
    const endTime = Date.now()
    const timeInMinutes = (endTime - startTime) / 60000

    const wordsTyped = currentSentence.split(" ").length
    const wpm = Math.round(wordsTyped / timeInMinutes)

    let correctChars = 0
    for (let i = 0; i < Math.min(userInput.length, currentSentence.length); i++) {
      if (userInput[i] === currentSentence[i]) {
        correctChars++
      }
    }
    const accuracy = Math.round((correctChars / currentSentence.length) * 100)

    setResult({ wpm, accuracy })
  }

  return (
    <div className="max-w-2xl mx-auto py-6">
      <div className="flex justify-end mb-4">
        <LanguageSwitcherComponent />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t("typingTest")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!currentSentence && (
            <Button onClick={startTest} className="w-full">
              {t("startTyping")}
            </Button>
          )}

          {countdown > 0 && currentSentence && (
            <div className="text-center">
              <div className="text-6xl font-bold">{countdown}</div>
            </div>
          )}

          {currentSentence && countdown === 0 && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-lg font-mono">
                  {currentSentence.split("").map((char, index) => (
                    <span
                      key={index}
                      className={
                        index < userInput.length
                          ? userInput[index] === char
                            ? "text-green-600"
                            : "text-red-600 bg-red-100"
                          : ""
                      }
                    >
                      {char}
                    </span>
                  ))}
                </div>
              </div>

              <Input
                ref={inputRef}
                value={userInput}
                onChange={(e) => handleInputChange(e.target.value)}
                disabled={!isActive}
                className="font-mono"
                placeholder="Začněte psát..."
              />

              {result && (
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold">
                    {result.wpm} {t("wpm")}
                  </div>
                  <div className="text-lg">
                    {t("accuracy")}: {result.accuracy}%
                  </div>
                  <Button onClick={startTest} className="w-full">
                    {t("reset")}
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
