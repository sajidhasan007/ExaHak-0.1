import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Check } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="container mx-auto py-16">
      <div className="mb-16 space-y-4 text-center">
        <h1 className="text-4xl font-bold">Simple, Transparent Pricing</h1>
        <p className="text-muted-foreground text-xl">
          Pay only for the compute you use. No hidden fees.
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
        <Card className="glass animate-reveal flex h-full flex-col">
          <CardHeader>
            <CardTitle>Basic</CardTitle>
            <CardDescription>For hobbyists and testing</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="mb-6 text-4xl font-bold">
              $0
              <span className="text-muted-foreground text-base font-normal">
                /mo
              </span>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center text-sm">
                <Check className="mr-2 h-4 w-4 text-[oklch(0.627_0.265_149.213)]" />{" "}
                100K Token Limit
              </li>
              <li className="flex items-center text-sm">
                <Check className="mr-2 h-4 w-4 text-[oklch(0.627_0.265_149.213)]" />{" "}
                Pay-as-you-go inference
              </li>
              <li className="flex items-center text-sm">
                <Check className="mr-2 h-4 w-4 text-[oklch(0.627_0.265_149.213)]" />{" "}
                Community Support
              </li>
            </ul>
          </CardContent>
          <CardFooter className="pt-6">
            <Button className="w-full" variant="outline">
              Get Started
            </Button>
          </CardFooter>
        </Card>

        <Card
          className="border-primary glass animate-reveal relative flex h-full flex-col shadow-lg"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="bg-primary text-primary-foreground absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-sm font-medium">
            Most Popular
          </div>
          <CardHeader>
            <CardTitle>Pro</CardTitle>
            <CardDescription>For growing teams</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="mb-6 text-4xl font-bold">
              $9
              <span className="text-muted-foreground text-base font-normal">
                /mo
              </span>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center text-sm">
                <Check className="mr-2 h-4 w-4 text-[oklch(0.627_0.265_149.213)]" />{" "}
                10M Token Limit
              </li>
              <li className="flex items-center text-sm">
                <Check className="mr-2 h-4 w-4 text-[oklch(0.627_0.265_149.213)]" />{" "}
                Lower inference rates
              </li>
              <li className="flex items-center text-sm">
                <Check className="mr-2 h-4 w-4 text-[oklch(0.627_0.265_149.213)]" />{" "}
                API Access
              </li>
              <li className="flex items-center text-sm">
                <Check className="mr-2 h-4 w-4 text-[oklch(0.627_0.265_149.213)]" />{" "}
                Priority Email Support
              </li>
            </ul>
          </CardContent>
          <CardFooter className="pt-6">
            <Button className="hover:shadow-primary/20 w-full shadow-lg transition-all">
              Start Free Trial
            </Button>
          </CardFooter>
        </Card>

        <Card
          className="glass animate-reveal flex h-full flex-col"
          style={{ animationDelay: "0.2s" }}
        >
          <CardHeader>
            <CardTitle>Enterprise</CardTitle>
            <CardDescription>For large scale needs</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="mb-6 text-4xl font-bold">Custom</div>
            <ul className="space-y-3">
              <li className="flex items-center text-sm">
                <Check className="mr-2 h-4 w-4 text-[oklch(0.627_0.265_149.213)]" />{" "}
                Unlimited Tokens
              </li>
              <li className="flex items-center text-sm">
                <Check className="mr-2 h-4 w-4 text-[oklch(0.627_0.265_149.213)]" />{" "}
                Volume discounts
              </li>
              <li className="flex items-center text-sm">
                <Check className="mr-2 h-4 w-4 text-[oklch(0.627_0.265_149.213)]" />{" "}
                Dedicated Infrastructure
              </li>
              <li className="flex items-center text-sm">
                <Check className="mr-2 h-4 w-4 text-[oklch(0.627_0.265_149.213)]" />{" "}
                24/7 SLA Support
              </li>
            </ul>
          </CardContent>
          <CardFooter className="pt-6">
            <Button className="w-full" variant="outline">
              Contact Sales
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
