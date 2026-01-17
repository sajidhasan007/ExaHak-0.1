import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, BarChart3, CreditCard, Users } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="container space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your project performance and key metrics.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value="$45,231.89"
          icon={<CreditCard className="text-muted-foreground h-4 w-4" />}
          trend="+20.1% from last month"
        />
        <StatCard
          title="Subscriptions"
          value="+2,350"
          icon={<Users className="text-muted-foreground h-4 w-4" />}
          trend="+180.1% from last month"
        />
        <StatCard
          title="Sales"
          value="+12,234"
          icon={<BarChart3 className="text-muted-foreground h-4 w-4" />}
          trend="+19% from last month"
        />
        <StatCard
          title="Active Now"
          value="+573"
          icon={<Activity className="text-muted-foreground h-4 w-4" />}
          trend="+201 since last hour"
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Example of a dashboard layout using shadcn components.
              </p>
              <div className="mt-4 flex h-[200px] items-center justify-center rounded-lg border-2 border-dashed">
                <p className="text-muted-foreground italic">
                  Charts coming soon...
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Example of a dashboard layout using shadcn components.
              </p>
              <div className="mt-4 flex h-[200px] items-center justify-center rounded-lg border-2 border-dashed">
                <p className="text-muted-foreground italic">
                  Charts coming soon...
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Example of a dashboard layout using shadcn components.
              </p>
              <div className="mt-4 flex h-[200px] items-center justify-center rounded-lg border-2 border-dashed">
                <p className="text-muted-foreground italic">
                  Charts coming soon...
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function StatCard({
  title,
  value,
  icon,
  trend,
}: {
  title: string
  value: string
  icon: React.ReactNode
  trend: string
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-muted-foreground text-xs">{trend}</p>
      </CardContent>
    </Card>
  )
}
