"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"
import LanguageSwitcherComponent from "@/components/language-switcher-component"
import { MessageSquare } from "lucide-react"

export default function InsultGenerator() {
  const { t } = useLanguage()
  const [currentInsult, setCurrentInsult] = useState("")

  const insults = t("insults") as string[]

  const generateInsult = () => {
    const randomInsult = insults[Math.floor(Math.random() * insults.length)]
    setCurrentInsult(randomInsult)
  }

  return (
    <div className="max-w-md mx-auto py-6">
      <div className="flex justify-end mb-4">
        <LanguageSwitcherComponent />
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6" />
            {t("insultGenerator")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            {currentInsult && (
              <div className="p-6 bg-muted rounded-lg">
                <div className="text-lg italic">"{currentInsult}"</div>
              </div>
            )}

            <Button onClick={generateInsult} className="w-full">
              {t("generateInsult")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
