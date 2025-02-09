class HashList<T> {
	private record: Record<string, T | T[]> = {};
	private recordKeys: string[] = [];

	HashList<T>() {}

	add(key: string, obj: T) {
		this.record[key] = this.record[key]
			? Array.isArray(this.record[key])
				? [...this.record[key], obj]
				: [this.record[key], obj]
			: obj;
	}

	delete(key?: string, obj?: T) {
		!key
			? (this.record = {})
			: !obj
			? delete this.record[key]
			: Array.isArray(this.record[key])
			? (this.record[key] = this.record[key].filter(
					(val: any) => JSON.stringify(val) !== JSON.stringify(obj)
			  ))
			: delete this.record[key];
	}

	get(key?: string) {
		return key && this.record[key]
			? [].concat(this.record[key] as any)
			: Object.values(this.record) || undefined;
	}
}
