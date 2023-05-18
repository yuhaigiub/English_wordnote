import React from "react";
import CustomField from "../../../../components/CustomField";
import { wordTypeOptions } from "../../../../constants";

const ModalLeft: React.FC<Props> = ({ formik }) => {
	return (
		<>
			<CustomField name="name" formik={formik} label="Name" extraStyle={{ height: "1.6rem" }} />
			<CustomField
				name="type"
				formik={formik}
				label="Type"
				type="select"
				options={wordTypeOptions}
				extraStyle={{ height: "1.8rem" }}
			/>

			<CustomField
				name="en"
				formik={formik}
				label="English definition"
				type="textarea"
				extraStyle={{
					resize: "none",
					height: "4rem",
					paddingBlock: "0.5rem",
				}}
			/>
			<CustomField
				name="vi"
				formik={formik}
				label="Vietnamese meaning"
				extraStyle={{ height: "1.6rem" }}
			/>
		</>
	);
};

export default ModalLeft;

interface Props {
	formik: any;
}
