<template>
  <Modal :mainHeight="60">
    <Header>
      <router-link to='./'>
        <CloseButton/>
      </router-link>
      <Title textAlign='center'>近一個月服務歷程</Title>
    </Header>
<!--     <ServiceSection>
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
      <ServiceFormWrapper wrapperAlign='center'>
        <FormInput inputBasis="25%" v-for="(option, idx) in routeOptions" :key="`option-${idx}`">
          <input @change="handleChangeData" 
            :value="option"
            type="checkbox" name="option" 
            v-model="checkedRoutes" 
            :id="`option-${idx}`" />
          <label :for="`option-${idx}`">{{ option }}</label>
        </FormInput>
      </ServiceFormWrapper>
      <p>服務歷程平台無法查詢大於 6 個月以上的簡訊事件</p>
    </ServiceSection> -->
    <main>
      <ServiceTable>
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
            <td align="center"><p>{{ idx }}</p></td>
            <td align="center">
              <p>{{ record.CONTACT_DATE }}</p>
              <p>{{ record.CONTACT_TIME }}</p>
            </td>
            <td align="center"><p>{{ record.EVENT_NM }}</p></td>
            <td align="center"><p>{{ record.CHANNEL }}</p></td>
            <td align="center">
              <p>{{ record.CONTACT_NM }}</p>
              <p>{{ record.CONTACT_PHONE }}</p>
            </td>
            <td align="center"><p>{{ record.KEY_S1 }}</p></td>
          </tr>
        </tbody>
        <div v-if="tableData.length === 0" class="nodata">
          <img src="../assets/img-empty.svg" />
          <div>近三個月無資料</div>
        </div>
      </ServiceTable>
    </main>
    <Footer v-if="filterData.length > 10">
      <b-pagination
        v-model="page"
        :total-rows="filterData.length"
        :per-page="10"
        page-class="custom__pagination"
        prev-class="custom__pagination"
        next-class="custom__pagination"
        next-text=">"
        prev-text="<"
        first-number
        last-number
        @change="changePage"
      ></b-pagination>
    </Footer>
  </Modal>
</template>

<script>
import { 
  Modal, 
  Title, 
  CloseButton, 
  Icon, 
  Footer, 
  Table, 
  Header } from '../style.js';
import data from '../data/service';
import styled from 'vue-styled-components';

const ServiceTable = styled(Table)`
  .nodata {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 200px;
      height: 200px;
      margin-bottom: 30px;
    }
  }
`

// const ServiceSection = styled.section`
//   width: 90%;
//   margin: 0 auto;
//   & > div {
//     margin-bottom: 20px;
//     &:first-child > * {
//       margin-right: 8px;
//     }
//   }
//   & > p {
//     color: #628ea7;
//     font-size: 14px;
//     margin-left: 10px;
//     &::before {
//       content: "•"; 
//       color: #05b077;
//       displady: inline-block; 
//       width: 1em;
//       margin-left: -.8em
//     }
//   }
// `

// const ServiceFormWrapper = styled(FormWrapper)`
//   & > * {
//     margin: 5px 0;
//   }

// `

export default {
  name: 'Service',
  components: {
    Modal,
    Title,
    CloseButton,
    Icon,
    Footer,
    Header,
    ServiceTable
  },
  methods: {
    getData() {
      this.queryData = data;
      if(this.queryData.ErrMsg.returnCode === 0) {
        this.tableData = this.queryData.serviceRecords.slice(0, 10);
        this.handleChangeAll();
      } else {
        this.isError = true;
      }
    },
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
      // this.filterData = this.filtData(this.filtDate(this.records));
      this.filterData = this.queryData.serviceRecords;
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
      queryData: null,
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
    }
  },
  mounted: function(){
    this.page = 1;
    this.getData();
  }
}
</script>
