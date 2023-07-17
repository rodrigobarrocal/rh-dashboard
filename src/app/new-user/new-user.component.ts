import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RhService } from '../shared/services/rh.service';
import { matchingPasswordValidator } from '../shared/utils/form-validators';

@Component({
	selector: 'app-new-user',
	templateUrl: './new-user.component.html',
	styleUrls: ['./new-user.component.css'],
	providers: [RhService],
})
export class NewUserComponent {
	form: FormGroup = new FormGroup({
		name: new FormControl('Rodrigo Barrocal', [
			Validators.required,
			Validators.minLength(4),
			Validators.pattern(
				'[a-zzéúíóáèùìòàõãñêûîôâëyüïöäA-ZÉÚÍÓÁÈÙÌÒÀÕÃÑÊÛÎÔÂËYÜÏÖÄ]* [a-zzéúíóáèùìòàõãñêûîôâëyüïöäA-ZÉÚÍÓÁÈÙÌÒÀÕÃÑÊÛÎÔÂËYÜÏÖÄ](.*)'
			),
		]),
		email: new FormControl('barrocal.rodrigo@gmail.com', [
			Validators.required,
			Validators.email,
		]),
		password: new FormControl('12345678', [
			Validators.required,
			Validators.minLength(8),
			matchingPasswordValidator('confirmPassword', true),
		]),
		confirmPassword: new FormControl('12345678', [
			Validators.required,
			matchingPasswordValidator('password'),
		]),
		accept: new FormControl(true, [Validators.requiredTrue]),
	});

	constructor(
		private router: Router,
		private localStorageService: RhService
	) {}

	onSubmit() {
		console.log(this.form.value.email);
		var save = this.localStorageService.set(
			this.form.value.email,
			this.form.value
		);
		if (save) {
			this.router.navigate(['./welcome', this.form.value.email]);
		}
	}
}
