
export function getPasswordStrength(password) {
	let strength = 0;
	const passwordLength = password.length;
	const hasLowercase = /[a-z]/.test(password);
	const hasUppercase = /[A-Z]/.test(password);
	const hasNumbers = /\d/.test(password);
	const hasSymbols = /[$-/:-?{-~!"^_`\\[\]]/.test(password);

	if (passwordLength >= 8) {
		strength += 1;
	}
	if (passwordLength >= 12) {
		strength += 1;
	}
	if (hasLowercase && hasUppercase) {
		strength += 1;
	}
	if (hasNumbers) {
		strength += 1;
	}
	if (hasSymbols) {
		strength += 1;
	}

	return strength;
}
export const passwordStrength = (password) => {
	switch (password) {
		case 0:
			return "Weak";

		case 1:
			return "Weak";

		case 2:
			return "Not Enough";

		case 3:
			return "Good";

		case 4:
			return "Strong";

		case 5:
			return "Strongest";
		default:
			return "Weak";
	}
};


