<template>
  <div>
    <Loading v-if="isLoading" />
    <HomeLayout v-if="!isLoading">
      <div class="time">
        00:08:14
        <div class="time__tooltip">已服務時間</div>
      </div>
      <ProfileSection v-if="user !== null" :user="user" :service="service"/>
      <MarketSection :market="market" />
      <SuggestSection :service="suggest.service" :product="suggest.product"/>
    </HomeLayout>
  </div>
</template>

<script>
import ProfileSection from './profileSection.vue';
import MarketSection from './marketSection.vue';
import SuggestSection from './suggestSection.vue';
import styled from 'vue-styled-components';
import homeProfile from '../data/homeProfile.json';
import Loading from "./ui/loading.vue";

const HomeLayout = styled.div`
  background: #d2f8f3;
  width: 100%;
  height: 100%;
  border: solid 1px #000;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
  padding: 10px 0;
  .time {
    position: absolute; 
    font-size: 14px;
    top: 0;
    right: 0;
    background: #616161;
    color: white;
    padding: 3px 3px 3px 10px;
    border-bottom-left-radius: 15px;
    cursor: pointer;   
    .time__tooltip {
      visibility: hidden;
      position: absolute;
      margin-top: 10px;
      margin-left: -50px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 12px;
      color: #324c5a;
      background: white; 
      box-shadow: 0 6px 15px 0 rgba(128, 197, 197, 0.72);
      padding: 2px 5px;
      width: 105px;
      height: 40px;
    }
    &:hover {
      .time__tooltip {
        visibility: visible;
      }
    }
  } 
`

