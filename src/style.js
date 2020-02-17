import styled from 'vue-styled-components';

const color = {
	text: '#324c5a'
} 
// const font = {
// 	h1: '',
// 	h2: '',
// 	text: '',
// 	small: ''
// }

export const Icon = styled.div`
  background-image: url('./images/spritesheet.svg');
  background-repeat: no-repeat;
  display: inline-block;
  width: 64px;
  height: 64px;
` 

export const Card = styled.div`
	border-radius: 12px;
	box-shadow: 0 6px 15px 0 rgba(128, 197, 197, 0.72);
	color: ${color.text};
	background: white;
	width: 97%;
	margin: 10px;
`;

