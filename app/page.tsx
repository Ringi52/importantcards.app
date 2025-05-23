"use client"

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dice5,
  FileText,
  Globe,
  SplitSquareVertical,
  Coins,
  Hand,
  MousePointer,
  Lightbulb,
  CircleHelp,
  Lock,
  Keyboard,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Home() {
  const { language, setLanguage, t } = useLanguage()

  const cards = [
    {
      title: t("dndDiceRoller"),
      description: "D4, D6, D8, D10, D12, D20, D100",
      icon: <Dice5 className="h-8 w-8" />,
      href: "/dice-roller",
    },
    {
      title: t("notepad"),
      description: t("notepadDesc"),
      icon: <FileText className="h-8 w-8" />,
      href: "/notepad",
    },
    {
      title: t("languageSwitcher"),
      description: "Hello, Bonjour, Hola, Ciao...",
      icon: <Globe className="h-8 w-8" />,
      href: "/language-switcher",
    },
    {
      title: t("montyHall"),
      description: t("montyHallDesc"),
      icon: <SplitSquareVertical className="h-8 w-8" />,
      href: "/monty-hall",
    },
    {
      title: t("coinflip"),
      description: t("coinflipDesc"),
      icon: <Coins className="h-8 w-8" />,
      href: "/coinflip",
    },
    {
      title: t("rockPaperScissors"),
      description: t("rockPaperScissorsDesc"),
      icon: <Hand className="h-8 w-8" />,
      href: "/rock-paper-scissors",
    },
    {
      title: t("clickSpeedTest"),
      description: t("clickSpeedTestDesc"),
      icon: <MousePointer className="h-8 w-8" />,
      href: "/click-speed-test",
    },
    {
      title: t("startupIdea"),
      description: t("startupIdeaDesc"),
      icon: <Lightbulb className="h-8 w-8" />,
      href: "/startup-idea",
    },
    {
      title: t("uselessButton"),
      description: t("uselessButtonDesc"),
      icon: <CircleHelp className="h-8 w-8" />,
      href: "/useless-button",
    },
    {
      title: t("textConverter"),
      description: t("textConverterDesc"),
      icon: <Lock className="h-8 w-8" />,
      href: "/text-converter",
    },
    {
      title: t("typingTest"),
      description: t("typingTestDesc"),
      icon: <Keyboard className="h-8 w-8" />,
      href: "/typing-test",
    },
    {
      title: t("insultGenerator"),
      description: t("insultGeneratorDesc"),
      icon: <MessageSquare className="h-8 w-8" />,
      href: "/insult-generator",
    },
  ]

  return (
    <div className="space-y-6 py-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t("cards")}</h1>
        <div className="flex items-center gap-2">
          <span>{t("language")}:</span>
          <Select value={language} onValueChange={(value) => setLanguage(value as "cs" | "en")}>
            <SelectTrigger className="w-[100px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cs">Čeština</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <Link href={card.href} key={index} className="block h-full">
            <Card className="h-full transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {card.icon}
                  {card.title}
                </CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="secondary" className="w-full">
                  {t("tryIt")} →
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
