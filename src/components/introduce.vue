<template>
  <Modal :autoHeight="true">
    <Header>
      <router-link to='./'>
        <CloseButton/>
      </router-link>
      <Title textAlign='center'>{{ step === 0 ? stepTitle[step][$route.query.cat][$route.query.type] : stepTitle[step] }}</Title>
    </Header>
    <IntroduceLayout v-if="step == 0">
      <section v-if="$route.query.type == 'new'">
        <div>
          <p>
            <span>台北市</span> 
            <Icon v-if="!isMenuOpen" 
              @click="isMenuOpen = !isMenuOpen"
              :iconUrl="require('../assets/icon-arrow-dark-down.svg')" 
              :size="15"></Icon>
            <Icon v-if="isMenuOpen" 
              @click="isMenuOpen = !isMenuOpen"
              :iconUrl="require('../assets/icon-arrow-dark-up.svg')" 
              :size="15"></Icon>
          </p>
          <DropDownMenu v-if="isMenuOpen">
            <div>台北市</div>
            <div>新北市</div>
            <div>基隆市</div>
            <div>桃園縣</div>
          </DropDownMenu>
        </div>
        <div>
          <p>
            <span>松山區</span> 
            <Icon :iconUrl="require('../assets/icon-location.svg')" 
            :size="20" @click="isListOpen = !isListOpen"></Icon>
          </p>
          <DropDownCheckbox v-if="isListOpen">
            <span>台北市</span>
            <span>
              <FormInput>
                <input type='checkbox' />
                <label>全選</label> 
              </FormInput> 
            </span>
            <FormInput>
              <input type='checkbox' />
              <label>松山區</label> 
            </FormInput>
            <FormInput>
              <input type='checkbox' />
              <label>松山區</label> 
            </FormInput>
            <FormInput>
              <input type='checkbox' />
              <label>松山區</label> 
            </FormInput>
            <FormInput>
              <input type='checkbox' />
              <label>松山區</label> 
            </FormInput>
            <FormInput>
              <input type='checkbox' />
              <label>松山區</label> 
            </FormInput>
            <FormInput>
              <input type='checkbox' />
              <label>松山區</label> 
            </FormInput>
            <FormInput>
              <input type='checkbox' />
              <label>松山區</label> 
            </FormInput>
            <FormInput>
              <input type='checkbox' />
              <label>松山區</label> 
            </FormInput>
            <FormInput>
              <input type='checkbox' />
              <label>松山區</label> 
            </FormInput>
            <FormInput>
              <input type='checkbox' />
              <label>松山區</label> 
            </FormInput>
            <FormInput>
              <input type='checkbox' />
              <label>松山區</label> 
            </FormInput>
            <FormInput>
              <input type='checkbox' />
              <label>松山區</label> 
            </FormInput>
          </DropDownCheckbox>
        </div>
      </section>
      <IntroduceTable>
        <thead :class="$route.query.cat === 'consult' ? '' : 'consult'">
          <tr>
            <th>預約</th>
            <th>縣市</th>
            <th>行政區</th>
            <th>服務單位</th>
            <th>姓名</th>
            <th>聯絡電話</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in consultant" :key="`consultant-${idx}`">
            <td>
              <FormInput>
                <Input type="checkbox" id="email-check" v-model="item.book" />
              </FormInput>
            </td>
            <td>{{ item.place }}</td>
            <td>{{ item.state }}</td>
            <td>{{ item.service }}</td>
            <td>
              <div>
                <Icon 
                  v-if="item.gender === 'M'" 
                  :iconUrl="require('../assets/icon-gender-male.svg')" 
                  :size="20"
                />
                <Icon 
                  v-if="item.gender === 'F'" 
                  :iconUrl="require('../assets/icon-gender-female.svg')" 
                  :size="20"
                />
                {{ item.name }}
              </div>
            </td>
            <td>{{ item.contact }}</td>
          </tr>
        </tbody>
      </IntroduceTable>
    </IntroduceLayout>
    <IntroduceLayout v-if="step == 1">
      <Textarea width="100%"/>
    </IntroduceLayout>
    <IntroduceLayout v-if="step == 2">
      <IntroduceCheck />
    </IntroduceLayout>
    <ButtonWrapper>
      <Button v-if="step > 0" @click="step -= 1" bgColor="#fff" textColor="#05b077" borderColor="#05b077">刪除</Button>
      <Button v-if="step < 2" @click="step += 1">下一步</Button>
      <Button v-if="step === 2" @click="$router.push('../')">送出</Button>
    </ButtonWrapper>
  </Modal>
</template>

<script>
import { 
  Modal, 
  Title, 
  Button, 
  CloseButton, 
  ButtonWrapper,
  DropDownMenu,
  Header, 
  Table, 
  DropDownCheckbox, 
  FormInput, 
  Icon } from "../style.js";
import styled from "vue-styled-components";
import IntroduceCheck from "./introduceCheck.vue";
import Textarea from './ui/textarea.vue';

const IntroduceTable = styled(Table)`
  text-align: center;
  .consult tr th {
    background: #f0fbee;
  }
  div {
    display: inline-block;
    vertical-align: top;
  }
  tr:nth-child(even) {
    background: #f1f1f1;
  }
  td, th {
    border: 1px solid rgba(51, 51, 51, 0.2);
  }
`

const IntroduceLayout = styled.main`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 0 auto;
  section {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    & > * {
      margin: 0 2%;
      border: solid 1px #d9dbdb;
      border-radius: 12px;
      height: 40px;
      p {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 6px; 
        margin-left: 10px;
        padding: 0 10px;
      }
    }
    & > div:first-child {
      width: 30%;
    }
    & > div:last-child {
      width: 70%;
    }
  }
`

export default {
  name: 'Introduce',
  components: {
    Modal,
    Title,
    CloseButton,
    Header,
    Button,
    ButtonWrapper,
    IntroduceTable,
    DropDownMenu,
    DropDownCheckbox,
    IntroduceLayout,
    FormInput,
    Icon,
    IntroduceCheck,
    Textarea
  },
  methods: {

  },
  data() {
    return {
      step: 0,
      isMenuOpen: false,
      isListOpen: false,
      noteInput: '',
      stepTitle: [{
        consult: {
          new: '配對顧問',
          current: '呼叫原顧問'
        }, 
        service: {
          new: '轉介客服',
          current: '客服顧問',
        }

      }, '備註欄', '確認預約單資訊'],
      consultant: [
        {
          book: false,
          place: '台北市',
          state: '松山區',
          service: '世界服',
          name: '陳世華',
          gender: 'M',
          contact: '02-7777-0000#1234'
        },
        {
          book: true,
          place: '台北市',
          state: '松山區',
          service: '世界服',
          name: '陳世華',
          gender: 'F',
          contact: '02-7777-0000#1234'
        },
        {
          book: false,
          place: '台北市',
          state: '松山區',
          service: '世界服',
          name: '陳世華',
          gender: 'M',
          contact: '02-7777-0000#1234'
        }
      ]
    }
  },
  mounted: function(){
  }
}
</script>
