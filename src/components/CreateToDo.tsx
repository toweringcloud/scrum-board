import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { catState, toDosState } from "../atoms";

interface IForm {
	toDo: string;
}

const Create = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 5px;
`;
const Input = styled.input`
	width: 300px;
	height: 30px;
	border-radius: 10px;
	background-color: white;
`;
const Button = styled.button`
	width: 50px;
	height: 30px;
	border-radius: 10px;
	background-color: ${(props) => props.theme.accentColor};
	color: black;
	font-size: 15px;
	font-weight: 600;
	cursor: pointer;
	&:hover {
		color: white;
	}
`;

function CreateToDo() {
	const setToDos = useSetRecoilState(toDosState);
	const category = useRecoilValue(catState);
	const { register, handleSubmit, setValue } = useForm<IForm>();

	const handleValid = ({ toDo }: IForm) => {
		setToDos((oldToDos) => [
			{ text: toDo, id: Date.now(), category },
			...oldToDos,
		]);
		setValue("toDo", "");
	};

	return (
		<>
			<form onSubmit={handleSubmit(handleValid)}>
				<Create>
					<Input
						{...register("toDo", {
							required: "Please write a To Do",
						})}
						placeholder="Write a to do"
					/>
					<Button>ADD</Button>
				</Create>
			</form>
		</>
	);
}
export default CreateToDo;
