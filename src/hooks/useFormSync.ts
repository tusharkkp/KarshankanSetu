import { useEffect, useMemo, useRef, useState } from "react";

type SyncStatus = "idle" | "saving" | "saved" | "error" | "offline";

export interface UseFormSyncOptions<FormData> {
	// Unique key for localStorage persistence
	storageKey: string;
	// Optional remote sync function (e.g., POST to API)
	remoteSync?: (data: FormData) => Promise<void>;
	// Debounce delay for local save in ms
	debounceMs?: number;
}

export function useFormSync<FormData>(options: UseFormSyncOptions<FormData>) {
	const { storageKey, remoteSync, debounceMs = 400 } = options;
	const [status, setStatus] = useState<SyncStatus>("idle");
	const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);
	const debounceTimer = useRef<number | null>(null);

	const isOnline = useMemo(() => {
		return typeof navigator !== "undefined" ? navigator.onLine : true;
	}, []);

	// Load from localStorage once
	const loadLocal = <T,>(fallback: T): T => {
		try {
			const raw = localStorage.getItem(storageKey);
			if (!raw) return fallback;
			return JSON.parse(raw) as T;
		} catch {
			return fallback;
		}
	};

	const saveLocal = (data: FormData) => {
		try {
			localStorage.setItem(storageKey, JSON.stringify(data));
			setLastSavedAt(Date.now());
			setStatus("saved");
		} catch {
			setStatus("error");
		}
	};

	const queueLocalSave = (data: FormData) => {
		if (debounceTimer.current) {
			window.clearTimeout(debounceTimer.current);
		}
		debounceTimer.current = window.setTimeout(() => {
			setStatus("saving");
			saveLocal(data);
		}, debounceMs);
	};

	const syncRemote = async (data: FormData) => {
		if (!remoteSync) return;
		if (!isOnline) {
			setStatus("offline");
			return;
		}
		try {
			setStatus("saving");
			await remoteSync(data);
			setLastSavedAt(Date.now());
			setStatus("saved");
		} catch {
			setStatus("error");
		}
	};

	useEffect(() => {
		return () => {
			if (debounceTimer.current) {
				window.clearTimeout(debounceTimer.current);
			}
		};
	}, []);

	return {
		loadLocal,
		queueLocalSave,
		syncRemote,
		status,
		lastSavedAt,
	};
}


