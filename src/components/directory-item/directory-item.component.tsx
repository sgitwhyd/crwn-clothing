import { FC } from "react";
import { DirectoryCategoryTypes } from "../directory/directory.component";
import { useNavigate } from "react-router-dom";
import {
	DirectoryContainer,
	DirectoryBodyContainer,
	BackgroundImage,
} from "./directory.styles";

type DirectoryItemProps = {
	category: DirectoryCategoryTypes;
};

const DirectoryItem: FC<DirectoryItemProps> = ({ category }) => {
	const { title, imageUrl, route } = category;
	const navigate = useNavigate();

	const onNavigateHandler = () => navigate(route);

	return (
		<DirectoryContainer onClick={onNavigateHandler}>
			<BackgroundImage imageUrl={imageUrl} />
			<DirectoryBodyContainer>
				<h2>{title}</h2>
				<p>shop now</p>
			</DirectoryBodyContainer>
		</DirectoryContainer>
	);
};

export default DirectoryItem;
