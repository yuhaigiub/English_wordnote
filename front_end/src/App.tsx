import React from "react";
import style from "./App.module.css";
import { useModalContext } from "./contexts/modal";
import AddFormPage from "./pages/AddForm";
import Modal from "./pages/Modal";
import WordList from "./pages/WordList";

function App() {
	const modal = useModalContext();

	return (
		<>
			<div className={style.container}>
				<div className={style.left}>
					<AddFormPage />
				</div>
				<div className={style.right}>
					<WordList />
				</div>
			</div>
			{modal !== null ? <Modal id={modal} /> : null}
		</>
	);
}

export default App;
