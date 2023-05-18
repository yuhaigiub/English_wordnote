import React, { useState } from "react";
import style from "./Modal.module.css";

import { useFormik } from "formik";
import { useQueryClient } from "react-query";

import { initialValues, validationSchema } from "../../constants";
import { useSetModalContext } from "../../contexts/modal";
import {
	useDeleteWordMutation,
	useGetWordQuery,
	useUpdateWordMutation,
} from "../../hooks/reactQuery";

import { FormType, Word } from "../../types/interface";
import ModalLeft from "./components/ModalLeft";
import ModalRight from "./components/ModalRight";
import ModalView from "./components/ModalView";

const Modal: React.FC<Props> = ({ id }) => {
	// React-Query
	const queryClient = useQueryClient();
	const updateWordMutation = useUpdateWordMutation();
	const deleteWordMutation = useDeleteWordMutation();
	const { isLoading, isError, error, data } = useGetWordQuery(id);

	// React
	const [showMeaning, setShowMeaning] = useState<boolean>(false);
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const setModal = useSetModalContext();

	const [isEditing, setIsEditing] = useState<boolean>(false);

	//Formik
	const formik = useFormik({
		initialValues,
		onSubmit: (values: FormType, actions) => {},
		validationSchema,
	});

	const handleAdd = () => {
		if (!data) return;
		formik.validateForm().then((res) => {
			if (Object.keys(res).length === 0) {
				const newData: Word = {
					name: formik.values.name,
					definitions: [
						...data.definitions,
						{
							type: formik.values.type,
							vi: formik.values.vi,
							en: formik.values.en,
						},
					],
				};
				updateWordMutation.mutate({ id: data._id, rev: data._rev, data: newData });
				setCurrentIndex(newData.definitions.length - 1);
			} else {
				alert("please fill in all informations!");
			}
		});
	};

	const handleSave = () => {
		if (!data) return;
		formik.validateForm().then((res) => {
			if (Object.keys(res).length === 0) {
				const newData: Word = {
					name: formik.values.name,
					definitions: data.definitions.map((definition, index) => {
						if (index !== currentIndex) return definition;
						return {
							type: formik.values.type,
							vi: formik.values.vi,
							en: formik.values.en,
						};
					}),
				};
				updateWordMutation.mutate({ id: data._id, rev: data._rev, data: newData });
			} else {
				alert("please fill in all informations!");
			}
		});
	};

	const handleDone = () => {
		queryClient.invalidateQueries("word");
		setIsEditing(false);
	};

	const handleUpdate = () => {
		if (!data) return;
		formik.setValues({
			name: data.name,
			type: data.definitions[0].type,
			vi: data.definitions[0].vi,
			en: data.definitions[0].en,
		});
		setIsEditing(true);
	};

	const handleDelete = () => {
		if (!data) return;
		deleteWordMutation.mutate({ id: data._id, rev: data._rev });
		setModal(null);
	};

	const handleDecrement = () => {
		if (!data) return;
		setShowMeaning(false);
		setCurrentIndex((index) => (index - 1 < 0 ? data.definitions.length - 1 : index - 1));
	};

	const handleIncrement = () => {
		if (!data) return;
		setShowMeaning(false);
		setCurrentIndex((index) => (index + 1 > data.definitions.length - 1 ? 0 : index + 1));
	};

	return data ? (
		<div
			className={style.container}
			onClick={() => {
				queryClient.invalidateQueries("words");
				setModal(null);
			}}>
			<form
				onSubmit={formik.handleSubmit}
				className={style.innerContainer}
				onClick={(e) => {
					e.stopPropagation();
				}}
				style={
					isEditing
						? {
								gridTemplateRows: "1fr",
								gridTemplateColumns: "5fr 6fr",
								gap: "1em",
								width: "60%",
						  }
						: {}
				}>
				{isEditing ? (
					<>
						<div className={style.inputLeft}>
							<ModalLeft formik={formik} />
						</div>
						<div className={style.inputRight}>
							<ModalRight
								{...{
									data,
									currentIndex,
									setCurrentIndex,
									formik,
									updateWordMutation,
									handleAdd,
									handleDone,
									handleSave,
								}}
							/>
						</div>
					</>
				) : (
					<ModalView
						{...{
							currentIndex,
							data,
							showMeaning,
							setShowMeaning,
							handleIncrement,
							handleDecrement,
							handleUpdate,
							handleDelete,
						}}
					/>
				)}
			</form>
		</div>
	) : (
		<></>
	);
};

export default Modal;

interface Props {
	id: string;
}
