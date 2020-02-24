<template>
  <Card cardDirection="column">
    <SuggestSection>
      <div>
        <Title>服務建議</Title>
        <SuggestButton v-for="(item, idx) in Object.keys(service)" :key="`service-${idx}`">
          <router-link :to="`./product/${item}`"> {{ service[item].title }} </router-link>
        </SuggestButton>
      </div>
      <div>
        <Title>商機推薦</Title>
        <SuggestButton v-for="(item, idx) in product" :key="`product-${idx}`"> {{ item.title }} </SuggestButton>
      </div>
    </SuggestSection>
    <InsuranceSection>
      <div class='insurance__button'>
        <Title>保障缺口</Title>
        <DropDownButton>同步畫面</DropDownButton>
        <DropDownButton>配對顧問</DropDownButton>
        <DropDownButton>諮詢客服</DropDownButton>
      </div>
      <section>
        <Insurance v-for="(insurance, idx) in insurances" 
          :key="`insurance-${idx}`" 
          :average="insurance.average" 
          :difference="insurance.average - insurance.value">
          <div class='insurance__title'><Icon />{{ insurance.text }}</div>
          <div class='insurance__bar'>
            <div class='bar__img'></div>
            <div class='bar__side'>
              <span>{{ `
                ${insurance.value >= 10000 ? Math.floor(insurance.value / 10000)+'萬' : ''} 
                ${insurance.value % 10000 ? insurance.value % 10000 + '元' : ''}`  }}
              </span>
              <span>{{ `
                ${insurance.average >= 10000 ? Math.floor(insurance.average / 10000)+'萬'  : ''} 
                ${insurance.average % 10000 ? insurance.average % 10000 + '元' : ''}`  }}
              </span>
            </div>
          </div>
        </Insurance>
      </section>
    </InsuranceSection>
  </Card>
</template>

<script>
import { Card, Title, SuggestButton, DropDownButton, Icon } from '../style.js';
import styled from 'vue-styled-components';

const SuggestSection = styled.section`
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 6px 15px 0 rgba(128, 197, 197, 0.72);
  & > div {
    display: flex;
    flex-direction: column;
  }
`

const InsuranceSection = styled.section`
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

const InsuranceProps = {
  difference: Number,
  average: Number
}
const Insurance = styled('div', InsuranceProps)`
  display: flex;
  justify-content: space-around;
  width: 50%;
  height: 60px;
  cursor: pointer;
  border-radius: 12px;
  &:hover {
    box-shadow: 0 4px 15px 0 rgba(221, 123, 123, 0.7);
  }
  & * {
    display: inline-block;
  }
  .insurance__title {
    color: ${props => props.difference < 0 ? '#93d1d1' : '#dd7b7b'}
  }
  .insurance__bar {
    width: 60%;
    .bar__img {
      position: relative;
      background: ${props => props.difference < 0 ? '#93d1d1' : '#f1f1f1'};
      border-radius: 5px;
      width: 100%;
      height: 10px;
      &:after {
        content: '';
        position: absolute; 
        left: 0;
        top: 0;
        border-radius: 5px;
        height: 10px;
        background: ${props => props.difference < 0 ? '#93d1d1' : '#dd7b7b'};
        width: ${props => props.difference / props.average * 100}%;
      }
    }
    .bar__side {
      width: 100%;
      display: flex;
      justify-content: space-between;
      & > *:first-child {
        color: ${props => props.difference < 0 ? '#93d1d1' : '#dd7b7b'};
      }
    }
  }
  
`

export default {
  name: 'Suggestions',
  components: {
    Card,
    Title,
    SuggestSection,
    SuggestButton,
    InsuranceSection,
    DropDownButton,
    Insurance,
    Icon
  },
  data() {
    return {
      service: {
        1: {
          id: 1,
          title: '申辦網路服務',
          state: 1,
        },
        2: {
          id: 2,
          title: '申辦電子單據',
          state: 2,
        },
        3: {
          id: 3,
          title: '申辦網路服務',
          state: 3,
        },
        4: {
          id: 4,
          title: '申辦網路服務',
          state: 1,
        },
        5: {
          id: 5,
          title: '申辦電子單據',
          state: 2,
        },
        6: {
          id: 6,
          title: '申辦電子單據',
          state: 3,
        }
      },
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
      ],
      insurances: [
        {
          text: '照護給付',
          value: 10000,
          average: 30000
        },
        {
          text: '重疾給付',
          value: 3444,
          average: 30000
        },
        {
          text: '癌症醫療',
          value: 12345789,
          average: 30000
        },
        {
          text: '實支實付',
          value: 40000,
          average: 30000
        },
        {
          text: '手術醫療',
          value: 10000,
          average: 5324
        },
        {
          text: '疾病醫療',
          value: 10000,
          average: 30000
        },
        {
          text: '意外醫療',
          value: 10000,
          average: 30000
        },
        {
          text: '生存給付',
          value: 10000,
          average: 30000
        },
        {
          text: '身故給付',
          value: 10000,
          average: 30000
        },
        {
          text: '傷殘給付',
          value: 10000,
          average: 30000
        }
      ]
    }
  }
}
</script>
