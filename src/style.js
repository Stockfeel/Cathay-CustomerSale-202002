import styled from 'vue-styled-components';
import buttonClose from './assets/button_close.svg';
import noTime from './assets/btn-icon-notime.svg';
import no from './assets/btn-icon-no.svg';
import yes from './assets/btn-icon-yes.svg';
import calendar from './assets/icon-calendar.svg';
import arrowRight from './assets/icon-arrow-white-right.svg';
import { injectGlobal } from 'vue-styled-components';

// Atoms
const color = {
	text: "#324c5a",
	primary: "#05b077",
	contrast: "#3aafb1",
  wait: "#efbd00",
  reject: "#616161",
	bg: "white"
} 
const font = {
	h1: "18px",
	h2: "16px",
	h3: "14px",
	text: "12px"
}

const convertBoxShadowHsl = (hsl) => {
  const strArr = hsl.split(',');
  const h = strArr[0];
  const s = strArr[1];
  const l = `${parseFloat(strArr[2])-10}%`;
  return `${h},${s},${l}`
}

// Intial
export const InitialLayout = injectGlobal`
  *{
    box-sizing: border-box;
    font-family: 'Lato', 'Noto Sans TC';
    padding: 0;
    margin: 0;
    scrollbar-base-color: #000;
    scrollbar-face-color: rgba(147, 209, 209, 0.3);
    scrollbar-highlight-color: white;
    scrollbar-track-color: white;
    scrollbar-arrow-color: white;
    scrollbar-shadow-color: white;
    scrollbar-dark-shadow-color: white;
  }
  #app, html, body {
    width: 100%;
    height: 100%;
    margin: 0;
  }

  #app {
    display: flex;
  }

  .app {
    width: 33.33%;
    overflow: scroll;
    position: relative;
    &.hidden {
      width: 0;
    }
  }

  iframe {
    width: 66.66%;
    height: 100%;
    &.open {
      width: 100%;
    }
  }

  .tab {
    position: fixed;
    z-index: 10;
    left: 66.66%;
    top: 50%;
    transform: translate(-100%, -50%);
    height: 110px;
    width: 40px;
    background: #00bdbf;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    &::after {
      content: "收合";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      margin-left: 1px;
    }
    &::before {
      content: "";
      background-image: url('${arrowRight}');
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      width: 10px;
      height: 10px;
      position: absolute;
      left: 50%;
      top: 75%;
      transform: translate(-50%) rotate(0);
    }
    &.open {
      left: 100%;
      &::after {
        content: "展開";
      }
      &::before {
        transform: translate(-50%) rotate(180deg);
      } 
    }
  }

  *::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(147, 209, 209, 0.3);
  }

  p.warning {
    color: red;
    font-weight: normal;
    font-size: 12px;
  }

  .custom__tooltip .tooltip-inner {
     background-color: #fff !important;
     color: ${color.text} !important;
     box-shadow: 0 0 8px 2px rgba(210, 70, 95, 0.5);
  }

  .custom__tooltip .arrow::before {
     border-top-color: #fff !important;
  }

  .page-item.custom__pagination {
    .page-link {
      color: ${color.text};
      background-color: white;
      border-radius: 50%;
      border: none;
    } 
    &.active .page-link{
      background-color: white;
      color: ${color.primary}
      &:focus {
        outline: none;
        border: none;
        box-shadow: none;
      }
    }
  }
`

const LinkProps = { textColor: String };
export const LinkStyle = styled('span', LinkProps)`
	color: ${props => props.textColor || 'white'}; 
	text-decoration: none;
`

const titleProps = { textAlign: String };
export const Title = styled('p', titleProps)`
  text-align: ${props => props.textAlign};
  font-weight: bold;
  font-size: ${font.h1};
  color: ${color.text};
  margin: 0;
  display: flex;
  align-items: flex-end;
  span {
    font-size: 16px;
  }
`

const iconProps = { iconUrl: String, size: Number, rotate: Number };
export const Icon = styled('div', iconProps)`
  position: relative;
  background-image: url('${props => props.iconUrl}');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  display: inline-block;
  width: ${props => props.size || 10}px;
  height: ${props => props.size || 10}px;
  transform: rotate(${props => props.rotate || 0}deg);
` 

const starProps = { word: String }
export const StarIcon = styled(Icon, starProps)`
  position: absolute; 
  top: -15px;
  left: -15px;
  &:after {
    content: '${props => props.word || ''}';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${color.text};
    font-size: 15px;
  }
` 

