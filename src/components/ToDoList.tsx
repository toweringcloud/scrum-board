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
const NoData = styled.div`
	width: 30vw;
	height: 6vh;
	border: 1px dotted white;
	border-radius: 15px;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const Warning = styled.span`
	font-size: 12px;
	color: orange;
`;
const Delete = styled.span`
	margin-left: 5px;
	cursor: pointer;
	&:hover {
		color: white;
	}
	svg {
		width: 20px;
		fill: tomato;
	}
`;

function ToDoList() {
	const toDosGroup = useRecoilValue(toDoSelectors);
	const [customCats, setCustomCats] = useRecoilState(catsState);
	const [category, setCategory] = useRecoilState(catState);
	const { register, handleSubmit, setValue, formState } = useForm<IForm>();

	// add new category
	const handleAdd = ({ category }: IForm) => {
		setCustomCats((oldCats) => [
			{ text: category.trim().toUpperCase(), id: Date.now() },
			...oldCats,
		]);
		setValue("category", "");
	};

	// remove empty category
	const handleRemove = (event: React.MouseEvent<HTMLSpanElement>) => {
		setCustomCats((oldCats) =>
			oldCats.filter(
				(category) => category.text !== event.currentTarget.id
			)
		);
	};

	// update selected category
	const handleInput = (event: React.FormEvent<HTMLSelectElement>) => {
		setCategory(event.currentTarget.value as any);
	};

	return (
		<Wrapper>
			<Header>
				<Title>Scrum Board</Title>
				<Action>
					<form onSubmit={handleSubmit(handleAdd)}>
						<Label htmlFor="category">Category </Label>
						<Select
							id="category"
							value={category}
							onInput={handleInput}
						>
							<option value={Categories.TO_DO}>TO DO</option>
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
								pattern: {
									value: /^[A-Za-z0-9_-]{2,5}$/,
									message:
										"Only alphanumeric with 2~5 characters allowed!",
								},
							})}
							placeholder="Write a category"
							disabled={customCats.length >= 3}
						/>
						{customCats.length < 3 && (
							<Button name="newCat">NEW</Button>
						)}
						{customCats.length >= 3 && <Warning>Max 3</Warning>}
					</form>
					<hr />
					<CreateToDo />
				</Action>
				<Warning>{formState.errors?.category?.message}</Warning>
			</Header>
			<Content>
				{Object.keys(toDosGroup).map((key) => (
					<Group>
						<Category>
							{key}
							{toDosGroup[key].length === 0 &&
								["TO_DO", "DOING", "DONE"].find(
									(i) => i === key
								) === undefined && (
									<Delete id={key} onClick={handleRemove}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-6 h-6"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
											/>
										</svg>
									</Delete>
								)}
						</Category>
						{toDosGroup[key].length === 0 && (
							<NoData>No Content</NoData>
						)}
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
