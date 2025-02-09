export class HashList<T> {
	private record: Record<string, T | T[]> = {};
	private recordKeys: string[] = [];

	constructor(obj?: Iterable<[string, T | T[]]> | Record<string, T | T[]>) {
		this.record = {};
		if (obj instanceof Map || Array.isArray(obj)) {
			//tableau
			for (const [key, val] of obj as Iterable<[string, T | T[]]>) {
				this.record[key] = val;
			}
		} else if (obj && typeof obj === "object") {
			for (const [key, val] of Object.entries(obj!)) {
				this.record[key] = val;
			}
		}
	}

	add(key: string, obj: T) {
		this.record[key] = this.record[key]
			? ([] as T[]).concat(this.record[key] as T[], obj)
			: [obj];
	}

	delete(key?: string, obj?: T) {
		!key
			? (this.record = {})
			: !obj
			? delete this.record[key]
			: this.record[key]
			? (this.record[key] = ([] as T[]).concat(
					(this.record[key] as T[]).filter(
						(val: any) => JSON.stringify(val) !== JSON.stringify(obj)
					)
			  )).length === 0 && delete this.record[key]
			: delete this.record[key];
	}

	get(key?: string) {
		return key && this.record[key]
			? [].concat(this.record[key] as any)
			: Object.values(this.record);
	}
}
