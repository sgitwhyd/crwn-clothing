import styled from 'styled-components';

export const CategoryContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	column-gap: 20px;
	row-gap: 30px;
`;

export const Title = styled.div`
	font-size: 28px;
	margin-bottom: 25px;
	text-align: center;
	font-weight: 700;
`;
