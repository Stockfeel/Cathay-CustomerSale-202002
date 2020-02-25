<template>
  <Modal :mainHeight="60">
    <Header>
      <router-link to='./'>
        <CloseButton/>
      </router-link>
      <Title textAlign='center'>服務歷程</Title>
    </Header>
    <ServiceSection>
      <FormWrapper wrapperAlign='center'>
        <span>時間</span>
        <FormInput><input type='date'
          v-model="startDate" 
          name='date'/></FormInput>
        <span>至</span>
        <FormInput><input type='date' 
          v-model="endDate" 
          name='date'/></FormInput>
        <Button @click="handleChangeData">查詢</Button>
      </FormWrapper>
      <FormWrapper wrapperAlign='center' :wrapperMargin='20'>
        <span>管道</span>
        <FormInput>
          <input id="all" type="checkbox" value="all" v-model="checkedAll" 
            @change="handleChangeAll"/>
          <label for="all">全選</label>
        </FormInput>
        <FormInput>
          <input id="notall" type="checkbox" value="notall" v-model="checkedAll" 
            @change="handleChangeAll" />
          <label for="notall">全不選</label>
        </FormInput>
      </FormWrapper>
      <FormWrapper wrapperAlign='center'>
        <FormInput inputBasis="25%" v-for="(option, idx) in routeOptions" :key="`option-${idx}`">
          <input @change="handleChangeData" 
            :value="option"
            type="checkbox" name="option" 
            v-model="checkedRoutes" 
            :id="`option-${idx}`" />
          <label :for="`option-${idx}`">{{ option }}</label>
        </FormInput>
      </FormWrapper>
    </ServiceSection>
    <main>
      <Table>
        <thead>
          <tr>
            <th>序號</th>
            <th>日期/時間 
              <Icon @click="handleSort" data-sort='date' v-if="sortState.date"
                :iconUrl="require('../assets/icon-arrow-dark-down.svg')"/>
              <Icon @click="handleSort" data-sort='date' v-if="!sortState.date"
                :iconUrl="require('../assets/icon-arrow-dark-up.svg')"/>
            </th>
            <th>事件 
              <Icon @click="handleSort" data-sort='event' v-if="sortState.event"
                :iconUrl="require('../assets/icon-arrow-dark-down.svg')"/>
              <Icon @click="handleSort" data-sort='event' v-if="!sortState.event"
                :iconUrl="require('../assets/icon-arrow-dark-up.svg')"/>
            </th>
            <th>管道 
              <Icon @click="handleSort" data-sort='route' v-if="sortState.route"
                :iconUrl="require('../assets/icon-arrow-dark-down.svg')"/>
              <Icon @click="handleSort" data-sort='route' v-if="!sortState.route"
                :iconUrl="require('../assets/icon-arrow-dark-up.svg')"/>
            </th>
            <th>處理人員/分機 
              <Icon @click="handleSort" data-sort='owner' v-if="sortState.owner"
                :iconUrl="require('../assets/icon-arrow-dark-down.svg')"/>
              <Icon @click="handleSort" data-sort='owner' v-if="!sortState.owner"
                :iconUrl="require('../assets/icon-arrow-dark-up.svg')"/>
            </th>
            <th>KEY值</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(record, idx) in tableData" :key="`record-${idx}`">
            <td align="center"><p>{{ record.id }}</p></td>
            <td align="center">
              <p>{{ record.date }}</p>
              <p>{{ record.time }}</p>
            </td>
            <td align="center"><p>{{ record.event }}</p></td>
            <td align="center"><p>{{ record.route }}</p></td>
            <td align="center">
              <p>{{ record.owner }}</p>
              <p>{{ record.num }}</p>
            </td>
            <td align="center"><p>{{ record.key }}</p></td>
          </tr>
        </tbody>
      </Table>
    </main>
    <ButtonWrapper v-if="filterData.length > 10">
      <b-pagination
        v-model="page"
        :total-rows="filterData.length"
        :per-page="10"
        next-text=">"
        prev-text="<"
        first-number
        last-number
        @change="changePage"
      ></b-pagination>
    </ButtonWrapper>
  </Modal>
</template>

<script>
import { 
  Button, 
  Modal, 
  Title, 
  CloseButton, 
  FormInput, 
  FormWrapper, 
  Icon, 
  ButtonWrapper, 
  Table, 
  Header } from '../style.js';
import styled from 'vue-styled-components';

