import React, { useState } from 'react';
import Join from './Join';
import Create from './Create';
import { emailValidator, usernameValidator, passwordValidator } from '../../../utils/Forms/validation';
import './Forms.scss';

function Forms(props) {
	let [email, setEmail] = useState('');
	let [username, setUsername] = useState('');
	let [password, setPassword] = useState('');
	let [confirmPassword, setConfirmPassword] = useState('');
	let [error, setErrors] = useState({});
	let [isVisible, setVisible] = useState('flex');
	let [gameEnterType, setGameEnterType] = useState('');

	const handlePasswordsMustMatch = (livePass, liveConfirmPass) => {

		const checkPass = livePass !== null ? livePass : password;
		const checkConfirmPass = liveConfirmPass !== null ? liveConfirmPass : confirmPassword;

		if (!passwordValidator(checkPass, checkConfirmPass)) {
			
		console.warn('passwords mush match!!!', password, confirmPassword)
			setErrors(prevErrors => ({...prevErrors, password: 'Passwords Must Match!!!'}));

		}else{

			setErrors(prevErrors => {
				const {password, ...rest} = prevErrors;
				return rest;
			})

		}

	}
	const handleSubmit = async (event, matchRequestType) => {

		event.preventDefault();
		let email = event.target.email.value;
		let username = event.target.username.value;
		let password = event.target.password.value;
		let validationError = {};

		if (!emailValidator(email)) validationError.email = 'Email is not valid!';
		if (!usernameValidator(username)) validationError.username = 'Username is not valid';
		if (!passwordValidator(password, confirmPassword)) validationError.password = 'Passwords must match!!!';

		setErrors(validationError);
		for(let errors in validationError){
			console.log(errors);
		}
		if (Object.keys(validationError).length <= 0) {
			localStorage.setItem('account-created', true);
			setVisible('none');

			try {
				let accountData = await fetch('save-user', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email: email,
						username: username,
						password: password,
					}),
				});
				console.log('accountData', accountData, email, username, password);
			} catch (err) {
				console.log(err);
			}
			console.log('submitted');
		}else{
			alert('error');
		}
	};
	return (
		<React.Fragment>
			<div className="start-game">
				<form className="start-game-form" onSubmit={handleSubmit} style={{ display: isVisible }}>
					<div className="start-game-form-inputs">							
					<div className="email-container">

						<label htmlFor="email">Email:</label>
						<input
							type="text"
							id="email"
							className="email"
							name="email"
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						/>	</div>
						{error.email && <p>{error.email}</p>}							
						<div className="username-container">

							<label htmlFor="username">Username:</label>
							<input
								type="text"
									id="username"
								className="username"
								name="username"
								onChange={(e) => {
									setUsername(e.target.value);
								}}
							/>
						</div>
						{error.username && <p>{error.username}</p>}
						<div className="password-container">
							<label htmlFor="password">Password:</label>
							<input
								type="password"
								id="password"
								className="password"
								name="password"
								onChange={(e) => {
									setPassword(e.target.value);
									handlePasswordsMustMatch(e.target.value, null);
								}}
							/>
						</div>
						<div className="confirm-password-container">
							<label htmlFor="password">Confirm Password:</label>
							<input
								type="confirm_password"
								id="confirm_password"
								className="confirm_password"
								name="confirm_password"
								onChange={(e) => {
									//e.target.value !== password ? setErrors({ ...error, password: 'Passwords do not match!'}) : setErrors({ ...error, password: ''});
									handlePasswordsMustMatch(null, e.target.value);
									setConfirmPassword(e.target.value);
								}}
							/>
							{error.password && <p>{error.password}</p>}
						</div>
						
						<div className="create-account-buttons">
							<br />
							<button className='create-account' type="submit" onSubmit={handleSubmit}>Create Account</button>
						</div>
					</div>
				</form>
				<p>Terms and conditions</p>
			</div>
		</React.Fragment>

	);
}

export default Forms;
