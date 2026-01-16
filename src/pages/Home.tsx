import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Layout, Monitor, Palette, Rocket } from "lucide-react"
import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
            Production-Ready{" "}
            <span className="text-primary italic">Boilerplate</span>
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            A highly opinionated, scalable React starter with Vite, TypeScript,
            Tailwind 4, shadcn/ui, and OKLCH theming.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link to="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a
              href="https://github.com/shadcn-ui/ui"
              target="_blank"
              rel="noreferrer"
            >
              Documentation
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 pt-12 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={<Rocket className="text-primary h-6 w-6" />}
            title="Vite 6 + TS"
            description="Blazing fast dev server and type safety."
          />
          <FeatureCard
            icon={<Palette className="text-primary h-6 w-6" />}
            title="OKLCH Theme"
            description="Dynamic, perception-accurate color system."
          />
          <FeatureCard
            icon={<Layout className="text-primary h-6 w-6" />}
            title="shadcn/ui"
            description="Beautiful, accessible components pre-installed."
          />
          <FeatureCard
            icon={<Monitor className="text-primary h-6 w-6" />}
            title="Responsive"
            description="Built-in support for all screen sizes."
          />
        </div>
      </div>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="mb-2">{icon}</div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  )
}
