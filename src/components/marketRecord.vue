<template>
  <Modal>
    <Header>
      <router-link to='./'>
        <CloseButton/>
      </router-link>
      <Title textAlign='center'>行銷歷史紀錄</Title>
    </Header>
    <main>
      <MarketTable>
        <thead>
          <tr>
            <th>日期</th>
            <th>類別 
              <Icon data-filter='category' @click="toggleFilterMenu" v-if="filterMenu.category"
                :iconUrl="require('../assets/icon-arrow-dark-down.svg')"/>
              <Icon data-filter='category' @click="toggleFilterMenu" v-if="!filterMenu.category"
                :iconUrl="require('../assets/icon-arrow-dark-up.svg')"/>
              <DropDown v-if="filterMenu.category">
                <a @click="handleFilter" data-filter='category' data-type='all'>全部</a>
                <a @click="handleFilter" data-filter='category' data-type='服務建議'>服務建議</a>
                <a @click="handleFilter" data-filter='category' data-type='商機推薦'>商機推薦</a>
                <a @click="handleFilter" data-filter='category' data-type='保障缺口'>保障缺口</a>
              </DropDown>
            </th>
            <th>項目</th>
            <th>狀態 
              <Icon data-filter='state' @click="toggleFilterMenu" v-if="filterMenu.state"
                :iconUrl="require('../assets/icon-arrow-dark-down.svg')"/>
              <Icon data-filter='state' @click="toggleFilterMenu" v-if="!filterMenu.state"
                :iconUrl="require('../assets/icon-arrow-dark-up.svg')"/>
              <DropDown v-if="filterMenu.state">
                <a @click="handleFilter" data-filter='state' data-type='all'>全部</a>
                <a @click="handleFilter" data-filter='state' data-type='1'>接受</a>
                <a @click="handleFilter" data-filter='state' data-type='2'>拒絕</a>
                <a @click="handleFilter" data-filter='state' data-type='3'>沒時間</a>
              </DropDown>
            </th>
            <th>備註</th>
            <th>客服人員</th>
          </tr>
        </thead>
        <tbody v-for="(record, idx) in tableData" :key="`record-${idx}`">
          <tr v-for="(item, idx) in record.data" :key="`row-${idx}`"> 
            <td :rowspan="record.data.length" v-if="idx === 0">
              <p>{{ record.date }}</p>
              <p>{{ record.time }}</p>
            </td>      
            <td><p>{{ item.category }}</p></td>
            <td><p>{{ item.event }}</p></td>
            <td>
              <p>
                <Icon v-if="item.state === 1" :size='20'
                  :iconUrl="require('../assets/icon-accept.svg')"/>
                <Icon v-if="item.state === 2" :size='20'
                  :iconUrl="require('../assets/icon-refuse.svg')"/>
                <Icon v-if="item.state === 3" :size='20'
                  :iconUrl="require('../assets/icon-notime.svg')"/>                                    
              </p>
            </td>
            <td>
              <p v-if="!item.edit">{{ item.note.text }} <Icon :iconUrl="require('../assets/icon-edit-edit-green.svg')" :size='20' @click="item.edit = !item.edit;"/></p>
              <div v-if="item.edit">
                <FormInput>
                  <input type='text' :value="item.note.text"/>
                </FormInput>
                <SendButton @click="item.edit = !item.edit;">儲存送出</SendButton>
                <span @click="item.edit = !item.edit;">取消</span>
              </div>
              <ListItem v-if="item.note.date">
                <span>預約聯絡</span>
                <p v-if="!item.edit">{{ item.note.date }}</p>
                <FormInput>
                  <input type='date' v-if="item.edit" />
                </FormInput>
              </ListItem>
            </td>
            <td>
              <p>{{ item.place }}</p>
              <p>{{ item.owner }}</p>
            </td>
          </tr>
        </tbody>
      </MarketTable>
    </main>
    <ButtonWrapper>
      <b-pagination
        v-model="page"
        :total-rows="filterData.length"
        :per-page="3"
        next-text=">"
        prev-text="<"
        first-number
        last-number
        @change="showTable"
      ></b-pagination>
    </ButtonWrapper>
  </Modal>
