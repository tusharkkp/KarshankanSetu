import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import {
  ActivitySquare,
  AlarmClock,
  AlertTriangle,
  BarChart3,
  Bell,
  CalendarClock,
  CheckCircle2,
  Cloud,
  CloudRain,
  Droplets,
  Leaf,
  ListChecks,
  Plus,
  MapPin,
  Sprout,
  Sun,
} from "lucide-react";
import * as Recharts from "recharts";

type Activity = {
  date: string;
  type: string;
  notes: string;
};

// This will be defined inside the component to use translations

function CircularSeasonProgress({ value }: { value: number }) {
  const angle = Math.min(100, Math.max(0, value)) * 3.6;
  return (
    <div className="relative h-24 w-24">
      <div
        className="h-24 w-24 rounded-full"
        style={{
          background: `conic-gradient(hsl(var(--primary)) ${angle}deg, hsl(var(--muted)) ${angle}deg)`,
        }}
      />
      <div className="absolute inset-2 rounded-full bg-background grid place-items-center">
        <span className="text-xl font-semibold">{Math.round(value)}%</span>
      </div>
    </div>
  );
}

function StageBar({ currentStageIndex, stages, t }: { currentStageIndex: number; stages: string[]; t: any }) {
  return (
    <div className="flex items-center gap-2">
      {stages.map((s, i) => {
        const isDone = i < currentStageIndex;
        const isCurrent = i === currentStageIndex;
        return (
          <Tooltip key={s}>
            <TooltipTrigger asChild>
              <div className={`h-2 flex-1 rounded-full ${isDone ? "bg-emerald-500" : isCurrent ? "bg-blue-500" : "bg-muted"}`} />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-xs">
                <p className="font-medium">{s}</p>
                <p className="text-muted-foreground">{isDone ? t('dashboard.completed') : isCurrent ? t('dashboard.current') : t('dashboard.upcoming')}</p>
              </div>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}

function WeatherMini({ t }: { t: any }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <MapPin className="h-4 w-4 text-muted-foreground" />
      <span>{t('dashboard.wayanad')}</span>
      <Sun className="h-4 w-4 text-yellow-500" />
      <span>30°C</span>
      <CloudRain className="h-4 w-4 text-blue-500" />
      <span>{t('dashboard.rainTomorrow')}</span>
    </div>
  );
}

function OverviewCards({ t }: { t: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[{
        title: t('dashboard.seasonProgress'),
        icon: Leaf,
        body: (
          <>
            <CircularSeasonProgress value={62} />
            <div className="text-center break-words w-full max-w-full">
              <p className="text-sm text-muted-foreground truncate">{t('dashboard.kharifSeason')}</p>
              <p className="text-xs text-muted-foreground truncate">{t('dashboard.keralaContext')}</p>
            </div>
          </>
        )
      }, {
        title: t('dashboard.activeFields'),
        icon: Sprout,
        body: (
          <>
            <p className="text-4xl font-bold leading-none">3</p>
            <p className="text-sm text-muted-foreground truncate w-full max-w-full">{t('dashboard.cropsList')}</p>
          </>
        )
      }, {
        title: t('dashboard.sinceLastActivity'),
        icon: ActivitySquare,
        body: (
          <>
            <p className="text-4xl font-bold leading-none">2</p>
            <p className="text-sm text-muted-foreground truncate w-full max-w-full">{t('dashboard.lastIrrigation')}</p>
          </>
        )
      }, {
        title: t('dashboard.alerts'),
        icon: Bell,
        body: (
          <>
            <p className="text-4xl font-bold leading-none">4</p>
            <p className="text-sm text-muted-foreground truncate w-full max-w-full">{t('dashboard.alertsBreakdown')}</p>
          </>
        )
      }].map((c, i) => (
        <Card key={i} className="rounded-2xl shadow-md bg-white p-4 min-h-[180px] flex flex-col justify-between items-center text-center overflow-hidden">
          <CardHeader className="p-0 w-full flex items-center justify-center">
            <CardTitle className="text-base break-words text-center w-full max-w-full px-2">
              <c.icon className="h-5 w-5 inline mr-2 text-primary" />
              {c.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 mt-3 flex flex-col items-center justify-center gap-2 w-full min-w-0">
            {c.body}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function CropCard({ name, stageIndex, tip, stages, t }: { name: string; stageIndex: number; tip: string; stages: string[]; t: any }) {
  return (
    <Card className="rounded-2xl shadow-md bg-white p-4 min-h-[180px] flex flex-col justify-between items-center text-center overflow-hidden">
      <CardHeader className="pb-2 w-full">
        <CardTitle className="text-lg flex items-center gap-2 justify-center text-center break-words w-full max-w-full px-2">
          <Sprout className="h-5 w-5 text-primary" /> {name}
        </CardTitle>
        <div className="mt-1 flex items-center justify-center">
          <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary truncate max-w-[200px]">{t('dashboard.stage')}: {stages[stageIndex]}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 w-full">
        <StageBar currentStageIndex={stageIndex} stages={stages} t={t} />
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/30 px-2 py-1 rounded-md">
            <div className="flex items-center gap-1"><MapPin className="h-3 w-3" /><span className="truncate max-w-[80px]">{t('dashboard.wayanad')}</span></div>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/50"></span>
            <div className="flex items-center gap-1"><Sun className="h-3 w-3" /><span>30°C</span></div>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/50"></span>
            <div className="flex items-center gap-1"><CloudRain className="h-3 w-3" /><span className="truncate max-w-[100px]">{t('dashboard.rainTomorrow')}</span></div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm rounded-md bg-green-50 text-green-700 p-2 break-words w-full max-w-full">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span className="truncate w-full">{tip}</span>
        </div>
      </CardContent>
    </Card>
  );
}

function CropCyclePanel({ stages, t }: { stages: string[]; t: any }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CropCard name={t('dashboard.cardamom')} stageIndex={2} tip={t('dashboard.pestMonitoring')} stages={stages} t={t} />
        <CropCard name={t('dashboard.blackPepper')} stageIndex={1} tip={t('dashboard.rainExpected')} stages={stages} t={t} />
        <CropCard name={t('dashboard.coffee')} stageIndex={3} tip={t('dashboard.nutrientSpray')} stages={stages} t={t} />
      </div>
    </div>
  );
}

function ActivityLog({ t }: { t: any }) {
  const [activities, setActivities] = useState<Activity[]>([
    { date: "2025-09-15", type: t('dashboard.irrigation'), notes: t('dashboard.dripHours') },
    { date: "2025-09-13", type: t('dashboard.pestCheck'), notes: t('dashboard.noIssues') },
    { date: "2025-09-10", type: t('dashboard.fertilizer'), notes: t('dashboard.npkFoliar') },
  ]);
  const [newDate, setNewDate] = useState("");
  const [newType, setNewType] = useState("");
  const [newNotes, setNewNotes] = useState("");
  const [open, setOpen] = useState(false);

  function addActivity() {
    if (!newDate || !newType) return;
    setActivities([{ date: newDate, type: newType, notes: newNotes }, ...activities]);
    setNewDate("");
    setNewType("");
    setNewNotes("");
    setOpen(false);
  }

  return (
    <div className="space-y-4">
      <Card className="rounded-2xl shadow-md bg-white p-4 min-h-[180px] relative overflow-hidden">
        <CardHeader>
          <CardTitle className="text-xl text-center flex items-center justify-center gap-2"><ListChecks className="h-5 w-5" /> {t('dashboard.recentActivities')}</CardTitle>
          <CardDescription className="text-center">{t('dashboard.activityRecord')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2">
            {activities.map((a, i) => (
              <div key={i} className="flex items-start justify-between gap-3 rounded-xl border p-3 overflow-hidden">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground truncate">{a.date}</p>
                  <p className="font-medium break-words w-full max-w-full">{a.type}</p>
                  <p className="text-sm text-muted-foreground break-words line-clamp-2 w-full max-w-full">{a.notes}</p>
                </div>
              </div>
            ))}
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="fixed bottom-6 right-6 rounded-full h-12 w-12 p-0 shadow-lg" aria-label={t('dashboard.addActivity')}>
                <Plus className="h-6 w-6" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{t('dashboard.logNewActivity')}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-2">
                <div className="grid gap-2">
                  <Label htmlFor="new-date">{t('dashboard.date')}</Label>
                  <Input id="new-date" type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="new-type">{t('dashboard.type')}</Label>
                  <Input id="new-type" placeholder={t('dashboard.irrigation')} value={newType} onChange={(e) => setNewType(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="new-notes">{t('dashboard.notes')}</Label>
                  <Input id="new-notes" placeholder={t('dashboard.detailsOptional')} value={newNotes} onChange={(e) => setNewNotes(e.target.value)} />
                </div>
              </div>
              <DialogFooter>
                <Button className="gap-2" onClick={addActivity}><CheckCircle2 className="h-4 w-4" /> {t('dashboard.saveActivity')}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}

function AnalyticsReports({ t }: { t: any }) {
  const data = useMemo(
    () => [
      { month: "Jan", yield: 120, input: 80 },
      { month: "Feb", yield: 140, input: 70 },
      { month: "Mar", yield: 160, input: 90 },
      { month: "Apr", yield: 130, input: 85 },
      { month: "May", yield: 170, input: 95 },
      { month: "Jun", yield: 180, input: 100 },
    ],
    [],
  );

  const soil = useMemo(
    () => [
      { month: "Jan", health: 72 },
      { month: "Feb", health: 74 },
      { month: "Mar", health: 70 },
      { month: "Apr", health: 76 },
      { month: "May", health: 78 },
      { month: "Jun", health: 80 },
    ],
    [],
  );

  const config = { yield: { label: t('dashboard.yieldKg'), color: "hsl(var(--primary))" }, health: { label: t('dashboard.soilHealth'), color: "hsl(var(--muted-foreground))" } } as const;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="rounded-2xl shadow-md bg-white p-4 min-h-[180px] overflow-hidden">
        <CardHeader>
          <CardTitle className="text-lg text-center">{t('dashboard.yieldHistory')}</CardTitle>
          <CardDescription className="text-center">{t('dashboard.last6Months')}</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={config} className="h-64">
            <Recharts.LineChart data={data} margin={{ left: 12, right: 12 }}>
              <Recharts.CartesianGrid vertical={false} />
              <Recharts.XAxis dataKey="month" tickLine={false} axisLine={false} />
              <Recharts.YAxis tickLine={false} axisLine={false} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Recharts.Line type="monotone" dataKey="yield" stroke="var(--color-yield)" strokeWidth={2} dot={false} />
            </Recharts.LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow-md bg-white p-4 min-h-[180px] overflow-hidden">
        <CardHeader>
          <CardTitle className="text-lg text-center">{t('dashboard.soilHealthTrend')}</CardTitle>
          <CardDescription className="text-center">{t('dashboard.indexOverTime')}</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={config} className="h-64">
            <Recharts.BarChart data={soil} margin={{ left: 12, right: 12 }}>
              <Recharts.CartesianGrid vertical={false} />
              <Recharts.XAxis dataKey="month" tickLine={false} axisLine={false} />
              <Recharts.YAxis tickLine={false} axisLine={false} />
              <ChartTooltip cursor={{ fill: "rgba(0,0,0,0.05)" }} content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Recharts.Bar dataKey="health" fill="var(--color-health)" radius={[6, 6, 0, 0]} />
            </Recharts.BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

function UpcomingTasks({ t }: { t: any }) {
  const tasks = [
    { title: `${t('dashboard.irrigation')} - ${t('dashboard.pepper')}`, due: t('dashboard.tomorrow'), priority: "high" as const, icon: <Droplets className="h-4 w-4" /> },
    { title: `${t('dashboard.pestScouting')} - ${t('dashboard.cardamom')}`, due: t('dashboard.in2Days'), priority: "medium" as const, icon: <AlertTriangle className="h-4 w-4" /> },
    { title: `${t('dashboard.marketPriceCheck')} - ${t('dashboard.coffee')}`, due: t('dashboard.friday'), priority: "low" as const, icon: <BarChart3 className="h-4 w-4" /> },
    { title: `${t('dashboard.schemeDeadline')} - PM-KISAN`, due: "Sept 25", priority: "high" as const, icon: <CalendarClock className="h-4 w-4" /> },
  ];

  return (
    <Card className="rounded-2xl shadow-md bg-white p-4 overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg text-center">{t('dashboard.upcomingTasks')}</CardTitle>
        <CardDescription className="text-center">{t('dashboard.stayOnTop')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {tasks.map((task, i) => (
          <div key={i} className="flex items-center justify-between rounded-xl border p-3">
            <div className="flex items-center gap-3">
              <div className="grid place-items-center h-8 w-8 rounded-full bg-primary/10 text-primary">
                {task.icon}
              </div>
              <div>
                <p className="font-medium break-words w-full max-w-full">{task.title}</p>
                <p className="text-xs text-muted-foreground truncate w-full max-w-full">{task.due}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className={`${task.priority === "high" ? "bg-red-100 text-red-700" : task.priority === "medium" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>{t(`dashboard.${task.priority}`)}</Badge>
              <Button size="sm" variant="outline">{t('dashboard.done')}</Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default function FarmerDashboard() {
  const { t } = useTranslation();
  
  const stages = [
    t('dashboard.sowing'),
    t('dashboard.germination'),
    t('dashboard.vegetative'),
    t('dashboard.flowering'),
    t('dashboard.harvest')
  ];

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-center">{t('dashboard.overview')}</h2>
        <OverviewCards t={t} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card className="rounded-2xl shadow-md bg-white p-4 min-h-[180px] overflow-hidden">
              <CardHeader>
                <CardTitle className="text-xl text-center flex items-center justify-center gap-2 leading-tight tracking-tight max-w-[90%] mx-auto break-words"><Sprout className="h-5 w-5" /> {t('dashboard.currentCropCycle')}</CardTitle>
                <CardDescription className="text-center text-sm text-muted-foreground leading-relaxed max-w-[28rem] mx-auto break-words">{t('dashboard.trackGrowthStage')}</CardDescription>
              </CardHeader>
              <CardContent>
                <CropCyclePanel stages={stages} t={t} />
              </CardContent>
            </Card>

            <ActivityLog t={t} />
          </div>
          <div className="space-y-6">
            <UpcomingTasks t={t} />

            <Card className="rounded-2xl shadow-md bg-white p-4 min-h-[180px] overflow-hidden">
              <CardHeader>
                <CardTitle className="text-lg text-center"><Cloud className="h-5 w-5 inline mr-2" /> {t('dashboard.weather')}</CardTitle>
                <CardDescription className="text-center">{t('dashboard.threeDayOutlook')}</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-3 text-center">
                {[{ d: t('dashboard.today'), I: Sun, t: "30°C" }, { d: t('dashboard.tomorrow'), I: CloudRain, t: "28°C" }, { d: t('dashboard.friday'), I: Cloud, t: "27°C" }].map((w, i) => (
                  <div key={i} className="rounded-xl border p-3 overflow-hidden">
                    <p className="text-sm text-muted-foreground truncate w-full max-w-full">{w.d}</p>
                    <w.I className="h-6 w-6 mx-auto my-2" />
                    <p className="font-medium truncate w-full max-w-full">{w.t}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-center">{t('dashboard.analyticsReports')}</h2>
        <AnalyticsReports t={t} />
      </div>
    </TooltipProvider>
  );
}


