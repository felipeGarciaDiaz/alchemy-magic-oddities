import React, { useState } from 'react';
import './Home.scss';
import Form from '../../components/home-screen/Forms/Forms';
import Login from '../../components/home-screen/Forms/Login';
function Home(props) {
	return (
		<React.Fragment>
			<div class="home-void">
				<div className="home-container">
					<h1>
						Alchemy, Magic, and <br /> Other Oddities!!!
					</h1>
					{!localStorage.getItem('account-created') ? (
						<Form />
					) : (
						<Login />
					)}
				</div>
			</div>
		</React.Fragment>
	);
}

export default Home;
