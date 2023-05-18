import React from "react";
import style from "./CustomField.module.css";

const CustomField: React.FC<Props> = ({
	label,
	formik,
	name,
	type = "input",
	options = [],
	extraStyle = {},
}) => {
	return (
		<div>
			<label className={style.label}>{label}: </label>
			{type === "input" && (
				<input
					id={name}
					{...formik.getFieldProps(name)}
					className={style.input}
					style={extraStyle}
				/>
			)}
			{type === "select" && (
				<select
					id={name}
					{...formik.getFieldProps(name)}
					className={style.select}
					style={extraStyle}>
					{options.map((opt) => (
						<option key={opt.value} value={opt.value} disabled={opt.value === ""}>
							{opt.label}
						</option>
					))}
				</select>
			)}
			{type === "textarea" && (
				<textarea
					id={name}
					{...formik.getFieldProps(name)}
					className={style.textarea}
					style={extraStyle}
				/>
			)}

			<ErrorDisplay formik={formik} name={name} />
		</div>
	);
};

export default CustomField;

interface Props {
	label: string;
	formik: any;
	name: string;
	type?: string;
	options?: { label: string; value: string }[];
	extraStyle?: any;
}

const ErrorDisplay: React.FC<{ formik: any; name: string }> = ({ formik, name }) => {
	return formik.touched[name] && formik.errors[name] ? (
		<div className={style.errorMsg}>{formik.errors[name]}</div>
	) : (
		<div style={{ color: "transparent" }}>placeholder</div>
	);
};
