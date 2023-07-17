import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RhService } from '../../shared/services/rh.service';

import { ConsultaCepService } from '../../shared/services/consultacep.service';
import {
	CNPJValidator,
	CPFValidator,
} from '../../shared/utils/form-validators';
import * as ufCidadesData from '../../shared/utils/uf_cidades.json';

declare var window: any;

@Component({
	selector: 'app-welcome',
	templateUrl: './setup.component.html',
	styleUrls: ['./setup.component.css'],
	providers: [RhService],
})
export class SetupComponent {
	dataUF: any;
	employee: any;
	selectedUF = [];
	form: FormGroup = new FormGroup({
		tipoEmpresa: new FormControl(''),
		nomeEmpresa: new FormControl('', [Validators.required]),
		cnpjEmpresa: new FormControl('', [
			Validators.required,
			CNPJValidator(),
		]),
		cepEmpresa: new FormControl('', [Validators.required]),
		enderecoEmpresa: new FormControl('Rua Werner Goldberg', [
			Validators.required,
		]),
		numeroEmpresa: new FormControl('', [Validators.required]),
		complemnteEmpresa: new FormControl(''),
		ufEmpresa: new FormControl('', [Validators.required]),
		cidadeEmpresa: new FormControl('', [Validators.required]),
		bairroEmpresa: new FormControl('', [Validators.required]),
		nomeAdministrador: new FormControl('', [Validators.required]),
		celularAdministrador: new FormControl('', [Validators.required]),
		cpfAdministrador: new FormControl('', [
			Validators.required,
			CPFValidator(),
		]),
		emailAdministrador: new FormControl('', [
			Validators.required,
			Validators.email,
		]),
	});

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private localStorageService: RhService,
		private cepService: ConsultaCepService
	) {}

	ngOnInit() {
		const key = this.route.snapshot.paramMap.get('key');
		this.employee = this.localStorageService.get(key);
		if (!this.employee) {
			this.router.navigate(['./']);
		} else if (this.employee.empresa) {
			this.router.navigate(['./dashboard', this.employee.email]);
		}
		this.dataUF = ufCidadesData as any;
		this.formModal = new window.bootstrap.Modal('#empresaModal');
	}

	onUFSelected(uf: string): void {
		// console.log('UF', uf);
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
		// console.debug('cep', this.form.get('cepEmpresa').value);
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

	formModal: any;

	onSubmit() {
		this.employee.empresa = this.form.value;

		var save = this.localStorageService.set(
			this.employee.email,
			this.employee
		);
		if (save) {
			this.form.reset();
			this.formModal.hide();
			this.router.navigate(['./dashboard', this.employee.email]);
		}
	}
}
