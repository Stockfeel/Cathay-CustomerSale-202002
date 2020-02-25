<template>
  <Card cardDirection="column">
    <ProductLayout>
      <section>
        <div class="product__type">
          <Title>服務建議</Title>
          <SuggestButton v-for="(item, idx) in serviceTable" :key="`service-${idx}`">
            <router-link :to="`./suggest/${item.id}`"> {{ item.title }} </router-link>
          </SuggestButton>
        </div>
        <div class="product__type">
          <Title>商機推薦</Title>
          <SuggestButton v-for="(item, idx) in productTable" :key="`product-${idx}`"> {{ item.title }} </SuggestButton>
        </div>
      </section>
      <MoreButton align="center" @click="showMore">
        <p>看更多選項</p>
        <Icon :iconUrl="require('../assets/button_more.svg')" :size="20" :rotate="90" />
      </MoreButton>
    </ProductLayout>
    <InsuranceLayout>
      <div class="insurance__button">
        <Title>保障缺口</Title>
        <DropDownButton>同步畫面</DropDownButton>
        <DropDownButton>配對顧問</DropDownButton>
        <DropDownButton>諮詢客服</DropDownButton>
      </div>
      <InsuranceSection />
    </InsuranceLayout>
  </Card>
</template>

<script>
import { Card, Title, SuggestButton, DropDownButton, MoreButton, Icon } from '../style.js';
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
    Icon
  },
  methods: {
    showMore() {
      this.serviceTable = this.menuState ? this.service.slice(0, 2) : this.service;
      this.productTable = this.menuState ? this.product.slice(0, 2) : this.product;
      this.menuState = !this.menuState;
    }
  },
  data() {
    return {
      menuState: false,
      serviceTable: [],
      productTable: [],
      service: [
        {
          id: 1,
          title: '申辦網路服務',
          state: 1,
        },
        {
          id: 2,
          title: '申辦電子單據',
          state: 2,
        },
        {
          id: 3,
          title: '申辦網路服務',
          state: 3,
        },
        {
          id: 4,
          title: '申辦網路服務',
          state: 1,
        },
        {
          id: 5,
          title: '申辦電子單據',
          state: 2,
        },
        {
          id: 6,
          title: '申辦電子單據',
          state: 3,
        }
      ],
      product: [
        {
          id: 1,
          title: '意外附約升級',
          state: 1,
        },
        {
          id: 2,
          title: '意外附約目標客戶',
          state: 2,
        },
        {
          id: 3,
          title: '意外附約升級',
          state: 3,
        },
        {
          id: 4,
          title: '意外附約目標客戶',
          state: 2,
        },
        {
          id: 5,
          title: '意外附約目標客戶',
          state: 1,
        },
        {
          id: 6,
          title: '意外附約升級',
          state: 1,
        }
      ]
    }
  },
  mounted: function(){
    this.serviceTable = this.service.slice(0, 2);
    this.productTable = this.product.slice(0, 2);
  }
}
</script>
