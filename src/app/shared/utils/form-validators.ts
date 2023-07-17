import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchingPasswordValidator(
	matchTo: string,
	reverse?: boolean
): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		if (control.parent && reverse) {
			const c = (control.parent?.controls as any)[matchTo];
			if (c) {
				c.updateValueAndValidity();
			}
			return null;
		}
		return !!control.parent &&
			!!control.parent.value &&
			control.value === (control.parent?.controls as any)[matchTo].value
			? null
			: { matching: true };
	};
}
export function CNPJValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const cpf = control.value;
		// console.log(cpf);

		const value = control.value;

		if (!value) {
			return null;
		}

		var b = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

		if (value.length !== 14) return { cnpjInvalid: true };

		if (/0{14}/.test(value)) return { cnpjInvalid: true };

		for (var i = 0, n = 0; i < 12; n += value[i] * b[++i]);
		if (value[12] != ((n %= 11) < 2 ? 0 : 11 - n))
			return { cnpjInvalid: true };

		for (var i = 0, n = 0; i <= 12; n += value[i] * b[i++]);
		if (value[13] != ((n %= 11) < 2 ? 0 : 11 - n))
			return { cnpjInvalid: true };

		return null;
	};
}
export function CPFValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const cpf = control.value;
		// console.log(cpf);

		const value = control.value;

		if (!value) {
			return null;
		}

		if (
			!value ||
			value.length != 11 ||
			value == '00000000000' ||
			value == '11111111111' ||
			value == '22222222222' ||
			value == '33333333333' ||
			value == '44444444444' ||
			value == '55555555555' ||
			value == '66666666666' ||
			value == '77777777777' ||
			value == '88888888888' ||
			value == '99999999999'
		) {
			return { cpfInvalid: true };
		}

		var Soma;
		var Resto;
		Soma = 0;
		if (value == '00000000000') return { cpfInvalid: true };

		for (i = 1; i <= 9; i++)
			Soma = Soma + parseInt(value.substring(i - 1, i)) * (11 - i);
		Resto = (Soma * 10) % 11;

		if (Resto == 10 || Resto == 11) Resto = 0;
		if (Resto != parseInt(value.substring(9, 10)))
			return { cpfInvalid: true };

		Soma = 0;
		for (var i = 1; i <= 10; i++)
			Soma = Soma + parseInt(value.substring(i - 1, i)) * (12 - i);
		Resto = (Soma * 10) % 11;

		if (Resto == 10 || Resto == 11) Resto = 0;
		if (Resto != parseInt(value.substring(10, 11)))
			return { cpfInvalid: true };
		return null;
	};
}
