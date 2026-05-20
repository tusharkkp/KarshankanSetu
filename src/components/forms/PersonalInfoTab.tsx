import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface PersonalInfoTabProps {
	formData: {
		name: string;
		phone: string;
		[key: string]: any;
	};
	setFormData: React.Dispatch<React.SetStateAction<any>>;
	isEditing: boolean;
}

export function PersonalInfoTab({ formData, setFormData, isEditing }: PersonalInfoTabProps) {
	const completion = (() => {
		const checks = [
			Boolean(formData.name),
			Boolean(formData.phone && /^\+91\d{10}$/.test(formData.phone)),
		];
		const done = checks.filter(Boolean).length;
		return Math.round((done / checks.length) * 100);
	})();

	return (
		<Card role="region" aria-label="Personal Information">
			<CardHeader>
				<CardTitle className="text-lg">വ്യക്തിഗത വിവരം / Personal Info</CardTitle>
				<CardDescription>Fill your details. Fields marked * are required.</CardDescription>
				<div className="mt-2">
					<Progress value={completion} aria-label="Profile completion" />
					<p className="text-xs text-muted-foreground mt-1">Completion: {completion}%</p>
				</div>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4">
					<div className="grid gap-2">
						<Label htmlFor="name">Full Name (English) *</Label>
						<Input
							id="name"
							aria-label="Full Name English"
							value={formData.name}
							disabled={!isEditing}
							onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
						/>
					</div>

					<div className="grid gap-2">
						<Label htmlFor="phone">മൊബൈൽ നമ്പർ / Mobile (+91xxxxxxxxxx) *</Label>
						<Input
							id="phone"
							aria-label="Mobile Number"
							inputMode="tel"
							placeholder="+911234567890"
							value={formData.phone}
							disabled={!isEditing}
							onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export default PersonalInfoTab;


