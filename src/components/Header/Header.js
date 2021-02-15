import React from "react";

import Button from "../Button";

import classes from "./Header.module.sass";

function Header() {
	return (
		<header className={classes.header}>
			<div className={classes.title}>Realworld Blog</div>
			<div className="wrapper">
				<Button>Sing In</Button>
				<Button style={["outlined", "green"]}>Sing Up</Button>
			</div>
		</header>
	);
}

export default Header;
