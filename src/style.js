import styled from 'vue-styled-components';
import buttonMore from './assets/button_more.svg';
import buttonClose from './assets/button_close.svg';

// Atoms
const color = {
	text: '#324c5a',
	primary: '#05b077',
	contrast: '#3aafb1',
	bg: 'white'
} 
const font = {
	h1: '18px',
	h2: '16px',
	h3: '14px',
	text: '12px'
}

const titleProps = { textAlign: String };
export const Title = styled('p', titleProps)`
  text-align: ${props => props.textAlign};
  font-weight: bold;
  font-size: ${font.h1};
  color: ${color.text};
`

export const Icon = styled.div`
  background-image: url(${buttonMore});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  display: inline-block;
  width: 20px;
  height: 20px;
` 

const listItemProps = { listBasis: String}
export const ListItem = styled('li', listItemProps)`
	flex-basis: ${props => props.listBasis};
  &::before {
    content: "•"; 
    color: #05b077;
    display: inline-block; 
    width: 1em;
    margin-left: -.8em
  }
`

// Molecules
const listProps = { listDirection: String }
export const List = styled('ul', listProps)`
	display: flex;
	flex-direction: ${props => props.listDirection};
	flex-wrap: wrap;
	margin: 0px;
  padding: 0px 0px 0px 15px;
  list-style: none;
  > * {
  	margin-right: ${props => props.listDirection === 'row' ? '1.2em' : '0'};
  	margin-bottom: .2em;
  }
`

const formInputProps = { inputBasis: String }
export const FormInput = styled('div', formInputProps)`
	flex-basis: ${props => props.inputBasis};
	margin: 0px;
	input {
		cursor: pointer;
	}
	label {
		margin: 5px;
		color: ${color.text};
		cursor: pointer;
	}
	input[type='text'] {
		color: ${color.text};
		font-size: ${font.h2};
		padding: 5px;
		width: 350px;
		border-radius: 8px;
		border: #d9dbdb 1px solid;
		&:focus {
			outline: none;
			border: ${color.primary} 1px solid;
		}
	}
	input[type='checkbox'] {
	}
	input[type='radio'] {
	}
`

const btnProps = { bgColor: String };
export const Button = styled('div', btnProps)`
  display: flex;
  justify-content: center;
  background: ${props => props.bgColor || color.primary};
  box-shadow: 0 4px 12px 0 ${props => props.bgColor || color.primary};
  border-radius: 20px;
  color: white;
  width: 105px;
  padding: 5px 0;
  cursor: pointer;
`

export const CloseButton = styled.div`
  background-image: url(${buttonClose});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  display: inline-block;
  width: 30px;
  height: 30px;
  cursor: pointer;
  position: fixed;
  right: 10px;
  top: 10px;
`

export const DropDown = styled.div`
  display: flex;
  justify-content: center;
  background: #05b077;
  box-shadow: 0 4px 12px 0 #85cbcb;
  border-radius: 20px;
  color: white;
  width: 105px;
  padding: 5px 0;
  cursor: pointer;
`

export const MoreButton = styled.div`
  display: flex; 
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
  p {
    display: inline-block;
    color: ${color.contrast};
    font-size: ${font.h3};
  }
`

// Organisms
export const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 0; 
  left: 0;
  display: flex;
	justify-content: center;
	align-items: center;
	background: white;
	padding: 35px;
	width: 100%;
	& > * {
		margin-right: 10px;
	}
`

export const FormWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	> * {
		margin-left: 20px;
	}
`

// Templates
export const Card = styled.div`
	display: flex;
	border-radius: 12px;
	box-shadow: 0 6px 15px 0 rgba(128, 197, 197, 0.72);
	color: ${color.text};
	background: ${color.bg};
	width: 97%;
	margin: 10px;
`;

export const Modal = styled.div`
	position: fixed;
	left: 50%
	top: 50%;
	transform: translate(-50%, -50%);
	overflow-y: scroll;
	overflow-x: hidden;
	width: 90%;
	border-radius: 8px;
	background: ${color.bg};
	padding: 20px;
	z-index: 2;
	box-shadow: 
		0 0 0 100px rgba(1,1,1,.3),
		0 0 0 100px rgba(1,1,1,.3);
	height: 90%;
`