const listItemProps = { listBasis: String}
export const ListItem = styled('li', listItemProps)`
	flex-basis: ${props => props.listBasis};
	list-style: none;
  &::before {
    content: "•"; 
    color: #05b077;
    display: inline-block; 
    width: .8em;
    margin-left: -.8em
  }
`

const imageProps = { imgUrl: String };
export const Image = styled('div', imageProps)`
  background-image: url('${props => props.imgUrl}');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  display: block;
  width: 300px;
  height: 300px;
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
  position: relative;
	display: flex;
	align-items: center;
	width: ${props => props.inputBasis || '100%'};
	margin: 0;
	font-size: 14px;
	input {
		cursor: pointer;
		margin: 0;
	}
	span {
		margin-left: 8px;
	}
	label {
		font-size: ${font.h2}
		color: ${color.text};
		cursor: pointer;
		margin: 0;
		margin-left: 10px;
    &.inline-label {
      font-size: 14px;
    }
	}
	textarea {
		height: 60px;
		border: #d9dbdb 1px solid;
		border-radius: 8px;
		width: 100%;
		padding: 10px;
		&:focus {
			outline: none;
			border: ${color.primary} 1px solid;
		}
    &.lock {
      border: red 1px solid;
    }
	}
	input[type='text'] {
		color: ${color.text};
		font-size: ${font.h2};
		padding: 5px;
		border: none;
		border-bottom: #d9dbdb 1px solid;
		width: 80%;
		&:focus {
			outline: none;
			border-bottom: ${color.primary} 1px solid;
		}
    &.inline-input {
      width: 30%;
      padding: 0;
    }
	}
	input[type="checkbox"] {
    position: relative;
    display: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    -o-appearance: none;
    appearance: none;
    background-color: white;
    box-shadow: 0 0 0 3px white, 0 0 0 4px ${color.primary};
    width: 100%;
    display: inline-block;
    width: 6px;
    height: 6px;
    cursor: pointer;
    &:focus {
    	outline: none;
    }
    &:checked {
    	background: ${color.primary};	  
      box-shadow: 0 0 0 3px ${color.primary}, 0 0 0 4px ${color.primary}; 	
    	& + label::before {
		    content: '';
		    margin-left: -12px;
        margin-top: 11px;
		    z-index: 2;
        border: 1px solid black;
		    position: absolute;
		    background: transparent;
		    border: #fff solid 2px;
		    border-top: none;
		    border-right: none;
		    height: 4px;
		    width: 8px;
		    -moz-transform: translate(-50%, -50%) rotate(-45deg);
		    -ms-transform: translate(-50%, -50%) rotate(-45deg);
		    -webkit-transform: translate(-50%, -50%) rotate(-45deg); 
		    transform: translate(-50%, -50%) rotate(-45deg);	
    	}
    }
    &::-ms-check {
      display: none;
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
	    box-shadow: 0 0 0 3px ${color.primary}, 0 0 0 4px ${color.primary};
    }
  	&::-ms-check {
  		display: none;
  	}
	}
	input[type='date'] {
		padding: 5px;
		border-radius: 8px;
		border: #d9dbdb 1px solid;
    &::-webkit-calendar-picker-indicator {
      margin-top: 4px;
      display: block;
      color: rgba(0, 0, 0, 0);
      opacity: 1;
      background: url(${calendar}) no-repeat;
      width: 20px;
      height: 20px;
    }
    &::-webkit-inner-spin-button { 
      -webkit-appearance: none;
      display: none;
    }
    &::-webkit-clear-button {
      display: none;
    }
	}
  .word__count {
    position: absolute;
    color: #628ea7;
    right: 3%;
    bottom: 10px;
    &.lock {
      color: red;
    }
  }
`

const btnProps = { 
  bgColor: String, 
  textColor: String, 
  borderColor: String,
  padding: Number };
export const Button = styled('div', btnProps)`
  display: flex;
  justify-content: center;
  background: ${props => props.bgColor || color.primary};
  box-shadow: 0 4px 12px 0 ${props => props.borderColor ? props.borderColor : props.bgColor};
  border-radius: 20px;
  color: ${props => props.textColor || "white"};
  border: ${props => props.borderColor || 'none'} solid 1px;
  padding: 5px ${props => props.padding || '20'}px;
  cursor: pointer;
  &.lock {
    opacity: .5;
  }
  &.active {
    background: ${color.primary};
    color: white;
  }
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
`

