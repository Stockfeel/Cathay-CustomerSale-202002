<template>
  <Card cardDirection="column">
    <ProductLayout>
      <section>
        <div class="product__type">
          <Title>服務建議</Title>
          <SuggestButton v-for="(item, idx) in serviceTable" :key="`service-${idx}`" :state="item.state">
            <router-link :to="`./suggest/${item.id}`"> {{ item.title }} </router-link>
          </SuggestButton>
        </div>
        <div class="product__type">
          <Title>商機推薦</Title>
          <SuggestButton v-for="(item, idx) in productTable" :key="`product-${idx}`" :state="item.state"> 
            <router-link :to="`./suggest/${item.id}`"> {{ item.title }} </router-link>
          </SuggestButton>
        </div>
      </section>
      <MoreButton align="center" @click="showMore">
        <p>看更多選項</p>
        <Icon :iconUrl="require('../assets/button_more.svg')" :size="20" :rotate="90" />
      </MoreButton>
    </ProductLayout>
    <InsuranceLayout>
      <div>
        <Title>保障缺口</Title>
        <ButtonWrapper>
          <SwitchButton word="同步中 ●">
            <input type="checkbox"/>
            <span class="slider"></span>
          </SwitchButton>        
          <div>
            <DropDownButton @click="isConOpen = !isConOpen">
              <span>配對顧問</span>
              <Icon v-if="!isConOpen" :iconUrl="require('../assets/icon-arrow-white-down.svg')" />
              <Icon v-if="isConOpen" :iconUrl="require('../assets/icon-arrow-white-up.svg')" />
            </DropDownButton>
            <DropDown v-if="isConOpen">
              <a>原顧問</a>
              <a>新顧問</a>
            </DropDown>
          </div>
          <div>
            <DropDownButton @click="isCusOpen = !isCusOpen">
              <span>諮詢客服</span>
              <Icon v-if="!isCusOpen" :iconUrl="require('../assets/icon-arrow-white-down.svg')" />
              <Icon v-if="isCusOpen" :iconUrl="require('../assets/icon-arrow-white-up.svg')" />
            </DropDownButton>
            <DropDown v-if="isCusOpen">
              <a>客服顧問</a>
              <a>本次客服</a>
            </DropDown>
          </div>
        </ButtonWrapper>
      </div>
      <InsuranceSection :insurances="insurances" />
    </InsuranceLayout>
  </Card>
</template>

<script>
import { 
  Card, 
  Title, 
  SuggestButton, 
  DropDownButton,
  MoreButton, 
  Icon,
  SwitchButton, 
  ButtonWrapper, 
  DropDown } from '../style.js';
import InsuranceSection from './insuranceSection.vue';
import styled from 'vue-styled-components';

const ProductLayout = styled.section`
  padding: 10px 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 6px 15px 0 rgba(128, 197, 197, 0.72);
  overflow: scroll;
  a {
    color: white;
    &:hover {
      color: white;
      text-decoration: none;
    } 
  }
  section {
    display: flex;
    justify-content: space-between;
  }
  .product__type {
    display: flex; 
    flex-direction: column;
  }
`

const InsuranceLayout = styled.section`
  padding: 30px;
  & > div {
    display: flex;
    align-items: center;
    & > div {
      margin-left: 25px;
    }
  }
  section {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin-top: 20px;
  }
`

export default {
  name: 'SuggestSection',
  components: {
    Card,
    Title,
    ProductLayout,
    SuggestButton,
    InsuranceLayout,
    DropDownButton,
    InsuranceSection,
    MoreButton,
    Icon,
    SwitchButton,
    ButtonWrapper,
    DropDown
  },
  methods: {
    showMore() {
      this.serviceTable = this.menuState ? this.service.slice(0, 2) : this.service;
      this.productTable = this.menuState ? this.product.slice(0, 2) : this.product;
      this.menuState = !this.menuState;
    }
  },
  props: {
    service: Array,
    product: Array,
    insurances: Array
  },
  data() {
    return {
      isConOpen: false,
      isCusOpen: false,
      menuState: false,
      serviceTable: [],
      productTable: [],
    }
  },
  mounted: function(){
    this.serviceTable = this.service.slice(0, 2);
    this.productTable = this.product.slice(0, 2);
  }
}
</script>
