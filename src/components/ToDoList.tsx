import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";

import { Categories, catState, catsState, toDoSelectors } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

interface IForm {
	category: string;
}

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 1fr 2fr;
	gap: 20px;
`;
const Header = styled.div`
	height: 30vh;
	grid-column: 1 / -1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 5px;
`;
const Title = styled.span`
	font-size: 50px;
	font-weight: 600;
	margin: 20px;
`;
const Action = styled.div`
	border: 1px solid white;
	border-radius: 10px;
	padding: 10px;
`;
const Label = styled.label`
	font-weight: 600;
`;
const Select = styled.select`
	width: 90px;
	height: 28px;
	border-radius: 10px;
	background-color: ${(props) => props.theme.accentColor};
	font-size: 15px;
	font-weight: 600;
`;
const Input = styled.input`
	width: 130px;
	height: 30px;
	border-radius: 10px;
	margin-left: 5px;
	margin-right: 5px;
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
const Content = styled.div`
	padding: 30px;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: auto;
	grid-auto-rows: auto;
	gap: 10px;
`;
const Group = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	gap: 5px;
`;
const Category = styled.span`
	font-size: 20px;
	font-weight: 600;
	margin-bottom: 10px;
`;

function ToDoList() {
	const toDosGroup = useRecoilValue(toDoSelectors);
	const [customCats, setCustomCats] = useRecoilState(catsState);
	const [category, setCategory] = useRecoilState(catState);
	const { register, handleSubmit, setValue } = useForm<IForm>();

	const handleValid = ({ category }: IForm) => {
		setCustomCats((oldCats) => [
			{ text: category, id: Date.now() },
			...oldCats,
		]);
		setValue("category", "");
	};
	const handleInput = (event: React.FormEvent<HTMLSelectElement>) => {
		setCategory(event.currentTarget.value as any);
	};

	return (
		<Wrapper>
			<Header>
				<Title>To Do List</Title>
				<Action>
					<form onSubmit={handleSubmit(handleValid)}>
						<Label htmlFor="category">Category </Label>
						<Select
							id="category"
							value={category}
							onInput={handleInput}
						>
							<option value={Categories.TO_DO}>TO_DO</option>
							<option value={Categories.DOING}>DOING</option>
							<option value={Categories.DONE}>DONE!</option>
							{customCats.map((customCat) => (
								<option value={customCat.text}>
									{customCat.text}
								</option>
							))}
						</Select>
						<Input
							{...register("category", {
								required: "Please write a category",
							})}
							placeholder="Write a category"
						/>
						<Button>NEW</Button>
					</form>
					<hr />
					<CreateToDo />
				</Action>
			</Header>
			<Content>
				{Object.keys(toDosGroup).map((key) => (
					<Group>
						<Category>{key}</Category>
						{toDosGroup[key]?.map((toDo: any) => (
							<ToDo key={toDo.id} {...toDo} />
						))}
					</Group>
				))}
			</Content>
		</Wrapper>
	);
}
export default ToDoList;
