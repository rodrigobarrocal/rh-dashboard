import { Injectable } from '@angular/core';

// export const BROWSER_STORAGE = new InjectionToken<Storage>('Storage', {
// 	providedIn: 'root',
// 	factory: () => localStorage,
// });

@Injectable({
	providedIn: 'root',
})
export class RhService {
	// constructor(@Inject(BROWSER_STORAGE) public storage: Storage) {}

	private storage: Storage;

	constructor() {
		this.storage = window.sessionStorage;
	}

	set(key: string, value: any) {
		if (this.storage) {
			this.storage.setItem(key, JSON.stringify(value));
			return true;
		}
		return false;
	}

	get(key: string): any {
		console.log('GET', key);
		if (this.storage) {
			return JSON.parse(this.storage.getItem(key));
		}
		return null;
	}
}
