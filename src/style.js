import styled from 'vue-styled-components';
import buttonClose from './assets/button_close.svg';
import { injectGlobal } from 'vue-styled-components';

// Intial
export const InitialLayout = injectGlobal`
	*{
	  box-sizing: border-box;
	  font-family: 'Lato', 'Noto Sans TC';
	}

	#app, html, body {
	  width: 100%;
	  height: 100%;
	  margin: 0;
	}
`

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

const iconProps = { iconUrl: String, size: Number };
export const Icon = styled('div', iconProps)`
  background-image: url('${props => props.iconUrl}');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  display: inline-block;
  width: ${props => props.size || 10}px;
  height: ${props => props.size || 10}px;
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
	display: flex;
	align-items: center;
	width: ${props => props.inputBasis};
	margin: 0;
	margin-bottom: 10px;
	input {
		cursor: pointer;
		margin: 0;
	}
	label {
		font-size: ${font.h2}
		color: ${color.text};
		cursor: pointer;
		margin-left: 8px;
	}
	textarea {
		height: 100px;
		border: #d9dbdb 1px solid;
		border-radius: 8px;
		width: 75%;
		padding: 10px;
		&:focus {
			outline: none;
			border: ${color.primary} 1px solid;
		}
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
	input[type="checkbox"] {
		position: relative;
    -webkit-appearance: none;
    vertical-align: middle;
    background: #fff;
    border: ${color.primary} solid 1px;
    border-radius: 3px;
    min-height: 12px;
    min-width: 12px;
    &:focus {
    	outline: none;
    }
    &:checked {
    	background: ${color.primary};	    	
    	&::after {
		    content: '';
		    top: 1px;
		    left: 1px;
		    z-index: 2;
		    position: absolute;
		    background: transparent;
		    border: #fff solid 2px;
		    border-top: none;
		    border-right: none;
		    height: 3px;
		    width: 6px;
		    -moz-transform: rotate(-45deg);
		    -ms-transform: rotate(-45deg);
		    -webkit-transform: rotate(-45deg); 
		    transform: rotate(-45deg);	
    	}
    }
	}
	input[type='radio'] {
    display: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    -o-appearance: none;
    appearance: none;
    background-color: white;
    box-shadow: 0 0 0 3px white, 0 0 0 4px ${color.primary};
    border-radius: 10px;
    width: 100%;
    display: inline-block;
    width: 6px;
    height: 6px;
    cursor: pointer;
    &:checked {
	    outline: none;
	    background: ${color.primary};
    }
  	&::-ms-check {
  		display: none;
  	}
	}
	input[type='date'] {
		padding: 5px;
		border-radius: 8px;
		border: #d9dbdb 1px solid;
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
  justify-content: space-evenly;
  align-items: center;
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
	display: flex;
	z-index: 1;
	justify-content: center;
	align-items: center;
	bottom: 0; 
	left: 0;
	background: white;
	height: 10%;
	width: 100%;
	& > * {
		margin-right: 10px;
	}
`

const wrapperProps = { wrapperAlign: String };
export const FormWrapper = styled('div', wrapperProps)`
	display: flex;
	flex-wrap: wrap;
	align-items: ${props => props.wrapperAlign || 'flex-start'};
	> * {
		margin-left: 20px;
	}
`

// Templates
const cardProps = { cardDirection: String };
export const Card = styled('div', cardProps)`
	display: flex;
	flex-direction: ${props => props.cardDirection || 'row'}
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
	overflow-x: hidden;
	width: 90%;
	border-radius: 8px;
	background: ${color.bg};
	z-index: 1;
	box-shadow: 
		0 0 0 100px rgba(1,1,1,.3),
		0 0 0 100px rgba(1,1,1,.3);
	height: 90%;
	main {
		height: 80%;
		overflow-y: scroll;
	}
`