export const DropDownButton = styled.div`
  display: inline-block;
  text-align: center;
  background: #05b077;
  box-shadow: 0 4px 12px 0 #85cbcb;
  border-radius: 20px;
  color: white;
  width: 110px;
  padding: 5px 0;
  cursor: pointer;
  & > * {
    margin: 0 5px;
    display: inline-block;
    vertical-align: middle;
  }
`

const moreProps = { align: String };
export const MoreButton = styled('div', moreProps)`
  display: flex; 
  align-items: center;
  justify-content: ${ props => props.align || 'flex-end'};
  cursor: pointer;
  p {
  	margin: 0;
    display: inline-block;
    color: ${color.contrast};
    font-size: ${font.h3};
  }
`

const suggestProps = { state: Number }
const styleButton = type => {
  switch (type) {
    case 1:
      return {
        color: color.primary,
        hsl: '160,94.5%,35.5%',
        url: yes,
      }
    case 2:
      return {
        color: color.wait,
        hsl: '47.4,100%,46.9%',
        url: noTime,
      }
    case 3:
      return {
        color: color.reject,
        hsl: '0,0%,38%',
        url: no,
      }
    default:
      return {
        color: "#06bdc0",
        hsl: '181,93.9%,38.8%',
        url: '',
      };
  }
}

export const SuggestButton = styled('div', suggestProps)`
  position: relative;
	color: white;
	height: 45px;
	border-radius: 23px;
  width: 223px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => styleButton(props.state).color};
  box-shadow: 0 2px 6px 0 hsla(${props => convertBoxShadowHsl(styleButton(props.state).hsl)}, 0.5);
  margin: 8px 0;
  @media (max-width: 1280px) {
    width: 90%;
    margin: 8px auto;
  }
  &:after {
    position: absolute; 
    right: 10px; 
    top: 50%;
    transform: translateY(-50%);
    content: '';
    width: 30px;
    height: 30px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background: url('${props => styleButton(props.state).url}');
    border-radius: 15px;
  }
`

export const SendButton = styled.div`
  display: flex;
  justify-content: center;
  background: ${color.primary};
  border-radius: 20px;
  color: white;
  width: 105px;
  padding: 2px 0;
  cursor: pointer;
`

const switchProps = { word: String };
export const SwitchButton = styled("label", switchProps)`
  position: relative;
  display: inline-block;
  width: 124px;
  height: 34px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #05b077;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 17px;
    box-shadow: 0 2px 14px 0 rgba(5, 176, 116, 0.28);
  }

  .slider:before {
    position: absolute;
    content: "${props => props.word || '同步畫面'}";
    display: flex;
    justify-content: center;
    align-items: center;
    color: #05b077;
    border-radius: 16px;
    height: 32px;
    width: 108px;
    left: 1px;
    bottom: 1px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }

  input:checked + .slider {
    background-color: #e26c6c;
    box-shadow: 0 2px 14px 0 #e26c6c;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(14px);
    -ms-transform: translateX(14px);
    transform: translateX(14px);
    color: #e26c6c;
  }
`

// Organisms
export const Header = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 8%; 
  a {
    position: absolute;
    right: 10px;
    top: 10px;
  }
`

export const Footer = styled.div`
  position: absolute;
  display: flex;
  z-index: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  bottom: 0; 
  left: 0;
  background: white;
  width: 100%;
  padding: 20px 0;
  box-shadow: 0 2px 8px 0 rgba(128, 197, 197, 0.5);
`

const wrapperProps = { wrapperAlign: String, wrapperMargin: Number };
export const ButtonWrapper = styled('div', wrapperProps)`
  display: flex;
  justify-content: ${props => props.wrapperAlign || 'flex-start'};
  flex-wrap: wrap;
  width: 100%;
  & > * {
    margin: 5px;
  }
  @media (max-width: 1280px) {
    flex-wrap: wrap;
    justify-content: ${props => props.wrapperAlign || 'flex-start'};
    & > * {
      margin: 5px;
    }
  }
`

export const FormWrapper = styled('div', wrapperProps)`
	display: flex;
	flex-wrap: wrap;
	align-items: ${props => props.wrapperAlign || 'flex-start'};
	> * {
		margin-right: ${props => props.wrapperMargin || 0 }px;
	}
