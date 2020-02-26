<template>
  <Modal>
    <Header>
      <router-link to='./'>
        <CloseButton/>
      </router-link>
      <Title textAlign='center'>呼叫原顧問</Title>
    </Header>
    <IntroduceLayout>
      <section>
        <div>
          <p>
            <span>台北市</span> 
            <Icon :iconUrl="require('../assets/icon-arrow-dark-down.svg')" size="15"></Icon>
          </p>
          <DropDown>
            <a>台北市</a>
            <a>新北市</a>
            <a>基隆市</a>
            <a>桃園縣</a>
          </DropDown>
        </div>
        <div>
          <p>
            <span>松山區</span> 
            <Icon :iconUrl="require('../assets/icon-location.svg')" size="20"></Icon>
          </p>
          <DropDownCheckbox>
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
      <Table>
        <thead>
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
            <td>{{ item.book }}</td>
            <td>{{ item.place }}</td>
            <td>{{ item.state }}</td>
            <td>{{ item.service }}</td>
            <td>{{ item.gender }} {{ item.name }}</td>
            <td>{{ item.contact }}</td>
          </tr>
        </tbody>
      </Table>
    </IntroduceLayout>
    <Footer>
      <Button>下一步</Button>
    </Footer>
  </Modal>
</template>

<script>
import { 
  Modal, 
  Title, 
  Button, 
  CloseButton, 
  DropDown,
  Footer, 
  Header, 
  Table, 
  DropDownCheckbox, 
  FormInput, 
  Icon } from '../style.js';
import styled from 'vue-styled-components';

const IntroduceLayout = styled.main`
  display: flex;
  flex-direction: column;
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
    Footer,
    Header,
    Button,
    Table,
    DropDown,
    DropDownCheckbox,
    IntroduceLayout,
    FormInput,
    Icon
  },
  methods: {

  },
  data() {
    return {
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
          book: false,
          place: '台北市',
          state: '松山區',
          service: '世界服',
          name: '陳世華',
          gender: 'M',
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
