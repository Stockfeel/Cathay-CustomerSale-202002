<template>
  <Modal>
    <router-link to='./'>
      <CloseButton/>
    </router-link>
    <Title textAlign='center'>行銷歷史紀錄</Title>
    <main>
      <Table>
        <thead>
          <tr>
            <th>日期</th>
            <th>類別<Icon :iconUrl="require('../assets/icon-arrow-dark-down.svg')"/></th>
            <th>項目<Icon :iconUrl="require('../assets/icon-arrow-dark-down.svg')"/></th>
            <th>狀態<Icon :iconUrl="require('../assets/icon-arrow-dark-down.svg')"/></th>
            <th>備註<Icon :iconUrl="require('../assets/icon-arrow-dark-down.svg')"/></th>
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
            <td><p>{{ item.state }}</p></td>
            <td>
              <p>{{ item.note.text }}</p>
              <div>
                <p v-if="item.note.date">預約時間</p>
                <p v-if="item.note.date">{{ item.note.date }}</p>
              </div>
            </td>
            <td>
              <p>{{ item.place }}</p>
              <p>{{ item.owner }}</p>
            </td>
          </tr>
        </tbody>
      </Table>
    </main>
    <ButtonWrapper>
      <b-pagination
        v-model="page"
        :total-rows="records.length"
        :per-page="3"
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
import { Modal, Title, CloseButton, ButtonWrapper, Table } from '../style.js';
// import styled from 'vue-styled-components';

export default {
  name: 'MarketRecord',
  components: {
    Modal,
    Title,
    CloseButton,
    ButtonWrapper,
    Table
  },
  methods: {
    changePage (page) {
      this.tableData = this.records.slice((page - 1)*3, page*3 )
    }
  },
  data() {
    return {
      tableData: [],
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
            }
          ]
        },
        {
          date: '108/12/26',
          time: '12:14',
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
            }
          ]
        },
      ]
    }
  },
  mounted: function(){
    this.tableData = this.records.slice(0, 3);
  }
}
</script>
