import { Github, Linkedin, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">AI Platform</h3>
            <p className="text-muted-foreground text-sm">
              Empowering developers and businesses with cutting-edge AI
              solutions.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase">
              Product
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/models"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Models
                </a>
              </li>
              <li>
                <a
                  href="/pricing"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="/api-docs"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  API
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/careers"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase">
              Connect
            </h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-xs">
          <p className="text-muted-foreground">
            &copy; {new Date().getFullYear()} AI Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
