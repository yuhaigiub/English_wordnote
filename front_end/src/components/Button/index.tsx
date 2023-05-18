import React from "react";
import style from "./Button.module.css";

const Button: React.FC<Props> = ({ children, onClick, extraStyle, type = "submit" }) => {
	return (
		<button type={type} onClick={onClick} className={style.button} style={extraStyle}>
			{children}
		</button>
	);
};

export default Button;

interface Props {
	children?: React.ReactNode;
	type?: "submit" | "button" | "reset";
	onClick?: any;
	extraStyle?: any;
}
