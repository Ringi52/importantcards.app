"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/components/language-provider"
import LanguageSwitcherComponent from "@/components/language-switcher-component"
import { Copy, Clipboard } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info } from "lucide-react"

export default function Notepad() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [notes, setNotes] = useState("")
  const [showPasteInfo, setShowPasteInfo] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const savedNotes = localStorage.getItem("importantCards-notes")
    if (savedNotes) {
      setNotes(savedNotes)
    }
  }, [])

  const saveNotes = () => {
    localStorage.setItem("importantCards-notes", notes)
    toast({
      title: "Uloženo",
      description: "Vaše poznámky byly uloženy",
    })
  }

  const clearNotes = () => {
    setNotes("")
    localStorage.removeItem("importantCards-notes")
  }

  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(notes)
      toast({
        title: "Zkopírováno",
        description: "Text byl zkopírován do schránky",
      })
    } catch (err) {
      console.error("Failed to copy text: ", err)
      toast({
        title: "Chyba",
        description: "Nepodařilo se zkopírovat text",
        variant: "destructive",
      })
    }
  }

  const pasteText = async () => {
    try {
      // Focus the textarea to make sure it's active
      if (textareaRef.current) {
        textareaRef.current.focus()

        // Try to use the modern clipboard API
        const clipboardText = await navigator.clipboard.readText().catch(() => null)

        if (clipboardText) {
          // If we got text from the clipboard API, insert it at the cursor position
          const start = textareaRef.current.selectionStart || 0
          const end = textareaRef.current.selectionEnd || 0
          const newText = notes.substring(0, start) + clipboardText + notes.substring(end)
          setNotes(newText)
        } else {
          // Show paste info alert
          setShowPasteInfo(true)
        }
      }
    } catch (err) {
      console.error("Failed to paste text: ", err)
      setShowPasteInfo(true)
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-6">
      <div className="flex justify-end mb-4">
        <LanguageSwitcherComponent />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t("notepad")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {showPasteInfo && (
            <Alert className="mb-4">
              <Info className="h-4 w-4" />
              <AlertDescription>
                V tomto prostředí tlačítko "Vložit" nemusí fungovat kvůli bezpečnostním omezením prohlížeče. Použijte
                prosím klávesovou zkratku Ctrl+V (nebo Cmd+V na Mac).
              </AlertDescription>
              <Button variant="outline" size="sm" className="mt-2 text-xs" onClick={() => setShowPasteInfo(false)}>
                Rozumím
              </Button>
            </Alert>
          )}

          <Textarea
            ref={textareaRef}
            placeholder={t("yourNotes")}
            className="min-h-[300px]"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <div className="flex gap-2">
              <Button onClick={saveNotes}>{t("save")}</Button>
              <Button variant="outline" onClick={clearNotes}>
                {t("clear")}
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={copyAll}>
                <Copy className="h-4 w-4 mr-2" />
                {t("copyAll")}
              </Button>
              <Button variant="outline" onClick={pasteText}>
                <Clipboard className="h-4 w-4 mr-2" />
                {t("paste")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
