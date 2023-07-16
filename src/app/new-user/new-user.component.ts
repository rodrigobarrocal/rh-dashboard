import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder } from '@angular/forms';

@Component({
				  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {
	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
	){}

	checkoutForm = this.formBuilder.group({
		name: '',
		address: ''
	});


	public onCreateAccountClick(){
		this.router.navigate(['./welcome']);
	}
}
