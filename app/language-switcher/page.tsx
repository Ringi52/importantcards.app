"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"
import LanguageSwitcherComponent from "@/components/language-switcher-component"

export default function LanguageSwitcher() {
  const { t } = useLanguage()
  const [currentLanguage, setCurrentLanguage] = useState({ code: "en", text: "Hello" })

  const languages = [
    { code: "en", text: "Hello" },
    { code: "cs", text: "Ahoj" },
    { code: "de", text: "Hallo" },
    { code: "es", text: "Hola" },
    { code: "fr", text: "Bonjour" },
    { code: "it", text: "Ciao" },
    { code: "ja", text: "こんにちは" },
    { code: "ko", text: "안녕하세요" },
    { code: "pl", text: "Cześć" },
    { code: "pt", text: "Olá" },
    { code: "ru", text: "Привет" },
    { code: "zh", text: "你好" },
  ]

  const switchLanguage = () => {
    const currentIndex = languages.findIndex((lang) => lang.code === currentLanguage.code)
    const nextIndex = (currentIndex + 1) % languages.length
    setCurrentLanguage(languages[nextIndex])
  }

  return (
    <div className="max-w-md mx-auto py-6">
      <div className="flex justify-end mb-4">
        <LanguageSwitcherComponent />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t("languageSwitcher")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl font-bold mb-2">{currentLanguage.text}</div>
            <div className="text-muted-foreground">{currentLanguage.code}</div>
          </div>

          <Button onClick={switchLanguage} className="w-full">
            {t("switchLanguage")}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
