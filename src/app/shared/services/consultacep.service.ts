import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ConsultaCepService {
	constructor(private http: HttpClient) {}

	consultaCEP(cep: string): any {
		// console.log(cep);

		cep = cep.replace(/\D/g, '');

		if (cep !== '') {
			const validacep = /^[0-9]{8}$/;

			if (validacep.test(cep)) {
				const ret = this.http.get(`//viacep.com.br/ws/${cep}/json`);
				// console.log(ret);
				return ret;
			}
		}

		return of({});
	}
}
