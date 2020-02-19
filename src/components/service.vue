<template>
  <Modal>
    <router-link to='./'>
      <CloseButton/>
    </router-link>
    <Title textAlign='center'>服務歷程</Title>
    <ServiceLayout>
      <section>
        <FormWrapper wrapperAlign='center'>
          <span>時間</span>
          <FormInput><input type='date' /></FormInput>
          <span>至</span>
          <FormInput><input type='date' /></FormInput>
          <Button>查詢</Button>
        </FormWrapper>
        <FormWrapper wrapperAlign='center'>
          <span>管道</span>
          <FormInput>
            <input type="radio" name="all"/>
            <label>全選</label>
          </FormInput>
          <FormInput>
            <input type="radio" name="all"/>
            <label>全不選</label>
          </FormInput>
        </FormWrapper>
        <FormWrapper wrapperAlign='center'>
          <FormInput inputBasis="21%" v-for="(option, idx) in routeOptions" :key="`option-${idx}`">
            <input type="checkbox" name="option" 
              :id="`option-${idx}`" :value="option" />
            <label :for="`option-${idx}`">{{ option }}</label>
          </FormInput>
        </FormWrapper>
      </section>
      <ServiceTable>
        <thead>
          <tr>
            <th>序號</th>
            <th>日期/時間 <Icon :iconUrl="require('../assets/icon-arrow-dark-down.svg')"/></th>
            <th>事件 <Icon :iconUrl="require('../assets/icon-arrow-dark-down.svg')"/></th>
            <th>管道 <Icon :iconUrl="require('../assets/icon-arrow-dark-down.svg')"/></th>
            <th>處理人員/分機 <Icon :iconUrl="require('../assets/icon-arrow-dark-down.svg')"/></th>
            <th>KEY值</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(record, idx) in records" :key="`record-${idx}`">
            <td><p>{{ record.id }}</p></td>
            <td>
              <p>{{ record.date }}</p>
              <p>{{ record.time }}</p>
            </td>
            <td><p>{{ record.event }}</p></td>
            <td><p>{{ record.route }}</p></td>
            <td>
              <p>{{ record.owner }}</p>
              <p>{{ record.num }}</p>
            </td>
            <td><p>{{ record.key }}</p></td>
          </tr>
        </tbody>
      </ServiceTable>
    </ServiceLayout>
    <Pagination :length="16" :current="5"/>
  </Modal>
</template>

<script>
import { Button, Modal, Title, CloseButton, FormInput, FormWrapper, Icon } from '../style.js';
import Pagination from './pagination.vue';
import styled from 'vue-styled-components';

const ServiceLayout = styled.div`
  span {
    display: inline-block;
  }
  section {
    width: 100%;
    margin: 0 auto;
  }
`

const ServiceTable = styled('table')`
  border-collapse: collapse;
  width: 100%;
  margin: 10px auto; 
  thead {
    th {
      height: 40px;
      font-size: 14px;
      font-weight: normal;
      background: #e3fafa;
      border-bottom: 1px solid rgba(51, 51, 51, 0.2);
      padding: auto;
      color: #324c5a;
    }
    th:not(:last-child) {
      border-right: 1px solid rgba(51, 51, 51, 0.2);
    }
  }
  tr {
    vertical-align: middle;
  }
  tbody {
    td {
      height: 40px;
      border-bottom: 1px solid rgba(51, 51, 51, 0.2);
      padding: auto;
      color: #324c5a;
      p {
        font-size: 14px;
        margin: 0 auto;
        text-align: center;
      }
    } 
    td:not(:last-child) {
      border-right: 1px solid rgba(51, 51, 51, 0.2);
    }
  }
`

export default {
  name: 'Service',
  components: {
    Button,
    FormInput,
    FormWrapper,
    Modal,
    Title,
    CloseButton,
    ServiceTable,
    Pagination,
    ServiceLayout,
    Icon
  },
  data () {
    return {
      routeOptions: ['0800', '0900', '直效', '保費', '服務中心櫃台', '業務員_行動', '業務員_一般', '醫院', '保代', '官網', '電話_其他', '簡訊', 'MML', '機場櫃檯', '內部作業', '其他', '傳真', '電話_服務中心', '申訴'],
      records: [
        {
          id: 1,
          date: '108/12/26',
          time: '10:00',
          event: '申請網路服務',
          route: '簡訊',
          owner: '曹心慈 襄理',
          num: '#1123',
          key: 'ABB10173671763'
        },
        {
          id: 2,
          date: '108/12/26',
          time: '10:00',
          event: '申請網路服務',
          route: '簡訊',
          owner: '曹心慈 襄理',
          num: '#1123',
          key: 'ABB10173671763'
        },
        {
          id: 3,
          date: '108/12/26',
          time: '10:00',
          event: '申請網路服務',
          route: '簡訊',
          owner: '曹心慈 襄理',
          num: '#1123',
          key: 'ABB10173671763'
        },
        {
          id: 4,
          date: '108/12/26',
          time: '10:00',
          event: '申請網路服務',
          route: '簡訊',
          owner: '曹心慈 襄理',
          num: '#1123',
          key: 'ABB10173671763'
        },
        {
          id: 5,
          date: '108/12/26',
          time: '10:00',
          event: '申請網路服務',
          route: '簡訊',
          owner: '曹心慈 襄理',
          num: '#1123',
          key: 'ABB10173671763'
        },
        {
          id: 6,
          date: '108/12/26',
          time: '10:00',
          event: '申請網路服務',
          route: '簡訊',
          owner: '曹心慈 襄理',
          num: '#1123',
          key: 'ABB10173671763'
        },
        {
          id: 7,
          date: '108/12/26',
          time: '10:00',
          event: '申請網路服務',
          route: '簡訊',
          owner: '曹心慈 襄理',
          num: '#1123',
          key: 'ABB10173671763'
        },
        {
          id: 8,
          date: '108/12/26',
          time: '10:00',
          event: '申請網路服務',
          route: '簡訊',
          owner: '曹心慈 襄理',
          num: '#1123',
          key: 'ABB10173671763'
        },
        {
          id: 9,
          date: '108/12/26',
          time: '10:00',
          event: '申請網路服務',
          route: '簡訊',
          owner: '曹心慈 襄理',
          num: '#1123',
          key: 'ABB10173671763'
        }, 
        {
          id: 10,
          date: '108/12/26',
          time: '10:00',
          event: '申請網路服務',
          route: '簡訊',
          owner: '曹心慈 襄理',
          num: '#1123',
          key: 'ABB10173671763'
        },   
        {
          id: 11,
          date: '108/12/26',
          time: '10:00',
          event: '申請網路服務',
          route: '簡訊',
          owner: '曹心慈 襄理',
          num: '#1123',
          key: 'ABB10173671763'
        },                                            
      ]
    }
  },
}
</script>
