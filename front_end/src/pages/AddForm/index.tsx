import React from "react";
import style from "./AddForm.module.css";

import { Formik, Form, FormikHelpers } from "formik";
import FormikField from "../../components/FormikField";
import Button from "../../components/Button";
import { FormType, Word } from "../../types/interface";
import { useMutation, useQueryClient } from "react-query";
import { addWord } from "../../api/requests";
import { initialValues, validationSchema, wordTypeOptions } from "../../constants";
import { useAddWordMutation } from "../../hooks/reactQuery";

const AddFormPage = () => {
	const queryClient = useQueryClient();
	const mutation = useAddWordMutation();

	const handleSubmit = (values: FormType, actions: FormikHelpers<FormType>) => {
		const { name, ...initialMeaning } = values;
		mutation.mutate({
			name,
			definitions: [initialMeaning],
		});
		actions.resetForm();
		actions.setSubmitting(false);
		setTimeout(() => {
			mutation.reset();
		}, 5000);
	};

	return (
		<div className={style.container}>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}>
				<Form className={style.formContainer}>
					<h1 className={style.title}>Word Adder</h1>
					<FormikField name="name" label="Word name" />
					<FormikField name="type" label="Type" as="select" options={wordTypeOptions} />
					<FormikField name="en" label="English definition" as="textarea" />
					<FormikField name="vi" label="Vietnamese meaning" />
					<Button type="submit" extraStyle={{ width: "50%" }}>
						Create
					</Button>
					<div className={style.msgContainer}>
						{mutation.isLoading ? <div className={style.pendingMsg}>Creating new word</div> : null}
						{mutation.isSuccess ? (
							<div className={style.successMsg}>Word created successfully</div>
						) : null}
						{mutation.isError ? <div className={style.errorMsg}>An error happended</div> : null}
					</div>
				</Form>
			</Formik>
		</div>
	);
};

export default AddFormPage;
