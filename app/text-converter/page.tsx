"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/components/language-provider"
import LanguageSwitcherComponent from "@/components/language-switcher-component"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

type ConversionType = "morse" | "caesar" | "atbash"

export default function TextConverter() {
  const { t } = useLanguage()
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [conversionType, setConversionType] = useState<ConversionType>("morse")
  const [shift, setShift] = useState([3])

  const morseCode: { [key: string]: string } = {
    a: ".-",
    b: "-...",
    c: "-.-.",
    d: "-..",
    e: ".",
    f: "..-.",
    g: "--.",
    h: "....",
    i: "..",
    j: ".---",
    k: "-.-",
    l: ".-..",
    m: "--",
    n: "-.",
    o: "---",
    p: ".--.",
    q: "--.-",
    r: ".-.",
    s: "...",
    t: "-",
    u: "..-",
    v: "...-",
    w: ".--",
    x: "-..-",
    y: "-.--",
    z: "--..",
    "0": "-----",
    "1": ".----",
    "2": "..---",
    "3": "...--",
    "4": "....-",
    "5": ".....",
    "6": "-....",
    "7": "--...",
    "8": "---..",
    "9": "----.",
    ".": ".-.-.-",
    ",": "--..--",
    "?": "..--..",
    "'": ".----.",
    "!": "-.-.--",
    "/": "-..-.",
    "(": "-.--.",
    ")": "-.--.-",
    "&": ".-...",
    ":": "---...",
    ";": "-.-.-.",
    "=": "-...-",
    "+": ".-.-.",
    "-": "-....-",
    _: "..--.-",
    '"': ".-..-.",
    $: "...-..-",
    "@": ".--.-.",
    " ": "/",
  }

  const convertToMorse = (text: string): string => {
    return text
      .toLowerCase()
      .split("")
      .map((char) => morseCode[char] || char)
      .join(" ")
  }

  const caesarCipher = (text: string, shift: number): string => {
    return text
      .split("")
      .map((char) => {
        const code = char.charCodeAt(0)
        if (code >= 65 && code <= 90) {
          // Uppercase letters
          return String.fromCharCode(((code - 65 + shift) % 26) + 65)
        } else if (code >= 97 && code <= 122) {
          // Lowercase letters
          return String.fromCharCode(((code - 97 + shift) % 26) + 97)
        }
        return char
      })
      .join("")
  }

  const atbashCipher = (text: string): string => {
    return text
      .split("")
      .map((char) => {
        const code = char.charCodeAt(0)
        if (code >= 65 && code <= 90) {
          // Uppercase letters
          return String.fromCharCode(90 - (code - 65))
        } else if (code >= 97 && code <= 122) {
          // Lowercase letters
          return String.fromCharCode(122 - (code - 97))
        }
        return char
      })
      .join("")
  }

  const convertText = () => {
    if (!inputText) return

    let result = ""
    switch (conversionType) {
      case "morse":
        result = convertToMorse(inputText)
        break
      case "caesar":
        result = caesarCipher(inputText, shift[0])
        break
      case "atbash":
        result = atbashCipher(inputText)
        break
    }

    setOutputText(result)
  }

  return (
    <div className="max-w-md mx-auto py-6">
      <div className="flex justify-end mb-4">
        <LanguageSwitcherComponent />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t("textConverter")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label>{t("conversionType")}</label>
            <Select value={conversionType} onValueChange={(value) => setConversionType(value as ConversionType)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morse">{t("morse")}</SelectItem>
                <SelectItem value="caesar">{t("caesar")}</SelectItem>
                <SelectItem value="atbash">{t("atbash")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {conversionType === "caesar" && (
            <div className="space-y-2">
              <label>
                {t("shift")}: {shift[0]}
              </label>
              <Slider value={shift} onValueChange={setShift} max={25} min={1} step={1} />
            </div>
          )}

          <div className="space-y-2">
            <Input placeholder={t("inputText")} value={inputText} onChange={(e) => setInputText(e.target.value)} />
            <Button onClick={convertText} className="w-full">
              {t("convertText")}
            </Button>
          </div>

          {outputText && (
            <div className="p-4 bg-muted rounded-lg">
              <div className="font-mono text-lg break-all">{outputText}</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
