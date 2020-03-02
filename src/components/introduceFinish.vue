<template>
  <Modal :autoHeight="true">
		<FinshLayout>
			<img :src="require('../assets/icon-accept.svg')" />
			<h2>成功送出</h2>
			<router-link to="../"><Button>請通知客服已完成</Button></router-link>
		</FinshLayout>
  </Modal>
</template>

<script>
import { Modal, Button } from "../style";
import styled from 'vue-styled-components';

const FinshLayout = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	h2 {
	  font-size: 22px;
	  font-weight: bold;
	  letter-spacing: 0.5px;
	  color: #324c5a;
	}
	& > * {
		margin: 20px;
	}
`

export default {
  name: 'IntroduceFinish',
  components: {
		Modal,
		FinshLayout,
		Button
  }
}
</script>
