<template>
  <Modal>
    <Header>
      <router-link to='./'>
        <CloseButton/>
      </router-link>
      <Title textAlign='center'>行銷歷史紀錄<span>（近半年）</span></Title>
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
              <DropDownMenu v-if="filterMenu.category">
                <div @click="handleFilter" data-filter='category' data-type='all'>全部</div>
                <div @click="handleFilter" data-filter='category' data-type='服務建議'>服務建議</div>
                <div @click="handleFilter" data-filter='category' data-type='商機推薦'>商機推薦</div>
                <div @click="handleFilter" data-filter='category' data-type='保障缺口'>保障缺口</div>
              </DropDownMenu>
            </th>
            <th>項目</th>
            <th>狀態 
              <Icon data-filter='state' @click="toggleFilterMenu" v-if="filterMenu.state"
                :iconUrl="require('../assets/icon-arrow-dark-down.svg')"/>
              <Icon data-filter='state' @click="toggleFilterMenu" v-if="!filterMenu.state"
                :iconUrl="require('../assets/icon-arrow-dark-up.svg')"/>
              <DropDownMenu v-if="filterMenu.state">
                <div @click="handleFilter" data-filter='state' data-type='all'>全部</div>
                <div @click="handleFilter" data-filter='state' data-type='1'>接受</div>
                <div @click="handleFilter" data-filter='state' data-type='2'>拒絕</div>
                <div @click="handleFilter" data-filter='state' data-type='3'>沒時間</div>
              </DropDownMenu>
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
            <td :class="item.edit ? 'active' : ''">
              <p v-if="!item.edit">
                {{ item.note.text }} 
                <Icon 
                  :iconUrl="require('../assets/icon-edit-edit-green.svg')" 
                  :size='20' 
                  :state="item.note.text.length >= 60"
                  @click="item.edit = !item.edit;"
                />
              </p>
              <FormInput class="input__text" v-if="item.edit" size="450">
                <b-form-textarea
                  id="textarea"
                  v-model="item.note.text"
                  placeholder="輸入備註"
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
              </FormInput>
              <div class="input__date">
                <FormInput>
                  <input type="checkbox" v-if="item.edit" :checked="item.note.date ? true : false" v-model="item.note.isBook" />
                  <span v-if="!item.edit && item.note.date">•</span>
                  <span v-if="item.note.date || item.edit">預約聯絡</span>
                </FormInput>
                <p v-if="!item.edit">{{ item.note.date }}</p>
                <FormInput>
                  <input type='date' v-if="item.edit" :value="item.note.date" :disabled="!item.note.isBook" />
                </FormInput>
              </div>
              <div class="input__buttons" v-if="item.edit">
                <SendButton @click="item.edit = !item.edit;">儲存寄出</SendButton>
                <span @click="item.edit = !item.edit;">取消</span>
              </div>
            </td>
            <td>
              <p>{{ item.place }}</p>
              <p>{{ item.owner }}</p>
            </td>
          </tr>
        </tbody>
      </MarketTable>
    </main>
    <Footer>
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
    </Footer>
  </Modal>
</template>

<script>
import { 
  Modal, 
  Title, 
  CloseButton, 
  Footer, 
  SendButton, 
  Table, 
  FormInput, 
  Header, 
  Icon,
  DropDownMenu
} from '../style.js';
import styled from 'vue-styled-components';

const MarketTable = styled(Table)`
  .input__date {
    p {
      padding-left: 1rem;
    }
  }
  .input__buttons {
    display: flex;
    align-items: center;
    margin: 12px 0;
    justify-content: space-between;
  }
  tbody td {
    text-align: left;
    padding: 5px 5px;
    &.active {
      background: rgba(149, 225, 203, .16);
      & > * {
        margin-bottom: 10px;
      }
      .input__date {
        & > * {
          margin-bottom: 3px;
        }
      }
    }
  }
  td:nth-child(3), td:nth-child(4) {
    text-align: center;
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
    Footer,
    MarketTable,
    Header,
    Icon,
    DropDownMenu,
    SendButton,
    FormInput,
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
          date: '108-12-26',
          time: '10:14',
          data: [
            {
              category: '商機推薦',
              event: '一通電話Fun心旅遊趣',
              state: 1,
              note: {
                text: '客戶下個月有出國行程，對旅平險',
                date: '2020-01-30',
                isBook: true,
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
                isBook: false,
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
                isBook: false,
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
                isBook: false,
              },
              place: '世界服務中心',
              owner: '陳人壽',
              edit: false,
            }
          ]
        },
        {
          date: '108-12-26',
          time: '10:34',
          data: [
            {
              category: '商機推薦',
              event: '一通電話Fun心旅遊趣',
              state: 3,
              note: {
                text: '客戶想申辦網路服務但時間不夠，下次再幫客戶開通開通',
                date: null,
                isBook: false,
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
                isBook: false,
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
                isBook: false,
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
                isBook: false,
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
                isBook: false,
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
                isBook: false,
              },
              place: '世界服務中心',
              owner: '陳人壽',
              edit: false,
            }
          ]
        },
        {
          date: '108-12-26',
          time: '10:59',
          data: [
            {
              category: '商機推薦',
              event: '一通電話Fun心旅遊趣',
              state: 3,
              note: {
                text: '客戶想申辦網路服務但時間不夠，下次再幫客戶開通開通',
                date: null,
                isBook: false,
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
                isBook: false,
              },
              place: '世界服務中心',
              owner: '陳人壽',
              edit: false,
            }
          ]
        },
        {
          date: '108-12-26',
          time: '12:14',
          data: [
            {
              category: '服務建議',
              event: '一通電話Fun心旅遊趣',
              state: 1,
              note: {
                text: '客戶下個月有出國行程，對旅平險',
                date: '2020-01-30',
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
                isBook: false,
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
                isBook: false,
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
                isBook: false,
              },
              place: '世界服務中心',
              owner: '陳人壽',
              edit: false,
            }
          ]
        },
        {
          date: '108-12-26',
          time: '13:59',
          data: [
            {
              category: '商機推薦',
              event: '一通電話Fun心旅遊趣',
              state: 3,
              note: {
                text: '客戶想申辦網路服務但時間不夠，下次再幫客戶開通開通',
                date: null,
                isBook: false,
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
                isBook: false,
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
