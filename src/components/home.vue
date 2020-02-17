<template>
  <HomeLayout>
    <Info />
    <Info />
  </HomeLayout>
</template>

<script>
import Info from './info.vue';
import styled from 'vue-styled-components';

const HomeLayout = styled.div`
  background: #d2f8f3;
  height: 100%;
  width: 100%;
  border: solid 1px #000;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
`

export default {
  name: 'Home',
  props: {
    msg: String
  },
  components: {
    Info,
    HomeLayout
  }
}
</script>
