"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"
import LanguageSwitcherComponent from "@/components/language-switcher-component"

export default function UselessButton() {
  const { t } = useLanguage()
  const [message, setMessage] = useState("")
  const [clickCount, setClickCount] = useState(0)

  const messages = t("uselessMessages") as string[]

  const handleClick = () => {
    setClickCount((prev) => prev + 1)

    // 5% chance something happens
    if (Math.random() < 0.05) {
      setMessage("🎉 Něco se stalo! Gratulace! 🎉")
    } else {
      const randomMessage = messages[Math.floor(Math.random() * messages.length)]
      setMessage(randomMessage)
    }
  }

  return (
    <div className="max-w-md mx-auto py-6">
      <div className="flex justify-end mb-4">
        <LanguageSwitcherComponent />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t("uselessButton")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <Button onClick={handleClick} className="w-full h-20 text-xl" variant="outline">
              {t("clickMe")}
            </Button>

            {message && (
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-lg">{message}</div>
              </div>
            )}

            <div className="text-sm text-muted-foreground">Clicks: {clickCount}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
