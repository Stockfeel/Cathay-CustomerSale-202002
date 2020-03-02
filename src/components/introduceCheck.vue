<template>
  <CheckLayout>
    <CheckTable>
    <tr>
      <th>轉介者</th>
      <td>{{ check.place }} {{ check.current }}</td>
    </tr>
    <tr>
      <th>預約顧問</th>
      <td>
        <span v-for="(consult, idx) in check.consults" :key="`consult-${idx}`">
          {{ consult }} <span v-if="idx !== check.consults.length - 1"> / </span>
        </span>
      </td>
    </tr>
    <tr>
      <th>預約者</th>
      <td>
        <p v-if="!check.name.edit">
          {{ check.name.text }}
          <Icon 
            :iconUrl="require('../assets/icon-edit-edit-green.svg')" 
            :size='20'
            @click="check.name.edit = !check.name.edit;"
          />
        </p>
        <FormInput class="input__text" v-if="check.name.edit" size="450">
          <input type="text" v-model="check.name.text" />
        </FormInput>
        <div class="input__buttons" v-if="check.name.edit">
          <SendButton @click="check.name.edit = !check.name.edit;">儲存修改</SendButton>
          <span @click="check.name.edit = !check.name.edit;">取消</span>
        </div>
      </td>
    </tr>
    <tr>
      <th>Email</th>
      <td>
        <p v-if="!check.email.edit">
          {{ check.email.text }}
          <Icon 
            :iconUrl="require('../assets/icon-edit-edit-green.svg')" 
            :size='20'
            @click="check.email.edit = !check.email.edit;"
          />
        </p>
        <FormInput class="input__text" v-if="check.email.edit" size="450">
          <input type="text" v-model="check.email.text" />
        </FormInput>
        <div class="input__buttons" v-if="check.email.edit">
          <SendButton @click="check.email.edit = !check.email.edit;">儲存修改</SendButton>
          <span @click="check.email.edit = !check.email.edit;">取消</span>
        </div>
      </td>
    </tr>
    <tr>
      <th>聯絡電話</th>
      <td>
        <p v-if="!check.mobile.edit">
          {{ check.mobile.text }}
          <Icon 
            :iconUrl="require('../assets/icon-edit-edit-green.svg')" 
            :size='20'
            @click="check.mobile.edit = !check.mobile.edit;"
          />
        </p>
        <FormInput class="input__text" v-if="check.mobile.edit" size="450">
          <input type="text" v-model="check.mobile.text" />
        </FormInput>
        <div class="input__buttons" v-if="check.mobile.edit">
          <SendButton @click="check.mobile.edit = !check.mobile.edit;">儲存修改</SendButton>
          <span @click="check.mobile.edit = !check.mobile.edit;">取消</span>
        </div>
      </td>
    </tr>
    <tr rowspan="2">
      <th>方便時間</th>
      <td>
        <FormWrapper>
          <FormInput inputBasis="25%" v-for="(date, idx) in formDate" :key="`date-${idx}`">
            <input type="checkbox" :id="`date-${idx}`"/>
            <label :for="`date-${idx}`">{{ date }}</label>
          </FormInput>
        </FormWrapper>
        <hr />
      </td>
    </tr>
    <tr>
      <th><!-- rowspan --></th>
      <td>
        <FormWrapper>
          <FormInput inputBasis="50%" v-for="(time, idx) in formTime" :key="`time-${idx}`">
            <input type="checkbox" :id="`time-${idx}`" />
            <label :for="`time-${idx}`">{{ time }}</label>
          </FormInput>
        </FormWrapper>
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
  Icon,
  SendButton
} from '../style.js';
import styled from 'vue-styled-components';

const CheckTable = styled(Table)`
  td, th {
    height: 50px;
    vertical-align: top;
    padding: 5px;
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
  name: 'IntroduceCheck',
  components: {
    CheckTable,
    FormInput,
    FormWrapper,
    CheckLayout,
    Icon,
    SendButton
  },
  methods: {

  },
  data() {
    return {
      formTime: ['09:00-12:00','12:00-15:00', '15:00-18:00', '18:00-21:00'],
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
