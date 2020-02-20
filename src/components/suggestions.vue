<template>
  <Card cardDirection="column">
    <SuggestSection>
      <div>
        <Title>服務建議</Title>
        <SuggestButton>申辦網路服務</SuggestButton>
        <SuggestButton>申辦電子單據</SuggestButton>
      </div>
      <div>
        <Title>商機推薦</Title>
        <SuggestButton>意外附約升級</SuggestButton>
        <SuggestButton>意外附約目標客戶</SuggestButton>
      </div>
    </SuggestSection>
    <InsuranceSection>
      <div>
        <Title>保障缺口</Title>
        <DropDown>同步畫面</DropDown>
        <DropDown>配對顧問</DropDown>
        <DropDown>諮詢客服</DropDown>
      </div>
      <section>
        <Insurance v-for="(insurance, idx) in insurances" :key="`insurance-${idx}`">
          <div>{{ insurance.text }}</div>
          <div class='insurance__bar'>
            <div>bar</div>
            <div>
              <span>{{ insurance.value }}</span>
              <span>{{ insurance.average }}</span>
            </div>
          </div>
        </Insurance>
      </section>
    </InsuranceSection>
  </Card>
</template>

<script>
import { Card, Title, SuggestButton, DropDown } from '../style.js';
import styled from 'vue-styled-components';

const SuggestSection = styled.section`
  padding: 20px;
  display: flex;
  justify-content: space-around;
  box-shadow: 0 6px 15px 0 rgba(128, 197, 197, 0.72);
  & > div {
    display: flex;
    flex-direction: column;
  }
`

const InsuranceSection = styled.section`
  padding: 20px;
  & > div {
    display: flex;
    align-items: center;
    margin-left: 40px;
    & > div {
      margin-left: 10px;
    }
  }
  section {
    disply: flex;
    flex-wrap: wrap;
  }
`

const Insurance = styled.div`
  display: inline-block;
  width: 50%;
  .insurance__bar {
    display: flex;
    flex-direction: column;
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
    DropDown,
    Insurance
  },
  data() {
    return {
      insurances: [
        {
          text: '照護給付',
          value: '10000',
          average: '30000'
        },
        {
          text: '重疾給付',
          value: '10000',
          average: '30000'
        },
        {
          text: '癌症醫療',
          value: '10000',
          average: '30000'
        },
        {
          text: '實支實付',
          value: '10000',
          average: '30000'
        },
        {
          text: '手術醫療',
          value: '10000',
          average: '30000'
        },
        {
          text: '疾病醫療',
          value: '10000',
          average: '30000'
        },
        {
          text: '意外醫療',
          value: '10000',
          average: '30000'
        },
        {
          text: '生存給付',
          value: '10000',
          average: '30000'
        },
        {
          text: '身故給付',
          value: '10000',
          average: '30000'
        },
        {
          text: '傷殘給付',
          value: '10000',
          average: '30000'
        }
      ]
    }
  }
}
</script>
