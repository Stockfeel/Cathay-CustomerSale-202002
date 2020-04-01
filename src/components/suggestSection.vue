<template>
  <Card cardDirection="column">
    <ProductLayout>
      <section>
        <div class="product__type">
          <Title>服務建議</Title>
          <SuggestButton v-for="(item, idx) in serviceTable" :key="`service-${idx}`" :state="item.state">
            <router-link :to="`./suggest?id=${item.id}`"> {{ item.title }} </router-link>
          </SuggestButton>
        </div>
        <div class="product__type">
          <Title>商機推薦</Title>
          <SuggestButton v-for="(item, idx) in productTable" :key="`product-${idx}`" :state="item.state">
            <router-link :to="`./suggest?id=${item.id}`"> {{ item.title }} </router-link>
          </SuggestButton>
        </div>
      </section>
      <MoreButton align="center" @click="showMore">
        <p>{{ menuState ? "收合選項" : "看更多選項" }}</p>
        <Icon v-if="menuState" :iconUrl="require('../assets/button_more.svg')" :size="20" :rotate="-90" />
        <Icon v-if="!menuState" :iconUrl="require('../assets/button_more.svg')" :size="20" :rotate="90" />
      </MoreButton>
    </ProductLayout>
    <InsuranceLayout>
      <div>
        <Title id="insurance__tooltip">保障缺口</Title>
        <b-tooltip target="insurance__tooltip" custom-class="custom__tooltip" triggers="hover" placement="top">
          公司現在有提供保單缺口檢視服務（投放保障缺口）您看一下畫面中紅色的部分是你和同年齡層保戶保障比較不足的地方，需要我進一步說名或請專人到府解釋嗎？
        </b-tooltip>
        <ButtonWrapper>
          <SwitchButton :word="isSync == 'on' ? '同步中 ●' : '同步畫面'">
            <input type="checkbox" v-model="isSync" value="on"/>
            <span class="slider"></span>
          </SwitchButton>    
          <DropDown 
            text="配對顧問"
            :list="[{
              text: '原顧問',
              slug: 'introduce?type=current&cat=consult'
            }, {
              text: '新顧問',
              slug: 'introduce?type=new&cat=consult'
            }]" />
          <DropDown 
            text="諮詢客服"
            :list="[{
              text: '客服顧問',
              slug: 'introduce?type=new&cat=service'
            }, {
              text: '本次客服',
              slug: 'introduce?type=current&cat=service'
            }]" />
        </ButtonWrapper>
      </div>
      <InsuranceSection :insurances="insurances" :class="`${isSync == 'on' ? 'active' : ''}`" />
      <div class="suggest__notime">
        全部沒時間
        <div>-</div>
      </div>
    </InsuranceLayout>
  </Card>
</template>
 
<script>
import { 
  Card, 
  Title, 
  SuggestButton, 
  MoreButton, 
  Icon,
  SwitchButton, 
  ButtonWrapper
} from '../style.js';
import InsuranceSection from './insuranceSection.vue';
import DropDown from './ui/dropdown.vue';
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
    border-radius: 12px;
    padding: 5px;
    &.active {
      box-shadow: 0 0 0 5px #ffcbcb, 0 0 0 10px #feecec;
    }
  }
  .suggest__notime {
    position: absolute; 
    margin-top: 15px;
    left: 50%; 
    transform: translateX(-50%);
    color: white;
    background: #616161;
    border-radius: 20px;
    font-size: 16px; 
    padding: 2px 10px;
    div {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 10px;
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
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
      isSync: [],
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
