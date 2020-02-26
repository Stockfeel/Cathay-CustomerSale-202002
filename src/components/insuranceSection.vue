<template>
  <section>
    <Insurance v-for="(insurance, idx) in insurances" 
      :key="`insurance-${idx}`" 
      :average="insurance.average" 
      :difference="insurance.average - insurance.value">
      <div class='insurance__title'><Icon :iconUrl="require(`../assets/${insurance.average - insurance.value > 0 ? 'icon-notice' : 'icon-accept'}.svg`)" />{{ insurance.text }}</div>
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
</template>

<script>
import { Icon } from '../style.js';
import styled from 'vue-styled-components';

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
  name: 'InsuranceSection',
  components: {
    Insurance,
    Icon
  },
  props: {
    insurances: Array
  }
}
</script>