export default {
  name: 'Home',
  methods: {
    getData() {
      // const educationStatus = {
      //   "1": "國中及以下",
      //   "2": "高中職",
      //   "3": "大學專科",
      //   "4": "研究所以上"
      // }
      // const marrigeStatus = {
      //   "0": "未婚",
      //   "1": "已婚",
      //   "2": "其他"
      // }
      

      // ajax demo

      // this.isLoading = true;
      // fetch("http://localhost:3000/homeProfile")
      //   .then(res => res.json())
      //   .then(data => {
      //     this.queryData = data;
      //     if(this.queryData.ErrMsg.returnCode === 0) {
      //       // profile data show order 
      //       const data = {
      //           "特殊客戶": this.queryData.AIE0_0500_bo.SPC_STRING,
      //           "特殊狀態備註": this.queryData.AIE0_0500_bo.SPECIAL_RECORD === "Y" ? "有" : "沒有",
      //           "客戶特徵": this.queryData.AIE0_0500_bo.FEATURE_STR,
      //           "集團員工": this.queryData.AIE0_0500_bo.EMPOLYEE,
      //           "客戶標籤": this.queryData.AIE0_0500_bo.TAG_STRING,
      //           "婚姻": marrigeStatus[this.queryData.AIE0_0500_bo.MARITAL_STATUS_CD],
      //           "子女": this.queryData.AIE0_0500_bo.CHILDREN_CNT,
      //           "年收入": this.queryData.AIE0_0500_bo.ANNUAL_INCOME_AMT,
      //           "學歷": educationStatus[this.queryData.AIE0_0500_bo.EDUCATION_LEVEL_CD],
      //           "興趣": this.queryData.AIE0_0500_bo.HOBBIES,
      //         }

      //       const info = Object.keys(data).filter(item => data[item]).slice(0, 4).reduce((acc, item) => {
      //             acc[item] = data[item];
      //             return acc;
      //           }, {})

      //       this.user = {
      //         name: this.queryData.AIE0_0500_bo.NAME,
      //         age: this.queryData.AIE0_0500_bo.AGE,
      //         info,
      //         isSecret: this.queryData.AIE0_0500_bo.SECRET_CLIENT,
      //         isBirthday: this.queryData.AIE0_0500_bo.isBirthday,
      //         isVip: this.queryData.AIE0_0500_bo.VIPBO.VIP,
      //       }
      //     } else {
      //       this.isError = true;
      //     }
      //     this.isLoading = false;
      //   })
      //   .catch(err => {
      //     console.log(err);
      //     this.isError = true;
      //     this.isLoading = false;
      //   }) 

      // static json demo 
      this.queryData = homeProfile;
      if(this.queryData.ErrMsg.returnCode === 0) {
        // profile data show order 
        const data = {
            "特殊客戶": this.queryData.AIE0_0500_bo.SPC_STRING,
            "特殊狀態備註": this.queryData.AIE0_0500_bo.SPECIAL_RECORD === "Y" ? "有" : "沒有",
            // "客戶特徵": this.queryData.AIE0_0500_bo.FEATURE_STR,
            // "集團員工": this.queryData.AIE0_0500_bo.EMPOLYEE,
            // "客戶標籤": this.queryData.AIE0_0500_bo.TAG_STRING,
            // "婚姻": marrigeStatus[this.queryData.AIE0_0500_bo.MARITAL_STATUS_CD],
            // "子女": this.queryData.AIE0_0500_bo.CHILDREN_CNT,
            // "年收入": this.queryData.AIE0_0500_bo.ANNUAL_INCOME_AMT,
            // "學歷": educationStatus[this.queryData.AIE0_0500_bo.EDUCATION_LEVEL_CD],
            // "興趣": this.queryData.AIE0_0500_bo.HOBBIES,
          }

        const info = Object.keys(data).filter(item => data[item]).slice(0, 4).reduce((acc, item) => {
              acc[item] = data[item];
              return acc;
            }, {})

        this.user = {
          name: this.queryData.AIE0_0500_bo.NAME,
          age: this.queryData.AIE0_0500_bo.AGE,
          info,
          isSecret: this.queryData.AIE0_0500_bo.SECRET_CLIENT,
          isBirthday: this.queryData.AIE0_0500_bo.isBirthday,
          isVip: this.queryData.AIE0_0500_bo.VIPBO.VIP,
        }
      } else {
        this.isError = true;
      }
    }
  },
  data() {
    return {
      isLoading: false,
      queryData: null,
      user: null,
      service: {
        date: '108/12/26',
        time: '10:36',
        route: '0800 進線',
        note: '申請 ATM 保單借款'
      },
      market: {
        date: '108/12/26',
        time: '10:36',
        owner: '陳世華',
        place: '世界服務中心',
        data: [
          {
            state: 1,
            note: '申辦網路服務'
          },
          {
            state: 2,
            note: '申辦網路服務'
          },
          {
            state: 3,
            note: '申辦網路服務'
          }
        ]
      },
      suggest: {
        service: [
          // {
          //   id: 1,
          //   title: '申辦網路服務',
          //   state: 1,
          // },
          // {
          //   id: 2,
          //   title: '申辦電子單據',
          //   state: 2,
          // },
          // {
          //   id: 3,
          //   title: '申辦網路服務',
          //   state: 3,
          // },
          // {
          //   id: 4,
          //   title: '申辦網路服務',
          //   state: 1,
          // },
          // {
          //   id: 5,
          //   title: '申辦電子單據',
          //   state: 2,
          // },
          // {
          //   id: 6,
          //   title: '申辦電子單據',
          //   state: 0,
          // }
        ],
        product: [
          {
            id: 1,
            title: '意外附約升級',
            state: 0,
          },
          {
            id: 2,
            title: '意外附約目標客戶',
            state: 2,
          },
          {
            id: 3,
            title: '意外附約升級',
            state: 3,
          },
          {
            id: 4,
            title: '意外附約目標客戶',
            state: 2,
          },
          {
            id: 5,
            title: '意外附約目標客戶',
            state: 1,
          },
          {
            id: 6,
            title: '意外附約升級',
            state: 1,
          }
        ]
      }
    }
  },
  components: {
    ProfileSection,
    MarketSection,
    SuggestSection,
    HomeLayout,
    Loading
  },
  mounted: function(){
    this.getData();
  }
}
</script>
