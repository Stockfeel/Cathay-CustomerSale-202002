<template>
  <CheckLayout>
    <CheckTable>
      <tr>
        <th>轉介者</th>
        <td class="check__item">{{ check.place }} {{ check.current }}</td>
      </tr>
      <tr>
        <th>預約顧問</th>
        <td>
          <span class="check__item" v-for="(consult, idx) in check.consults" :key="`consult-${idx}`">
            {{ consult }} <span v-if="idx !== check.consults.length - 1"> / </span>
          </span>
        </td>
      </tr>
      <tr>
        <th>預約者</th>
        <td>
          <p class="check__item" v-if="!check.name.edit">
            {{ check.name.text }}
          </p>
        </td>
      </tr>
      <tr>
        <th>Email</th>
        <td>
          <p class="check__item" v-if="!check.email.edit">
            {{ check.email.text }}
          </p>
        </td>
      </tr>
      <tr>
        <th>聯絡電話</th>
        <td>
          <p class="check__item" v-if="!check.mobile.edit">
            {{ check.mobile.text }}
          </p>
        </td>
      </tr>
      <tr>
        <th>
          <p>方便時間</p>
        </th>
        <td>
          <CheckFormWrapper>
            <FormInput inputBasis="50%" v-for="(time, idx) in formTime" :key="`time-${idx}`">
              <input type="radio" :id="`time-${idx}`" />
              <label :for="`time-${idx}`">{{ time }}</label>
            </FormInput>
          </CheckFormWrapper>
        </td>
      </tr>
      <tr>
        <td colspan="3">
          <FormInput>
            <input type="checkbox"/>
            <label>我同意 XXXXXXXXXX</label>
          </FormInput>
        </td>
      </tr>
    </CheckTable>
  </CheckLayout>
</template>

<script>
import { 
  Table,
  FormInput,
  FormWrapper,
} from '../style.js';
import styled from 'vue-styled-components';

const CheckFormWrapper = styled(FormWrapper)`
  & > * {
    margin: 2px 0;
  }
`

const CheckTable = styled(Table)`
  td, th {
    height: 50px;
    vertical-align: top;
    padding: 5px;
  }
  .check__item {
    font-weight: bold;
  }
  th {
    width: 120px;
  }
  .input__buttons {
    display: flex;
    align-items: center;
    margin: 12px 0;
    justify-content: space-between;
    width: 50%;
  }
`
const CheckLayout = styled.div`
  margin: 20px;
  padding: 20px;
  background: rgba(227, 250, 250, 0.5);
`

export default {
  name: 'IntroduceCheckOver',
  components: {
    CheckTable,
    FormInput,
    CheckLayout,
    CheckFormWrapper
  },
  methods: {

  },
  data() {
    return {
      formTime: ['09:00-12:00','12:00-15:00', '15:00-18:00', '18:00-21:00', '皆可'],
      formDate: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
      check: {
        place: '北部服務部仁愛中心（二）',
        current: '陳人壽',
        consults: ['陳世華', '周 XX', '黃 XX'],
        name: {
          text: '陳人壽',
          edit: false
        },
        email: {
          text: 'linguotai@gmail.com',
          edit: false
        },
        mobile: {
          text: '0910000000',
          edit: false
        },
        date: [],
        time: [],
        agree: false
      }
    }
  },
  mounted: function(){
  }
}
</script>