`

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  thead {
    th {
      height: 40px;
      font-size: 14px;
      font-weight: normal;
      background: #e3fafa;
      border-bottom: 1px solid rgba(51, 51, 51, 0.2);
      padding: auto;
      color: #324c5a;
      text-align: center;
    }
    th:not(:last-child) {
      border-right: 1px solid rgba(51, 51, 51, 0.2);
    }
  }
  tr {
    vertical-align: middle;
  }
  tbody {
    td {
      height: 40px;
      border-bottom: 1px solid rgba(51, 51, 51, 0.2);
      padding: auto;
      color: #324c5a;
      p {
      	display: inline-block;
        font-size: 14px;
        margin: 0 auto;
        text-align: left;
      }
    } 
    td:not(:last-child) {
      border-right: 1px solid rgba(51, 51, 51, 0.2);
    }
  }
`

const DropDownProps = { isRelative: Boolean };
export const DropDownMenu = styled('div', DropDownProps)`
	z-index: 2;
	background: white;
	box-shadow: 0 6px 15px 0 rgba(128, 197, 197, 0.72);
	position: ${props => props.isRelative ? "relative" : "absolute" };
	width: 100px;
	border-radius: 12px;
	overflow: hidden;
  text-align: left;
	div {
    cursor: pointer; 
		display: block;
		padding: 10px;
		&:hover {
			background: #fdf8e9;
		}
	}
`

export const DropDownCheckbox = styled.div`
  z-index: 2;
  background: white;
  box-shadow: 0 6px 15px 0 rgba(128, 197, 197, 0.72);
  position: absolute;
  width: 64%;
  padding: 10px 20px;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  span {
    display: flex;
    width: 100%;
    margin: 2px 5px;
  }
  & > * {
    margin: 2px 5px;
  }
`

export const PopUp = styled.div`
  position: absolute;
  background: white; 
  width: 376px; 
  height: 310px;
  box-shadow: 0 6px 20px 0 rgba(128, 197, 197, 0.72);
  padding: 20px 30px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 12px;
  margin-top: 20px;
  & > * {
    margin-top: 10px;
  }
  .popup__button {
    display: flex;
    justify-content: center;
    & > * {
      margin: 10px;
    }
  }
  &::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 10px 10px 10px;
    top: -10px;
    left: 50%;
    border-color: transparent transparent #fff transparent;
  }
`

export const ScrollIn = styled.div`
  width: 60%;
  margin: 0 auto;
  & > * {
    margin: 20px 0;
  }
  .input__button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    & > * {
      margin: 20px 10px;
    }
  }
  p {
    text-align: center;
  }
`

export const Tab = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  & > * {
    margin: 10px;
    padding: 5px 20px; 
    &.active {
      background: #05b077;
      color: white; 
      border-radius: 100px;
    }
  }
`

// Templates
const cardProps = { cardDirection: String };
export const Card = styled('div', cardProps)`
  position: relative;
	display: flex;
	flex-direction: ${props => props.cardDirection || 'row'}
	border-radius: 12px;
	box-shadow: 0 6px 15px 0 rgba(128, 197, 197, 0.72);
	color: ${color.text};
	background: ${color.bg};
	width: 97%;
	margin: 8px 10px;
  @media (max-width: 1280px) {
    flex-direction: column;
  }
`;

const modalProps = { mainHeight: Number, autoHeight: Boolean, scroll: Boolean };
export const Modal = styled('div', modalProps)`
	padding: 20px 0;
	position: fixed;
	left: 50%
	top: 50%;
	transform: translate(-50%, -50%);
	overflow-x: hidden;
	width: 90%;
	border-radius: 8px;
	background: ${color.bg};
	z-index: 10;
	box-shadow: ${props => props.autoHeight ? `
    0 0 0 500px rgba(1,1,1,.3),
    0 0 0 500px rgba(1,1,1,.3)
    ` : `
    0 0 0 1000px rgba(1,1,1,.3),
    0 0 0 1000px rgba(1,1,1,.3)
  `};
	height: ${props => props.autoHeight ? 'auto' : '90%'};
  max-height: 90%;
	& > main {
		width: 100%;
		height: ${props => props.mainHeight || 82}%;
		${props => props.scroll ? 'overflow-y: scroll;' : ''}
  }
`
export const ErrorModal = styled(Modal)`
  height: 50%;
  width: 90%;
  main {
    width: 50%;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    h2 {
      color: #324c5a;
      font-size: 22px;
      font-weight: bold;
      margin-top: 10px;
    }
  }
`


