import { useNavigate } from 'react-router-dom';
import {
	DirectoryContainer,
	DirectoryBodyContainer,
	BackgroundImage,
} from './directory.styles.jsx';

const DirectoryItem = ({ category }) => {
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
