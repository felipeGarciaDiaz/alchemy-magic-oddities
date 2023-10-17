export const emailValidator = (email) => {
	let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	return emailRegex.test(String(email).toLowerCase());
};

export const usernameValidator = (username) => {
	let usernameRegex = /^[a-zA-Z0-9]+$/;
	return usernameRegex.test(String(username).toLowerCase());
};

export const passwordValidator = (password, confirmPassword) => {
	if (password === confirmPassword) {
		return true;
	}
	return;
}