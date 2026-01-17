import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { AIModel } from "@/types/model"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { Link } from "react-router-dom"

interface ModelCardProps {
  model: AIModel
}

export function ModelCard({ model }: ModelCardProps) {
  return (
    <motion.div whileHover={{ y: -4 }} className="transform-gpu">
      <Link to={`/models/${model.id}`} className="block">
        <Card className="border-border/50 hover:border-primary/20 hover:bg-muted/50 transform-gpu transition-all hover:shadow-xl">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-xl">{model.title}</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {model.provider}
                  </Badge>
                </div>
                <div className="text-muted-foreground flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <span className="text-foreground font-semibold">
                      {model.rating ? model.rating.toFixed(1) : "N/A"}
                    </span>
                  </div>
                  {/* <span>•</span> */}
                  {/* <span>${model.price}/req</span> */}
                  <span>•</span>
                  <div className="flex gap-1">
                    {model.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="bg-muted rounded px-1.5 py-0.5 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
              {model.description}
            </p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
