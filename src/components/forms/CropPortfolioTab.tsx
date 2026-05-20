import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { KERALA_CROPS } from "@/constants/agri";

interface CropPortfolioTabProps {
	formData: {
		primaryCrop: string;
		farmType: string;
		[key: string]: any;
	};
	setFormData: React.Dispatch<React.SetStateAction<any>>;
	isEditing: boolean;
}

export function CropPortfolioTab({ formData, setFormData, isEditing }: CropPortfolioTabProps) {
	const primaryCrop = formData.primaryCrop || "";

	return (
		<Card role="region" aria-label="Crop Portfolio" className="shadow-sm">
			<CardHeader className="pb-2">
				<CardTitle className="text-xl tracking-tight">വിള വിവരങ്ങൾ / Crop Portfolio</CardTitle>
				<CardDescription className="text-sm">Choose crops and cultivation details.</CardDescription>
				<div className="mt-3">
					<Progress value={(() => {
						const checks = [Boolean(formData.primaryCrop), Boolean(formData.farmType)];
						const done = checks.filter(Boolean).length;
						return Math.round((done / checks.length) * 100);
					})()} aria-label="Profile completion" />
					<p className="text-xs text-muted-foreground mt-1">Complete the sections below to finish your crop portfolio.</p>
				</div>
			</CardHeader>
				<CardContent>
				<div className="grid gap-6 max-w-5xl mx-auto w-full">
					{/* Summary */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div className="md:col-span-2 grid gap-2 border rounded-xl p-4 bg-card text-card-foreground shadow-sm">
						<p className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">Primary Crop</p>
						<Label className="text-sm">പ്രധാന വിള / Primary Current Crop *</Label>
						<Popover>
							<PopoverTrigger asChild>
								<button
									type="button"
									disabled={!isEditing}
									className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-muted/50 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
								>
									<span className="truncate text-left">{primaryCrop || "Select crop"}</span>
								</button>
							</PopoverTrigger>
							<PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
								<Command>
									<CommandInput placeholder="Search crop..." />
									<CommandList>
										<CommandEmpty>No crop found.</CommandEmpty>
										<CommandGroup heading="Kerala Crops">
											{KERALA_CROPS.map((crop) => (
												<CommandItem key={crop} value={crop} onSelect={(v) => setFormData((prev) => ({ ...prev, primaryCrop: v }))}>
													{crop}
												</CommandItem>
											))}
										</CommandGroup>
									</CommandList>
								</Command>
							</PopoverContent>
						</Popover>
					</div>
						<div className="grid gap-3 border rounded-xl p-4 bg-card text-card-foreground shadow-sm">
							<p className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">Portfolio Summary</p>
							<div className="grid grid-cols-2 gap-2 text-sm">
								<div className="space-y-1">
									<p className="text-muted-foreground">Primary</p>
									<p className="font-medium truncate">{primaryCrop || "—"}</p>
								</div>
								<div className="space-y-1">
									<p className="text-muted-foreground">Farming Method</p>
									<p className="font-medium">{formData.farmType || "—"}</p>
								</div>
							</div>
						</div>
					</div>


					<div className="grid gap-2 border rounded-xl p-4 bg-card text-card-foreground shadow-sm">
						<Label className="text-sm">കൃഷി രീതികൾ / Farming Method *</Label>
						<Select
							value={formData.farmType}
							disabled={!isEditing}
							onValueChange={(v) => setFormData((prev) => ({ ...prev, farmType: v }))}
						>
							<SelectTrigger aria-label="Farming Method"><SelectValue placeholder="Select" /></SelectTrigger>
							<SelectContent>
								{["Organic", "Conventional", "Integrated"].map((m) => (
									<SelectItem key={m} value={m}>{m}</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export default CropPortfolioTab;


