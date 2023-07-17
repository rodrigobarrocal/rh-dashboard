import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RhService } from '../shared/services/rh.service';

import { ConsultaCepService } from '../shared/services/consultacep.service';
import { CNPJValidator, CPFValidator } from '../shared/utils/form-validators';
import * as ufCidadesData from '../shared/utils/uf_cidades.json';

@Component({
	selector: 'app-welcome',
	templateUrl: './welcome.component.html',
	styleUrls: ['./welcome.component.css'],
	providers: [RhService],
})
export class WelcomeComponent {
	dataUF: any;
	employee: any;
	form: FormGroup = new FormGroup({
		tipoEmpresa: new FormControl(''),
		nomeEmpresa: new FormControl('Casa', [Validators.required]),
		cnpjEmpresa: new FormControl('06633054000170', [
			Validators.required,
			CNPJValidator(),
		]),
		cepEmpresa: new FormControl('06414025', [Validators.required]),
		enderecoEmpresa: new FormControl('Rua Werner Goldberg', [
			Validators.required,
		]),
		numeroEmpresa: new FormControl('77', [Validators.required]),
		complemnteEmpresa: new FormControl(''),
		ufEmpresa: new FormControl('SP', [Validators.required]),
		cidadeEmpresa: new FormControl('Barueri', [Validators.required]),
		bairroEmpresa: new FormControl('Jardim Tupanci', [Validators.required]),
		nomeAdministrador: new FormControl('Rodrigo Soares', [
			Validators.required,
		]),
		celularAdministrador: new FormControl('11981117990', [
			Validators.required,
		]),
		cpfAdministrador: new FormControl('21390521885', [
			Validators.required,
			CPFValidator(),
		]),
		emailAdministrador: new FormControl('rodrigo.barrocal@hotmail.com', [
			Validators.required,
			Validators.email,
		]),
	});

	selectedUF = [];

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private localStorageService: RhService,
		private cepService: ConsultaCepService
	) {}

	ngOnInit() {
		const key = this.route.snapshot.paramMap.get('key');
		this.dataUF = ufCidadesData as any;
		this.employee = this.localStorageService.get(key);
		if (!this.employee) {
			this.router.navigate(['./']);
		} else if (this.employee.empresa) {
			this.router.navigate(['./dashboard', this.employee.email]);
		}
	}

	onUFSelected(uf: string): void {
		console.log('UF', uf);
		for (var i = 0; i < this.dataUF.estados.length; i++) {
			if (
				this.dataUF.estados[i].sigla == this.form.get('ufEmpresa').value
			) {
				this.selectedUF = this.dataUF.estados[i].cidades;
				break;
			}
		}
	}

	onCEPFilled(e: any) {
		console.debug('cep', this.form.get('cepEmpresa').value);
		this.cepService
			.consultaCEP(this.form.get('cepEmpresa').value)
			.subscribe(dados => {
				this.form.patchValue({
					enderecoEmpresa: dados.logradouro,
					complemento: dados.complemento,
					bairroEmpresa: dados.bairro,
					ufEmpresa: dados.uf,
					cidadeEmpresa: dados.localidade,
				});
				this.onUFSelected(dados.uf);
			});
	}

	onSubmit() {
		this.employee.empresa = this.form.value;

		var save = this.localStorageService.set(
			this.employee.email,
			this.employee
		);
		if (save) {
			this.form.reset();
			this.router.navigate(['./dashboard', this.employee.email]);
		}
	}
}
