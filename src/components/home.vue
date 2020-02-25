<template>
  <HomeLayout>
    <ProfileSection />
    <MarketSection />
    <SuggestSection />
  </HomeLayout>
</template>

<script>
import ProfileSection from './profileSection.vue';
import MarketSection from './marketSection.vue';
import SuggestSection from './suggestSection.vue';
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
  components: {
    ProfileSection,
    MarketSection,
    SuggestSection,
    HomeLayout
  }
}
</script>
