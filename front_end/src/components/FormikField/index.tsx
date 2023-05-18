import React from "react";
import style from "./FormikField.module.css";

import { Field, ErrorMessage } from "formik";

const FormikField: React.FC<Props> = ({ name, label, options = [], as = "input" }) => {
	return (
		<div className={style.container}>
			<label className={style.label}>{label}: </label>

			{as !== "select" ? (
				<Field name={name} as={as} className={style.inputField} />
			) : (
				<Field name={name} as={as} className={style.selectField}>
					{options.map((opt) => (
						<option key={opt.value} value={opt.value} disabled={opt.value === ""}>
							{opt.label}
						</option>
					))}
				</Field>
			)}
			<ErrorMessage name={name}>
				{(msg) => <div className={style.errorMsg}>{msg}</div>}
			</ErrorMessage>
		</div>
	);
};

export default FormikField;

interface Props {
	name: string;
	label: string;
	as?: React.ReactNode;
	options?: { label: string; value: string }[];
}