const ServiceSection = styled.section`
  width: 90%;
  margin: 0 auto;
  & > div {
    margin-bottom: 20px;
    &:first-child > * {
      margin-right: 8px;
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
    ServiceSection,
    Icon,
    ButtonWrapper,
    Table,
    Header
  },
  methods: {
    changePage (page = this.page) {
      this.page = page;
      this.tableData = this.filterData.slice((this.page - 1)*10, this.page*10 )
    },
    handleSort(evt) {
      if(this.sortState[evt.target.dataset.sort]) {
        this.filterData = this.filterData.sort((a, b) => {
          return a[evt.target.dataset.sort] > b[evt.target.dataset.sort] ? 1 : a[evt.target.dataset.sort] === b[evt.target.dataset.sort] ? 0 : -1
        })
      } else {
        this.filterData = this.filterData.sort((a, b) => {
          return b[evt.target.dataset.sort] > a[evt.target.dataset.sort] ? 1 : b[evt.target.dataset.sort] === a[evt.target.dataset.sort] ? 0 : -1
        })      
      }
      this.sortState[evt.target.dataset.sort] = !this.sortState[evt.target.dataset.sort];
      this.changePage();
    },
    filtDate(data) {
      return data.filter(item => Date.parse(item.date) <= Date.parse(this.endDate) && Date.parse(item.date) >= Date.parse(this.startDate))
    },
    filtData(data) {
      if(this.checkedRoutes.length > 0 && 
        this.checkedRoutes.length < this.routeOptions.length) {
        this.checkedAll = [];
      } else if(this.checkedRoutes.length === 0) {
        this.checkedAll = ['notall'];
      } else if(this.checkedRoutes.length === this.routeOptions.length) {
        this.checkedAll = ['all'];
      }
      return data.filter(item => this.checkedRoutes.includes(item.route));
    },
    handleChangeData() {
      this.filterData = this.filtData(this.filtDate(this.records));
      this.changePage();
    },
    handleChangeAll() {
      if(this.checkedAll.length === 2){
        this.checkedAll.shift();
      }
      if(this.checkedAll[0] === 'all') {
        this.checkedRoutes = this.routeOptions;
      } else {
        this.checkedRoutes = [];
      }
      this.handleChangeData();
    }
  },
  data () {
    return {
      field: {
        option: '',
      },
      startDate: new Date((Date.now() - 1000*60*60*24*365)).toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      sortState: {
        date: false,
        event: false,
        route: false,
        owner: false,
      },
      checkedRoutes: [],
      checkedAll: ['all'],
      tableData: [],
      filterData: [],
      page: 1,
      routeOptions: ['0800', '0900', '直效', '保費', '服務中心櫃台', '業務員_行動', '業務員_一般', '醫院', '保代', '官網', '電話_其他', '簡訊', 'MML', '機場櫃檯', '內部作業', '其他', '傳真', '電話_服務中心', '申訴'],
      records: [
        {
          id: 1,
          date: '2019-01-02',
          time: '10:00',
          event: '申請網路服務',
          route: '簡訊',
          owner: '曹心慈 襄理',
          num: '#1123',
          key: 'ABB10173671763'
        },
        {
          id: 2,
          date: '2019-01-02',
          time: '10:00',
          event: '申請網路服務',
          route: '0800',
          owner: '曹心慈 襄理',
          num: '#1123',
          key: 'ABB10173671763'
        },
        {
          id: 3,
          date: '2019-01-02',
          time: '10:00',
          event: '申請網路服務',
          route: '0800',
          owner: '曹心慈 襄理',
          num: '#1123',
          key: 'ABB10173671763'
        },
        {
          id: 4,
          date: '2019-01-02',
          time: '10:00',
          event: '申請網路服務',
          route: '簡訊',
          owner: '曹心慈 襄理',
          num: '#1123',
          key: 'ABB10173671763'
        },
        {
          id: 5,
          date: '2019-01-02',
          time: '10:00',
          event: '申請網路服務',
          route: '0800',
          owner: '鍾肇政 襄理',
          num: '#1123',
          key: 'ABB10173671763'
        },
        {
          id: 6,
          date: '2019-03-02',
          time: '10:00',
          event: '申請網路服務',
          route: '簡訊',
          owner: '郭松棻 襄理',
          num: '#1123',
          key: 'ABB10173671763'
        },
        {
          id: 7,
          date: '2019-03-02',
          time: '10:00',
          event: '申請網路服務',
          route: '簡訊',
          owner: '曹心慈 襄理',
          num: '#1123',
          key: 'ABB10173671763'
        },
        {
          id: 8,
          date: '2019-01-02',
          time: '10:00',
          event: '申請網路服務',
          route: '簡訊',
          owner: '曹心慈 襄理',
          num: '#1123',
          key: 'ABB10173671763'
        },
        {
          id: 9,
          date: '2019-01-08',
          time: '10:00',
          event: '申請網路服務',
          route: '簡訊',
          owner: '曹心慈 襄理',
          num: '#1123',
          key: 'ABB10173671763'
        }, 
        {
          id: 10,
          date: '2019-01-02',
          time: '10:00',
          event: '申請網路服務',
          route: '簡訊',
          owner: '曹心慈 襄理',
          num: '#1123',
          key: 'ABB10173671763'
        },   
        {
          id: 11,
          date: '2019-01-09',
          time: '10:00',
          event: '申請網路服務',
          route: '簡訊',
          owner: '曹心慈 襄理',
          num: '#1123',
          key: 'ABB10173671763'
        },                                            
      ],
    }
  },
  mounted: function(){
    this.page = 1;
    this.tableData = this.records.slice(0, 10);
    this.handleChangeAll();
  }
}
</script>
