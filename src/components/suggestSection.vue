<template>
  <Card cardDirection="column">
    <ProductLayout>
      <section>
        <div class="product__type">
          <Title>服務建議</Title>
          <SuggestButton v-for="(item, idx) in serviceTable" :key="`service-${idx}`" :state="item.state">
            <router-link :to="`./suggest?id=${item.id}`"> {{ item.title }} </router-link>
          </SuggestButton>
          <div v-if="serviceTable.length === 0" class="nodata">
            <img src="../assets/img-empty.svg" />
            <div>查無資料</div>
          </div>
        </div>
        <div class="product__type">
          <Title>商機推薦</Title>
          <SuggestButton v-for="(item, idx) in productTable" :key="`product-${idx}`" :state="item.state">
            <router-link data-cy="suggest" :to="`./suggest?id=${item.id}`"> {{ item.title }} </router-link>
          </SuggestButton>
          <div v-if="productTable.length === 0" class="nodata">
            <img src="../assets/img-empty.svg" />
            <div>查無資料</div>
          </div>
        </div>
      </section>
      <MoreButton align="center" @click="showMore">
        <p>{{ menuState ? "收合選項" : "看更多選項" }}</p>
        <Icon v-if="menuState" :iconUrl="require('../assets/button_more.svg')" :size="20" :rotate="-90" />
        <Icon v-if="!menuState" :iconUrl="require('../assets/button_more.svg')" :size="20" :rotate="90" />
      </MoreButton>
      <div class="suggest__notime">
        全部沒時間
        <div>-</div>
      </div>
    </ProductLayout>
    <InsuranceLayout>
      <div>
        <Title id="insurance__tooltip">保障缺口</Title>
        <b-tooltip target="insurance__tooltip" custom-class="custom__tooltip" triggers="hover" placement="top">
          公司現在有提供保單缺口檢視服務（投放保障缺口）您看一下畫面中紅色的部分是你和同年齡層保戶保障比較不足的地方，需要我進一步說名或請專人到府解釋嗎？
        </b-tooltip>
        <ButtonWrapper wrapperAlign="center">
          <SwitchButton :word="isSync == 'on' ? '同步中 ●' : '同步畫面'">
            <input type="checkbox" v-model="isSync" value="on"/>
            <span class="slider"></span>
          </SwitchButton>
          <Button bgColor="#05b077" @click="goToIntroduce">轉介</Button>    
          <div class="suggest__notrans">
            <span>拒絕轉介</span>
            <div>X</div>
          </div>
        </ButtonWrapper>
      </div>
      <div class="suggest__notime">
        全部沒時間
        <div>-</div>
      </div>
      <InsuranceSection :insurances="insurances" :class="`${isSync == 'on' ? 'active' : ''}`" />
    </InsuranceLayout>
  </Card>
</template>

<script>
import { 
  Card, 
  Title, 
  SuggestButton, 
  MoreButton, 
  Button,
  Icon,
  SwitchButton, 
  ButtonWrapper
} from '../style.js';
import InsuranceSection from './insuranceSection.vue';
import styled from 'vue-styled-components';

const ProductLayout = styled.section`
  padding: 10px 20px;
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
    @media (max-width: 1280px) {
      flex-direction: column;
    }
  }
  .product__type {
    display: flex; 
    flex-direction: column;
  }
  .nodata {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    img {
      width: 100px;
      height: 100px;
      margin-bottom: 20px;
      margin-right: 20px;
    }
  }
  .suggest__notime {
    cursor: pointer;
    position: absolute; 
    top: -5px;
    right: -5px; 
    color: white;
    background: #f5bd32;
    border-radius: 20px;
    font-size: 16px; 
    padding: 5px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    div {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 10px;
      width: 20px;
      height: 20px;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 10px;
    }
  }
`

const InsuranceLayout = styled.section`
  position: relative;
  padding: 30px 20px;
  & > div {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    & > div {
      margin-top: 10px;
    }
    @media (max-width: 1280px) {
      flex-direction: column;
      align-items: flex-start;
      & > div {
        margin-left: 0;
      }
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
  .suggest__notrans {
    color: white;
    background: #616161;
    border-radius: 20px;
    font-size: 14px; 
    width: 110px;
    height: 38px;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 10px;
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 5px;
    }
  }
  .suggest__notime {
    cursor: pointer;
    position: absolute; 
    top: -5px;
    right: -5px; 
    color: white;
    background: #f5bd32;
    border-radius: 20px;
    font-size: 16px; 
    padding: 5px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    div {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 10px;
      width: 20px;
      height: 20px;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 10px;
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
    Button
  },
  methods: {
    showMore() {
      this.serviceTable = this.menuState ? this.service.slice(0, 2) : this.service;
      this.productTable = this.menuState ? this.product.slice(0, 2) : this.product;
      this.menuState = !this.menuState;
    },
    goToIntroduce() {
      this.$router.push('/introduce');
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
