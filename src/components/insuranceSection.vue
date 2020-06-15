<template>
  <InsuranceLayout v-if="insurances.length > 0">
    <Insurance v-for="(insurance, idx) in insurances" 
      data-cy="insurance"
      :key="`insurance-${idx}`" 
      :average="insurance.average" 
      :difference="insurance.average - insurance.value"
      @click="$router.push(`./insurance?cat=${insurance.text}`)" 
    >
      <div class='insurance__title'><Icon :iconUrl="require(`../assets/${insurance.average - insurance.value > 0 ? 'icon-notice' : 'icon-accept'}.svg`)" :size="15" />{{ insurance.text }}</div>
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
    <span>註：深色數字為相較於保戶平均值</span>
  </InsuranceLayout>
  <InsuranceLayout v-else>
    <div class="nodata">
      <img src="../assets/img-nodata.svg" />
      <div>無法查詢保障缺口</div>
    </div>
  </InsuranceLayout>
</template>

<script>
import { Icon } from '../style.js';
import styled from 'vue-styled-components';

const InsuranceLayout = styled.section`
  & > span {
    color: #628ea7;
    font-size: 14px;
    text-align: right;
    width: 100%;
  } 
  @media (max-width: 1280px) {
    flex-direction: column;
  }
  .nodata {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 50px;
    margin: 0 auto;
    img {
      width: 100px;
      height: 100px;
      margin-bottom: 20px;
      margin-left: 20px;
    }
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
  height: 70px;
  cursor: pointer;
  border-radius: 12px;
  padding: 5px 10px;
  @media (max-width: 1280px) {
    width: 100%;
  }
  &.active {
    box-shadow: 0 0 0 3px #ffcbcb, 0 0 0 4px #feecec;
  }
  &:hover {
    box-shadow: 0 4px 15px 0 ${props => props.difference < 0 ? '#93d1d1' : '#dd7b7b'};
  }
  & * {
    display: inline-block;
  }
  .insurance__title {
    margin-left: -10px;
    color: ${props => props.difference < 0 ? '#93d1d1' : '#dd7b7b'}
    & > *:first-child {
      margin-right: 10px;
    }
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
      flex-wrap: wrap;
      justify-content: space-between;
      & > *:first-child {
        color: ${props => props.difference < 0 ? '#93d1d1' : '#dd7b7b'};
      }
    }
  }
  
`

export default {
  name: 'InsuranceSection',
  components: {
    Insurance,
    Icon,
    InsuranceLayout
  },
  data() {
    return {
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