</template>

<script>
import { Modal, Title, CloseButton, ButtonWrapper, SendButton, Table, FormInput, Header, Icon, DropDown, ListItem } from '../style.js';
import styled from 'vue-styled-components';

const MarketTable = styled(Table)`
  text-align: center;
  td {
    padding: 5px;
  }
  th:first-child {
    width: 90px;
  }
  th:nth-child(2) {
    width: 75px;
  }
  th:nth-child(3) {
    width: 100px;
  }
  th:nth-child(4) {
    width: 50px;
  }
  th:nth-child(5) {
    width: 150px;
  }
`

export default {
  name: 'MarketRecord',
  components: {
    Modal,
    Title,
    CloseButton,
    ButtonWrapper,
    MarketTable,
    Header,
    Icon,
    DropDown,
    ListItem,
    SendButton,
    FormInput
  },
  methods: {
    showTable(page) {
      this.tableData = this.filterData.slice((page - 1)*3, page*3 )
    },
    toggleFilterMenu (evt) {
      this.filterMenu[evt.target.dataset.filter] = !this.filterMenu[evt.target.dataset.filter];
    },
    handleFilter(evt) {
      this.filterData = [...this.records].map(item => {
        return {
          ...item, 
          data: item.data.filter(qData => 
            evt.target.dataset.type === 'all' ? true : qData[evt.target.dataset.filter] == evt.target.dataset.type
          )
        }
      }).filter(item => item.data.length > 0);
      this.showTable(this.page);
      this.toggleFilterMenu(evt);
    }
  },
  data() {
    return {
      tableData: [],
      filterData: [],
      filterMenu: {
        category: false,
        state: false
      },
      page: 1,
      records: [
        {
          date: '108/12/26',
          time: '10:14',
          data: [
            {
              category: '商機推薦',
              event: '一通電話Fun心旅遊趣',
              state: 1,
              note: {
                text: '客戶下個月有出國行程，對旅平險',
                date: '2020/01/30',
              },
              place: '世界服務中心',
              owner: '陳人壽',
              edit: false,
            },
            {
              category: '商機推薦',
              event: '一通電話Fun心旅遊趣',
              state: 2,
              note: {
                text: '客戶想申辦網路服務但時間不夠，下次再幫客戶開通開通',
                date: null,
              },
              place: '世界服務中心',
              owner: '陳人壽',
              edit: false,
            },
            {
              category: '保障缺口',
              event: '一通電話Fun心旅遊趣',
              state: 3,
              note: {
                text: '客戶想申辦網路服務但時間不夠，下次再幫客戶開通開通',
                date: null,
              },
              place: '世界服務中心',
              owner: '陳人壽',
              edit: false,
            },
            {
              category: '商機推薦',
              event: '一通電話Fun心旅遊趣',
              state: 3,
              note: {
                text: '客戶想申辦網路服務但時間不夠，下次再幫客戶開通開通',
                date: null,
              },
              place: '世界服務中心',
              owner: '陳人壽',
              edit: false,
            }
          ]
        },
        {
          date: '108/12/26',
          time: '10:34',
          data: [
            {
              category: '商機推薦',
              event: '一通電話Fun心旅遊趣',
              state: 3,
              note: {
                text: '客戶想申辦網路服務但時間不夠，下次再幫客戶開通開通',
                date: null,
              },
              place: '世界服務中心',
              owner: '陳人壽',
              edit: false,
            },
            {
              category: '商機推薦',
              event: '一通電話Fun心旅遊趣',
              state: 3,
              note: {
                text: '客戶想申辦網路服務但時間不夠，下次再幫客戶開通開通',
                date: null,
              },
              place: '世界服務中心',
              owner: '陳人壽',
              edit: false,
            },
            {
              category: '保障缺口',
              event: '一通電話Fun心旅遊趣',
              state: 3,
              note: {
                text: '客戶想申辦網路服務但時間不夠，下次再幫客戶開通開通',
                date: null,
              },
              place: '世界服務中心',
              owner: '陳人壽',
              edit: false,
            },
            {
              category: '商機推薦',
              event: '一通電話Fun心旅遊趣',
              state: 3,
              note: {
                text: '客戶想申辦網路服務但時間不夠，下次再幫客戶開通開通',
                date: null,
              },
              place: '世界服務中心',
              owner: '陳人壽',
              edit: false,
            },
            {
              category: '商機推薦',
              event: '一通電話Fun心旅遊趣',
              state: 3,
              note: {
                text: '客戶想申辦網路服務但時間不夠，下次再幫客戶開通開通',
                date: null,
              },
              place: '世界服務中心',
              owner: '陳人壽',
              edit: false,
            },
            {
              category: '商機推薦',
              event: '一通電話Fun心旅遊趣',
              state: 3,
              note: {
                text: '客戶想申辦網路服務但時間不夠，下次再幫客戶開通開通',
                date: null,
              },
              place: '世界服務中心',
              owner: '陳人壽',
              edit: false,
            }
          ]
        },
        {
          date: '108/12/26',
          time: '10:59',
          data: [
            {
              category: '商機推薦',
              event: '一通電話Fun心旅遊趣',
              state: 3,
              note: {
                text: '客戶想申辦網路服務但時間不夠，下次再幫客戶開通開通',
                date: null,
              },
              place: '世界服務中心',
              owner: '陳人壽',
              edit: false,
            },
            {
              category: '商機推薦',
              event: '一通電話Fun心旅遊趣',
              state: 3,
              note: {
                text: '客戶想申辦網路服務但時間不夠，下次再幫客戶開通開通',
                date: null,
              },
              place: '世界服務中心',
              owner: '陳人壽',
              edit: false,
            }
          ]
        },
        {
          date: '108/12/26',
          time: '12:14',
          data: [
            {
              category: '服務建議',
              event: '一通電話Fun心旅遊趣',
              state: 1,
              note: {
                text: '客戶下個月有出國行程，對旅平險',
                date: '2020/01/30',
              },
              place: '世界服務中心',
              owner: '陳人壽',
              edit: false,
            },
            {
              category: '商機推薦',
              event: '一通電話Fun心旅遊趣',
              state: 2,
              note: {
                text: '客戶想申辦網路服務但時間不夠，下次再幫客戶開通開通',
                date: null,
              },
              place: '世界服務中心',
              owner: '陳人壽',
              edit: false,
            },
            {
              category: '商機推薦',
              event: '一通電話Fun心旅遊趣',
              state: 3,
              note: {
                text: '客戶想申辦網路服務但時間不夠，下次再幫客戶開通開通',
                date: null,
              },
              place: '世界服務中心',
              owner: '陳人壽',
              edit: false,
            },
            {
              category: '商機推薦',
              event: '一通電話Fun心旅遊趣',
              state: 3,
              note: {
                text: '客戶想申辦網路服務但時間不夠，下次再幫客戶開通開通',
                date: null,
              },
              place: '世界服務中心',
              owner: '陳人壽',
              edit: false,
            }
          ]
        },
        {
          date: '108/12/26',
          time: '13:59',
          data: [
            {
              category: '商機推薦',
              event: '一通電話Fun心旅遊趣',
              state: 3,
              note: {
                text: '客戶想申辦網路服務但時間不夠，下次再幫客戶開通開通',
                date: null,
              },
              place: '世界服務中心',
              owner: '陳人壽',
              edit: false,
            },
            {
              category: '商機推薦',
              event: '一通電話Fun心旅遊趣',
              state: 3,
              note: {
                text: '客戶想申辦網路服務但時間不夠，下次再幫客戶開通開通',
                date: null,
              },
              place: '世界服務中心',
              owner: '陳人壽',
              edit: false,
            }
          ]
        },
      ]
    }
  },
  mounted: function(){
    this.filterData = this.records;
    this.tableData = this.filterData.slice(0, 3);
  }
}
</script>
