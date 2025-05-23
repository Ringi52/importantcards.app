"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/components/language-provider"
import LanguageSwitcherComponent from "@/components/language-switcher-component"

export default function TextGlitcher() {
  const { t } = useLanguage()
  const [inputText, setInputText] = useState("")
  const [glitchedText, setGlitchedText] = useState("")

  const glitchCharacters = "!@#$%^&*()_+-=[]{}|;:,.<>?~`"
  const zalgoChars = "̴̵̶̷̸̡̢̧̨̛̖̗̘̙̜̝̞̟̠̣̤̥̦̩̪̫̬̭̮̯̰̱̲̳̹̺̻̼͇͈͉͍͎́̂̃̄̅̆̇̈̉̊̋̌̍̎̏̐̑̒̓̔̽̾̿̀́͂̓̈́͆͊͋͌̕̚ͅ"

  const glitchText = () => {
    if (!inputText) return

    let result = ""
    for (let i = 0; i < inputText.length; i++) {
      const char = inputText[i]

      if (Math.random() < 0.3) {
        // Add glitch characters
        result += char + glitchCharacters[Math.floor(Math.random() * glitchCharacters.length)]
      } else if (Math.random() < 0.2) {
        // Add zalgo characters
        result += char + zalgoChars[Math.floor(Math.random() * zalgoChars.length)]
      } else if (Math.random() < 0.1) {
        // Replace with random character
        result += glitchCharacters[Math.floor(Math.random() * glitchCharacters.length)]
      } else {
        result += char
      }
    }

    setGlitchedText(result)
  }

  return (
    <div className="max-w-md mx-auto py-6">
      <div className="flex justify-end mb-4">
        <LanguageSwitcherComponent />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t("textGlitcher")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input placeholder={t("inputText")} value={inputText} onChange={(e) => setInputText(e.target.value)} />
            <Button onClick={glitchText} className="w-full">
              {t("glitchText")}
            </Button>
          </div>

          {glitchedText && (
            <div className="p-4 bg-muted rounded-lg">
              <div className="font-mono text-lg break-all">{glitchedText}</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
