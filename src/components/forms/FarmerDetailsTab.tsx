import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { KERALA_DISTRICTS, LAND_AREA_UNITS } from "@/constants/agri";

interface FarmerDetailsTabProps {
	formData: {
		state: string;
		district: string;
		village: string;
		landSize: string;
		landUnit: string;
		[key: string]: any;
	};
	setFormData: React.Dispatch<React.SetStateAction<any>>;
	isEditing: boolean;
}

export function FarmerDetailsTab({ formData, setFormData, isEditing }: FarmerDetailsTabProps) {

	return (
		<Card role="region" aria-label="Farmer Details">
			<CardHeader>
				<CardTitle className="text-lg">കർഷക വിവരങ്ങൾ / Farmer Details</CardTitle>
				<CardDescription>Provide land and location details.</CardDescription>
				<div className="mt-2">
					<Progress value={(
						(() => {
							const checks = [Boolean(formData.district), Boolean(formData.landSize)];
							const done = checks.filter(Boolean).length;
							return Math.round((done / checks.length) * 100);
						})()
					)} aria-label="Profile completion" />
				</div>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4">
					<div className="grid gap-2">
						<Label htmlFor="state">സംസ്ഥാനം / State</Label>
						<Input id="state" value={formData.state || "Kerala"} disabled aria-label="State Kerala" />
					</div>

					<div className="grid gap-2">
						<Label>ജില്ല / District *</Label>
						<Select
							value={formData.district}
							disabled={!isEditing}
							onValueChange={(v) => setFormData((prev) => ({ ...prev, district: v }))}
						>
							<SelectTrigger aria-label="District">
								<SelectValue placeholder="Select district" />
							</SelectTrigger>
							<SelectContent>
								{KERALA_DISTRICTS.map((d) => (
									<SelectItem key={d} value={d}>{d}</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="grid gap-2">
						<Label htmlFor="village">Village</Label>
						<Input
							id="village"
							value={formData.village}
							disabled={!isEditing}
							onChange={(e) => setFormData((prev) => ({ ...prev, village: e.target.value }))}
							placeholder="Enter village name"
						/>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div className="grid gap-2">
							<Label htmlFor="landSize">ആകെ വിസ്തീര്‍ണം / Total Land Area</Label>
							<Input
								id="landSize"
								type="number"
								min={0}
								step="0.01"
								aria-label="Total Land Area"
								value={formData.landSize}
								disabled={!isEditing}
								onChange={(e) => setFormData((prev) => ({ ...prev, landSize: e.target.value }))}
							/>
						</div>
						<div className="grid gap-2">
							<Label>അളവുകോല്‍ / Unit</Label>
							<Select
								value={formData.landUnit}
								disabled={!isEditing}
								onValueChange={(v) => setFormData((prev) => ({ ...prev, landUnit: v }))}
							>
								<SelectTrigger aria-label="Land Area Unit"><SelectValue /></SelectTrigger>
								<SelectContent>
									{LAND_AREA_UNITS.map((u) => (<SelectItem key={u} value={u}>{u}</SelectItem>))}
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export default FarmerDetailsTab;


