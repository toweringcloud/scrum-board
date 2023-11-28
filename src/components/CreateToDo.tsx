import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";

import { Categories, catState, toDosState } from "../atoms";

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
	border-radius: 5px;
	background-color: ${(props) => props.theme.bgColor};
`;
const Button = styled.button`
	width: 50px;
	height: 30px;
	border: 1px solid transparent;
	border-radius: 10px;
	background-color: ${(props) => props.theme.accentColor};
	color: ${(props) => props.theme.textColor};
	font-size: 15px;
	font-weight: 600;
	cursor: pointer;
	&:hover {
		background-color: ${(props) => props.theme.contentColor};
	}
`;
const Warning = styled.span`
	font-size: 12px;
	color: ${(props) => props.theme.contentColor};
`;

function CreateToDo() {
	const setToDos = useSetRecoilState(toDosState);
	const [category, setCategory] = useRecoilState(catState);
	const { register, handleSubmit, setValue, formState } = useForm<IForm>();

	const handleValid = ({ toDo }: IForm) => {
		if (!category) setCategory(Object.keys(Categories)[0] as any);
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
							required: "Please, write a task to do!",
							minLength: {
								value: 2,
								message: "Your task is too short (min 2)!",
							},
							maxLength: {
								value: 30,
								message: "Your task is too long (max 30)!",
							},
						})}
						placeholder="Write a task to do."
					/>
					<Button>ADD</Button>
				</Create>
			</form>
			<Warning>{formState.errors?.toDo?.message}</Warning>
		</>
	);
}
export default CreateToDo;
