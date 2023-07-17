import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RhService } from '../shared/services/rh.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
	employee: any;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private localStorageService: RhService
	) {}

	ngOnInit() {
		const key = this.route.snapshot.paramMap.get('key');
		this.employee = this.localStorageService.get(key);
		if (!this.employee) {
			this.router.navigate(['./']);
		}
	}
}
