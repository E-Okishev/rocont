// formValidation.js
export function maskPhone(selector, masked = '+7 (___) ___-__-__') {
	const elems = document.querySelectorAll(selector);

	function mask(event) {
		const keyCode = event.keyCode;
		const template = masked;
		const def = template.replace(/\D/g, '');
		const val = this.value.replace(/\D/g, '');

		let i = 0;
		let newValue = template.replace(/[_\d]/g, function (a) {
			return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
		});

		i = newValue.indexOf('_');
		if (i !== -1) {
			newValue = newValue.slice(0, i);
		}

		let reg = template
			.substr(0, this.value.length)
			.replace(/_+/g, (a) => `\\d{1,${a.length}}`)
			.replace(/[+()]/g, '\\$&');

		reg = new RegExp('^' + reg + '$');

		if (!reg.test(this.value) || this.value.length < 5 || (keyCode >= 48 && keyCode <= 57)) {
			this.value = newValue;
		}
		if (event.type === 'blur' && this.value.length < 5) {
			this.value = '';
		}
	}

	elems.forEach((elem) => {
		elem.addEventListener('input', mask);
		elem.addEventListener('focus', mask);
		elem.addEventListener('blur', mask);
	});
}

export function validateForm(formSelector) {
	const form = document.querySelector(formSelector);
	const nameInput = form.querySelector('input[name="name"]');
	const phoneInput = form.querySelector('input[name="phone"]');
	const checkbox = form.querySelector('input[type="checkbox"]');

	form.addEventListener('submit', async (e) => {
		e.preventDefault();

		clearErrors();

		let isValid = true;

		// Name validation
		const namePattern = /^[a-zA-Zа-яА-ЯЁё \-]+$/;
		if (!namePattern.test(nameInput.value.trim())) {
			showError(nameInput, 'Разрешены символы латиницы, кириллицы, знаки дефиса и пробелы.');
			isValid = false;
		}

		// Phone validation
		if (phoneInput.value.replace(/\D/g, '').length < 11) {
			showError(phoneInput, 'Введите корректный номер телефона');
			isValid = false;
		}

		// Checkbox validation
		if (!checkbox.checked) {
			showError(checkbox, 'Подтвердите согласие');
			isValid = false;
		}

		if (isValid) {
			const formData = {
				name: nameInput.value,
				phone: phoneInput.value,
				checkbox: checkbox.checked,
			};

			await sendData(formData);
		}
	});

	function showError(input, message) {
		const error = document.createElement('p');
		error.className = 'form__error';
		error.textContent = message;

		input.classList.add('form__input--error');

		if (input.type === 'checkbox') {
			input.closest('.checkbox')?.append(error);
			input.closest('.checkbox')?.classList.add('checkbox--error');
		} else {
			input.insertAdjacentElement('afterend', error);
		}
	}

	function clearErrors() {
		form.querySelectorAll('.form__error').forEach((el) => el.remove());
		form.querySelectorAll('.form__input--error').forEach((el) => el.classList.remove('form__input--error'));
		form.querySelectorAll('.checkbox--error').forEach((el) => el.classList.remove('checkbox--error'));
	}

	async function sendData(data) {
		// Мок отправки
		console.log('Данные отправлены:', data);
		await new Promise((res) => setTimeout(res, 1000));
	}
}
