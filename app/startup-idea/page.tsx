"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"
import LanguageSwitcherComponent from "@/components/language-switcher-component"
import { Lightbulb } from "lucide-react"

export default function StartupIdea() {
  const { t } = useLanguage()
  const [currentIdea, setCurrentIdea] = useState("")

  const ideas = t("startupIdeas") as string[]

  const generateIdea = () => {
    const randomIdea = ideas[Math.floor(Math.random() * ideas.length)]
    setCurrentIdea(randomIdea)
  }

  return (
    <div className="max-w-md mx-auto py-6">
      <div className="flex justify-end mb-4">
        <LanguageSwitcherComponent />
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6" />
            {t("startupIdea")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            {currentIdea && (
              <div className="p-6 bg-muted rounded-lg">
                <div className="text-xl font-semibold">{currentIdea}</div>
              </div>
            )}

            <Button onClick={generateIdea} className="w-full">
              {t("generateIdea")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
