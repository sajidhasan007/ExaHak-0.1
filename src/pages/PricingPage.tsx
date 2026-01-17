import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="container py-16">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl font-bold">Simple, Transparent Pricing</h1>
        <p className="text-xl text-muted-foreground">Pay only for the compute you use. No hidden fees.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Developer</CardTitle>
            <CardDescription>For hobbyists and testing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-6">$0<span className="text-base font-normal text-muted-foreground">/mo</span></div>
            <ul className="space-y-3">
              <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Pay-as-you-go inference</li>
              <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Host 1 Model</li>
              <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Community Support</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline">Get Started</Button>
          </CardFooter>
        </Card>
        
        <Card className="border-primary shadow-lg relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </div>
          <CardHeader>
            <CardTitle>Startup</CardTitle>
            <CardDescription>For growing teams</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-6">$49<span className="text-base font-normal text-muted-foreground">/mo</span></div>
            <ul className="space-y-3">
              <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Lower inference rates</li>
              <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Host up to 5 Models</li>
              <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> API Access</li>
              <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Email Support</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Start Free Trial</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Enterprise</CardTitle>
            <CardDescription>For large scale needs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-6">Custom</div>
            <ul className="space-y-3">
              <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Volume discounts</li>
              <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Unlimited Models</li>
              <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Dedicated Infrastructure</li>
              <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> 24/7 SLA Support</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline">Contact Sales</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
