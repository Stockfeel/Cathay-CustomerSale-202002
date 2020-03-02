<template>
  <Modal autoHeight="true">
    <Header>
      <router-link to='./'>
        <CloseButton/>
      </router-link>
      <Tab>
        <Title textAlign='center' :class="tab == 'suggest' ? 'active': ''" @click="tab = 'suggest'">商品推薦</Title>
        <span>|</span>
        <Title textAlign='center' :class="tab == 'hottest' ? 'active': ''" @click="tab = 'hottest'">熱銷商品</Title>
      </Tab>
    </Header>
    <InsuranceLayout v-if="tab == 'suggest'">
      <InsuranceSection />
      <section>
        <Product 
          :state="tab"
          v-for="(item, idx) in suggest" :key="`product-${idx}`" 
          class="insurance__item">
          <div class="item__name">{{ item.name }}</div>
          <p class="item__link">
            <span>詳細資訊</span>
            <Icon :iconUrl="require('../assets/icon-arrow-dark-down.svg')"/>
          </p>
          <StarIcon v-if="item.word" 
            :iconUrl="require('../assets/star.svg')" 
            :word="item.word" :size="30" 
          />
        </Product>
      </section>
    </InsuranceLayout>
    <InsuranceLayout v-if="tab == 'hottest'">
      <section>
<!--         <Product v-for="(item, idx) in hottest" :key="`product-${idx}`" 
          class="insurance__item"
          :state="tab"
        >
          <div class="item__name">{{ item.name }}</div>
          <p class="item__link">
            <span>詳細資訊</span>
            <Icon :iconUrl="require('../assets/icon-arrow-dark-down.svg')"/>
          </p>
          <StarIcon v-if="item.word" 
            :iconUrl="require('../assets/star.svg')" 
            :word="item.word" :size="30" 
          />
        </Product> -->
      </section>
    </InsuranceLayout>
    <ButtonWrapper>
      <Button>官網更多商品</Button>
    </ButtonWrapper>
  </Modal>
</template>

<script>
import {
  Modal, 
  Title, 
  CloseButton,
  Header, 
  Button,
  ButtonWrapper,
  Icon,
  StarIcon,
  Tab
} from "../style";
import InsuranceSection from "./insuranceSection";
import styled from 'vue-styled-components';

const productProps = { state: String } 
const Product = styled('div', productProps)`
  position: relative;
  background: ${props => props.state == "suggest" ? "#e26c6c" : "#07c5c8"};
  color: white;
  width: 165px; 
  height: 150px;
  padding: 20px 20px 0 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px 0 rgba(226, 108, 108, 0.3);
  .item__name {
    font-weight: bold;
  }
  .item__link {
    background: white;
    color: #324c5a;
    position: absolute;
    width: 100%; 
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 0;
    left: 0;
    margin: 0;
    border-radius: 0px 0px 10px 10px;
  } 
`

const InsuranceLayout = styled.main`
  section {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 20px;
  }
`

export default {
  name: 'Insurance',
  components: {
    Modal,
    Title,
    CloseButton,
    Header,
    InsuranceSection,
    InsuranceLayout,
    Button,
    ButtonWrapper,
    Icon,
    StarIcon,
    Tab,
    Product
  },
  methods: {

  },
  data() {
    return {
      tab: "suggest",
      suggest: [
      {
        name: "國泰人壽新留學御守傷害保險(IG3)", 
        id: 0,
        word: "1",
      }, {
        name: "國泰人壽新留學御守傷害保險(IG3)", 
        id: 1,
      }, {
        name: "國泰人壽新留學御守傷害保險(IG3)", 
        id: 2,
      }]
    }
  },
  mounted: function(){
  }
}
</script>
