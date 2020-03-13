<template>
  <div>
    <Modal v-if="!isError">
      <Header>
        <router-link to='./'>
          <CloseButton />
        </router-link>
        <Title textAlign='center'>客戶輪廓</Title>
      </Header>
      <main>
        <ProfileTable v-if="!isEdit && tableData != null">
          <tr>
            <th>特殊客戶</th>
            <td><TableList :data="tableData.SPC_STRING.split('、')" direction="column"/></td>
            <td class='profile__service'>
              <p>{{ dateParser(tableData.SPC_UPDATE_DTTM) }}</p>
              <p>{{ tableData.SPC_UPDATE_NAME }} ({{ tableData.SPC_UPDATE_DIV_NAME }})</p>
            </td>
          </tr>
          <tr>
            <th>特殊狀況備註</th>
            <td><TableList :data="tableData.SPECIAL_REASON" /></td>
            <td class='profile__service'>
              <p>{{ dateParser(tableData.SPECIAL_REASON_UPDATE_DTTM) }}</p>
              <p>{{ tableData.SPECIAL_REASON_UPDATE_NAME }} ({{ tableData.SPECIAL_REASON_UPDATE_DIV_NAME }})</p>
            </td>
          </tr>
          <tr>
            <th>特徵</th>
            <td><TableList field="featureStr" :toggleEdit="toggleEdit" 
              :data="tableData.FEATURE_STR.split('、')" /></td>
            <td class='profile__service'>
              <p>{{ dateParser(tableData.FEATURE_UPDATE_DTTM) }}</p>
              <p>{{ tableData.FEATURE_UPDATE_NAME }} ({{ tableData.FEATURE_UPDATE_DIV_NAME }})</p>
            </td>
          </tr>
          <tr>
            <th>集團員工</th>
            <td><TableList :data="tableData.EMPOLYEE" /></td>
            <td class='profile__service'>
              <p>{{ dateParser(tableData.EMPOLYEE_UPDATE_DTTM) }}</p>
              <p>{{ tableData.EMPOLYEE_UPDATE_NAME }} ({{ tableData.EMPOLYEE_UPDATE_DIV_NAME }})</p>
            </td>
          </tr>
          <tr>
            <th>客戶標籤</th>
            <td><TableList :data="tableData.TAG_STRING.split('、')" /></td>
            <td class='profile__service'>
              <p>{{ dateParser(tableData.TAG_UPDATE_DTTM) }}</p>
              <p>{{ tableData.TAG_UPDATE_NAME }} ({{ tableData.TAG_UPDATE_DIV_NAME }})</p>
            </td>
          </tr>
          <tr>
            <th>婚姻</th>
            <td><TableList field="marrige" :toggleEdit="toggleEdit" 
              :data="marrigeStatus[tableData.MARITAL_STATUS_CD]" /></td>
            <td class='profile__service'>
              <p>{{ dateParser(tableData.MARITAL_UPDATE_DTTM) }}</p>
              <p>{{ tableData.MARITAL_UPDATE_NAME }} ({{ tableData.MARITAL_UPDATE_DIV_NAME }})</p>
            </td>
          </tr>
          <tr>
            <th>子女</th>
            <td><TableList field="child" :toggleEdit="toggleEdit" 
              :data="Number(tableData.CHILDREN_CNT) ? '無小孩': `有小孩 ${tableData.CHILDREN_CNT} 位`" /></td>
            <td class='profile__service'>
              <p>{{ dateParser(tableData.CHILDREN_UPDATE_DTTM) }}</p>
              <p>{{ tableData.CHILDREN_UPDATE_NAME }} ({{ tableData.CHILDREN_UPDATE_DIV_NAME }})</p>
            </td>
          </tr>
          <tr>
            <th>年收入</th>
            <td><TableList field="salary" :toggleEdit="toggleEdit" 
              :data="salaryTrans(tableData.ANNUAL_INCOME_AMT)" /></td>
            <td class='profile__service'>
              <p>{{ dateParser(tableData.ANNUAL_INCOME_UPDATE_DTTM) }}</p>
              <p>{{ tableData.ANNUAL_INCOME_UPDATE_NAME }} ({{ tableData.ANNUAL_INCOME_UPDATE_DIV_NAME }})</p>
            </td>
          </tr>
          <tr>
            <th>學歷</th>
            <td><TableList field="education" :toggleEdit="toggleEdit" 
              :data="educationStatus[tableData.EDUCATION_LEVEL_CD]" /></td>
            <td class='profile__service'>
              <p>{{ dateParser(tableData.EDUCATION_UPDATE_DTTM) }}</p>
              <p>{{ tableData.EDUCATION_UPDATE_NAME }} ({{ tableData.EDUCATION_UPDATE_DIV_NAME }})</p>
            </td>
          </tr>
          <tr v-for="(interestKey, idx) in Object.keys(interestsData)" :key="idx" class='profile__interest'>
            <th v-if="!idx">興趣</th>
            <th v-if="idx"></th>
            <td>
              <p>{{ interestKey }}</p>
              <TableList :data="interestsData[interestKey]" />
            </td>
            <td class='profile__service'>
              <p>{{ dateParser(tableData.HOBBIES_UPDATE_DTTM) }}</p>
              <p>{{ tableData.HOBBIES_UPDATE_NAME }} ({{ tableData.HOBBIES_UPDATE_DIV_NAME }})</p>
            </td>
          </tr>
        </ProfileTable>
        <ProfileTable v-if="isEdit">
          <tr>
            <th>特殊狀況備註</th>
            <td class='profile__form'>
              <FormWrapper>
                <FormInput inputBasis="100%">
                  <input id="special-0" type="radio" name="special" />
                  <label for="special-0">無</label>
                </FormInput>
                <FormInput inputBasis="10%">
                  <input id="special-1" type="radio" name="special" />
                  <label for="special-1">有</label>
                </FormInput>
                <Textarea width="80%" v-model="form.spcString" />
              </FormWrapper>
            </td>
          </tr>
          <tr :class="`${highlightField === 'featureStr' ? 'highlight' : ''}`">
            <th>特徵</th>
            <td class='profile__form'>
              <ProfileFormWrapper>
                <FormInput inputBasis="33%" v-for="(option, idx) in userFields.featureStr" :key="idx">
                  <input :id="`featureStr-${idx}`" type="checkbox" :value="option" v-model="form.featureStr"/>
                  <label :for="`featureStr-${idx}`">{{ option }}</label>
                </FormInput> 
              </ProfileFormWrapper>
            </td>
          </tr>
          <tr :class="`${highlightField === 'marrige' ? 'highlight' : ''}`">
            <th>婚姻</th>
            <td class='profile__form'>
              <ProfileFormWrapper>
                <FormInput inputBasis="33%" v-for="(option, idx) in userFields.marrige" :key="idx">
                  <input :id="`marrige-${idx}`" type="radio" :value="option" v-model="form.marrige" />
                  <label :for="`marrige-${idx}`">{{ option }}</label>
                </FormInput> 
              </ProfileFormWrapper>
            </td>
          </tr>
          <tr :class="`${highlightField === 'child' ? 'highlight' : ''}`">
            <th>子女</th>
            <td class='profile__form'>
              <ProfileFormWrapper>
                <FormInput inputBasis="33%">
                  <input id="child-0" type="radio" :value="0" v-model="form.child" />
                  <label for="child-0">無小孩</label>
                </FormInput> 
               <FormInput inputBasis="33%">
                  <input id="child-1" type="radio" :value="1" v-model="form.child" />
                  <label for="child-1">有小孩</label>
                </FormInput> 
              </ProfileFormWrapper>
            </td>
          </tr>
          <tr :class="`${highlightField === 'salary' ? 'highlight' : ''}`">
            <th>年收入</th>
            <td class='profile__form'>
              <ProfileFormWrapper>
                <FormInput inputBasis="33%" v-for="(option, idx) in userFields.salary" :key="idx">
                  <input :id="`salary-${idx}`" type="radio" :value="option" v-model="form.salary" />
                  <label :for="`salary-${idx}`">{{ option }}</label>
                </FormInput> 
              </ProfileFormWrapper>
            </td>
          </tr>
          <tr :class="`${highlightField === 'education' ? 'highlight' : ''}`">
            <th>學歷</th>
            <td class='profile__form'>
              <ProfileFormWrapper>
                <FormInput inputBasis="33%" v-for="(option, idx) in userFields.education" :key="idx">
                  <input :id="`education-${idx}`" type="radio" :value="option" v-model="form.education"/>
                  <label :for="`education-${idx}`">{{ option }}</label>
                </FormInput> 
              </ProfileFormWrapper>
            </td>
          </tr>
          <tr v-for="(interestKey, idx) in Object.keys(interestFields)" 
            :key="idx" 
            class='profile__interest'
          >
            <th v-if="!idx">興趣</th>
            <th v-if="idx"></th>
            <td class='profile__form'>
              <p>{{ interestKey }}</p>
              <ProfileFormWrapper>
                <FormInput v-for="(option, idx) in interestFields[interestKey]" 
                  inputBasis="33%" :key="`interests-${idx}`">
                  <input type="checkbox" 
                    :id="`${interestKey}-${idx}`" 
                    :value="option" 
                    v-model="form.hobbies" 
                  />
                  <label :for="`${interestKey}-${idx}`">{{ option }}</label>
                </FormInput>
              </ProfileFormWrapper>
            </td>
          </tr>
        </ProfileTable>
      </main>
      <Footer>
        <ButtonWrapper>
          <Button v-if="!isEdit" :padding="50" @click="toggleEdit">編輯</Button>
          <Button v-if="isEdit" :padding="50" @click="sendForm">儲存</Button>
          <Button v-if="isEdit" bgColor="#616161" :padding="50" @click="toggleEdit">取消</Button>
        </ButtonWrapper>
      </Footer>
    </Modal>
    <ErrorModal v-if="isError">
      <Header>
        <router-link to='./'>
          <CloseButton/>
        </router-link>
      </Header>
      <main>
        <img src="../assets/img-error.svg" />
        <h2>Oops!</h2>
        <h2>執行操作時發生錯誤！</h2>
        <ButtonWrapper>
          <Button @click="refreshPage">重新載入</Button>
        </ButtonWrapper>
      </main>
    </ErrorModal>
  </div>
</template>

<script>
import { 
  Modal, 
  Title, 
  FormWrapper, 
  FormInput, 
  ButtonWrapper, 
  Button, 
  CloseButton, 
  Header, 
  Footer,
  ErrorModal } from '../style.js';
import styled from 'vue-styled-components';
import Textarea from './ui/textarea.vue';
import TableList from './ui/tableList.vue';


const profileTableProps = { isEdited: String }
const ProfileTable = styled('table', profileTableProps)`
  border-collapse: collapse;
  width: 90%;
  margin: 0 auto; 
  table-layout: fixed;
  p{
    margin: 0;
  } 
  .profile__interest {
    th {
      border-bottom: none;
    }
    td > p {
      margin-bottom: 15px;
    }
    &:last-child td {
      border-bottom: none;
    }
  }
  tr {
    vertical-align: top;
    &.highlight {
      background: rgba(227, 250, 250, 0.5);
    }
  }
  th {
    padding: 10px 0;
    margin-right: 20px;
    border-bottom: 1px solid grey;
    font-size: 18px;
    color: #324c5a;
    font-weight: bold;
    text-align: left;
    width: 80px;
  }
  td {
    padding: 10px;
    border-bottom: 1px solid grey;
    color: #324c5a;
    font-size: 16px;
    max-width: 70%;
    & > p {
      font-size: 14px;
      color: #628ea7;
    }
    &.profile__service {
      width: 180px;
      vertical-align: middle;
      p {
        margin: 0;
      }
    }
    &.profile__form {
      max-width: 70%;
    }
  }
`

const ProfileFormWrapper = styled(FormWrapper)`
  & div {
    margin-bottom: 10px;
  }
`

export default {
  name: 'Profile',
  props: {
    msg: String
  },
  components: {
    Modal,
    Title,
    ProfileTable,
    ButtonWrapper,
    Button,
    CloseButton,
    FormWrapper,
    FormInput,
    Header,
    Footer,
    ProfileFormWrapper,
    Textarea,
    TableList,
    ErrorModal
  },
  methods: {
    getData() {
      // fetch data in this method 
      this.queryData = {
        "AIE0_0500_bo": {
          "ADDR_WITHDRAW": "Y", 
          "IS_BRDY_IDENTICAL": "Y",
          "NETINSR_LV": "1",
          "NATION_CODE": "TW",
          "NPS_DATA_STRING": "109/02/26網路服務",
          "SPC_MARK": "Y",
          "IS_CALLIN": "Y",
          "RESN": "很不便利",
          "MOBL_NUM_CHG": "Y",
          "MEMO": "客戶於櫃檯詢問保單借款",
          "FINGER": "否",
          "ID": "E17434406C",
          "IS_ACNT": "Y",
          "FEATURE_STR": "慣用左手",
          "FEATURE_UPDATE_DIV_NAME": "忠孝服務二",
          "FEATURE_UPDATE_ID": "M12269641A", 
          "FEATURE_UPDATE_NAME": "余○珍", 
          "FEATURE_UPDATE_DTTM": "2019-11-21 00:00:00.0",
          "IS_NETINSR": "Y",
          "TAG_STRING": "旅遊族",
          "TAG_UPDATE_DIV_NAME": "忠孝服務二",
          "TAG_UPDATE_ID": "M12269641A", 
          "TAG_UPDATE_NAME": "余○珍", 
          "TAG_UPDATE_DTTM": "2019-11-21 00:00:00.0",
          "ADDR": "台北市內湖區芝麻街",
          "IS_INSD_SECOND": "N",
          "NAME": "蔡○男",
          "YK_BIRTHDAY": "1978-04-01",
          "SECRET_CLIENT": "Y",
          "IS_EASY_CALL": "Y",
          "SPECIAL_DATE": "108/02/28",
          "SPECIAL_RECORD": "Y",
          "SIGNATURE_RCPT_NO": " N002811720 ",
          "POLICY_NO": " 9122333539 ",
          "POLICY_NO_DATA": [],
          "SPC_STRING": "108/02/24法扣名單、108/01/26 申訴名單",
          "SPC_UPDATE_DIV_NAME": "忠孝服務二",
          "SPC_UPDATE_ID": "M12269641A", 
          "SPC_UPDATE_NAME": "余○珍", 
          "SPC_UPDATE_DTTM": "2019-11-21 00:00:00.0",
          "HOBBIES": "游泳、健身、籃球",
          "HOBBIES_UPDATE_DIV_NAME": "忠孝服務二",
          "HOBBIES_UPDATE_ID": "M12269641A", 
          "HOBBIES_UPDATE_NAME": "余○珍", 
          "HOBBIES_UPDATE_DTTM": "2019-11-21 00:00:00.0",
          "IS_BTWOC": "N",
          "IS_W0_DATA_CHECK": "A",
          "IS_NAME_IDENTICAL": "Y",
          "IS_INSD": "N",
          "LEVEL_CH": "高風險",
          "IS_ATM": "是",
          "ROLE": "A",
          "IS_APPEAL": "Y",
          "HTEL_NUM": "(02)26566999#9999",
          "SPECIAL_REASON": "一串文字",
          "SPECIAL_REASON_UPDATE_DIV_NAME": "忠孝服務二",
          "SPECIAL_REASON_UPDATE_ID": "M12269641A", 
          "SPECIAL_REASON_UPDATE_NAME": "余○珍", 
          "SPECIAL_REASON_UPDATE_DTTM": "2019-11-21 00:00:00.0",
          "EMAIL_WITHDRAW": "Y",
          "IS_RCPT": "",
          "mainList": [{
            "DVD_KIND": 0,
            "UN_CASH_TMS": 0,
            "SCRT_IND": "0",
            "INSD_ID": "E15366710L",
            "SEC_ISD_AGE": 0,
            "POL_PRD": 105,
            "MNXT_PAY_DATE": "2020-08-26",
            "ANTY_PAY_DATE": "1911-01-01",
            "EXT_YYMM": "0000",
            "PAY_TIMES": 1,
            "JOB_ID": "1",
            "MED_EXAM": 0,
            "FACE_AMT": 260,
            "PROD_ID": "U01",
            "ANTY_PRD": 0,
            "SEX": "1",
            "PAY_PRD": 6,
            "CLC_NO": "CU7A101",
            "FACE_AMT_UNIT": 4,
            "LST_CHG_DATE": "1911-01-01 00:00:00.0",
            "SICK_Y": 0,
            "LPS_DATE": "9999-12-31",
            "AUTO_PREM_CODE": 1,
            "RTN_TSO": "0",
            "PRE_PAY_IND": 0,
            "RPRT_TMS": 0,
            "EFT_CODE": "00",
            "LST_PAY_DATE": "2019-08-26",
            "LST_CHG_KIND": "00    ",
            "PAY_FREQ": 4,
            "AGE": 18,
            "RPRT_DATE": "1911-01-01",
            "NB_APLY_NO": "NC02916995",
            "ISSUE_DATE": "2019-08-26",
            "POLICY_NO": "9183246221",
            "ANTY_PAY_KIND": " ",
            "APC_ID": "E17434406C",
            "SALE_CHNL": "3",
            "PREM_SPEC_KEY2": "-1",
            "MAIN_PREM": 2086760,
            "PREM_SPEC_KEY1": "-1",
            "SETUP_DATE": "2019-08-27",
            "PRCS_IND": "00"
          }],
          "EMAIL": "s5f4s5f@gmail.com",
          "IS_ADDRESS_IDENTICAL": "Y",
          "IS_SIGNATURE": "Y",
          "CTEL_NUM": "(02)26566999#9999",
          "VIPBO": {
            "VIP": true,
            "VIPOF": false,
            "VIP_KIND": ["國泰世華銀行七星級VIP／本公司鑽石VIP(Hyper-VIP)"],
            "VIP_LVL": ["7"],
            "VIPF": false
          },
          "BIRTHDAY": "47/12/31", 
          "EMPOLYEE": "國泰人壽-壽險資訊部-協理", 
          "EMPOLYEE_UPDATE_DIV_NAME": "忠孝服務二",
          "EMPOLYEE_UPDATE_ID": "M12269641A", 
          "EMPOLYEE_UPDATE_NAME": "余○珍", 
          "EMPOLYEE_UPDATE_DTTM": "2019-11-21 00:00:00.0",
          "IS_ACNT_COUNT": 0,
          "AGE": "61",
          "IS_MOBILE_CNT_MORE_THAN_ONE": "1",
          "HTEL_NUM_CHG": "Y",
          "IS_EFT": "Y",
          "REQUEST": "無",
          "MOBL_NO": "0962513246",
          "EMAIL_CHG": "Y",
          "IS_MI": "Y",
          "ZODIAC": "虎",
          "IS_APC": "N",
          "isBirthday": "N",
          "CTEL_NUM_CHG": "N",
          "CONSTELLATION": "水瓶",
          "CHILDREN_SOURCE_CD": "公司網站會員資料",
          "RETURNCODE": "0000",
          "MARITAL_KEY": "123",
          "CHILDREN_UPDATE_DIV_NAME": "忠孝服務二", 
          "CHILDREN_UPDATE_ID": "M12269641A", 
          "CHILDREN_UPDATE_NAME": "余○珍", 
          "ANNUAL_INCOME_UPDATE_DTTM": "2019-11-21 00:00:00.0", 
          "ANNUAL_INCOME_AMT": "2500000",
          "FIRST_NM": "無○",
          "MARITAL_UPDATE_DIV_NAME": "忠孝服務二",
          "MARITAL_UPDATE_ID": "M12269641A", 
          "MARITAL_UPDATE_NAME": "余○珍", 
          "MARITAL_UPDATE_DTTM": "2019-11-21 00:00:00.0",
          "EDUCATION_KEY": "",
          "STD_OCCUPATION_NM": "廚具商",
          "PROCESSED_DTTM": "2019-11-21 00:00:00.0",
          "OCCUPATION_UPDATE_ID": "",
          "EDUCATION_UPDATE_DIV_NAME": "忠孝服務二",
          "EDUCATION_UPDATE_ID": " M12269641A ",
          "EDUCATION_UPDATE_NAME": "余○珍",
          "MARITAL_STATUS_CD": "1",
          "CHILDREN_POLICY_NO": "333",
          "ANNUAL_INCOME_UPDATE_DIV_NAME": "忠孝服務二",
          "ANNUAL_INCOME_UPDATE_ID": "M12269641A",
          "ANNUAL_INCOME_UPDATE_NAME": "余○珍",
          "MARITAL_POLICY_NO": "123",
          "OCCUPATION_TITLE": "BOSS",
          "CHILDREN_CNT": "3",
          "OCCUPATION_UPDATE_DTTM": "2019-11-21 00:00:00.0",
          "EDUCATION_SOURCE_CD": "保全變更(線上服務)",
          "MARITAL_SOURCE_CD": "3",
          "ANNUAL_INCOME_SOURCE_CD": "0800", 
          "STD_OCCUPATION_CD": "15000010",
          "ANNUAL_INCOME_POLICY_NO": "",
          "EDUCATION_POLICY_NO": "",
          "CHILDREN_KEY": "222",
          "OCCUPATION_POLICY_NO": "",
          "OCCUPATION_KEY": "",
          "CODEMSG": "查詢成功",
          "CHILDREN_UPDATE_DTTM": "2019-11-21 00:00:00.0",
          "ANNUAL_INCOME_KEY": "",
          "EDUCATION_UPDATE_DTTM": "2019-11-21 00:00:00.0",
          "OCCUPATION_CLASS_CD": "4",
          "OCCUPATION_COMPANY": "大數",
          "OCCUPATION_SOURCE_CD": "4",
          "EDUCATION_LEVEL_CD": "2"
        },
        "ErrMsg": {
          "returnCode": 0,
          "msgid": "",
          "displayException": "",
          "msgDesc": "",
          "displayMsgDescs": "",
          "length": 1,
          "type": "",
          "sysid": "",
          "msgDescs": [""],
          "url": ""
        },
          "eBAF_UserObject_Flag": "bC9ET3NaS0p4eE5WaFdFWmN3QWNOZz09",
          "eBAF_loginSystemInfo": "a%2B%2FhFBbiquGH%2F1%2FUlm7W2qOIA8ZFukaslTfOJLKR24omGREBfdXQmPd542aw5PJr"
      }
      if(this.queryData.ErrMsg.returnCode === 0) {
        this.tableData = this.queryData.AIE0_0500_bo
        this.groupHobbies();
        console.log(this.tableData)  
      } else {
        this.isError = true;
      }
    },
    groupHobbies() {
      this.interestsData = this.tableData.HOBBIES.split('、').reduce((acc, hobby) => {
        let key = Object.keys(this.interestFields).filter(item => this.interestFields[item].includes(hobby))[0] || '其他';
        (acc[key] = acc[key] || []).push(hobby);
        return acc;
      }, {});
    },
    sendForm() {
      this.toggleEdit();
    },
    toggleEdit(field = null) {
      if(field) {
        this.highlightField = field;
      } else {
        this.highlightField = '';
      }
      this.isEdit = !this.isEdit;
    },
    refreshPage() {
      this.$router.go({
        path: '/',
        force: true
      })
    },
    salaryTrans(salaryStr) {
      const salaryNum = Number(salaryStr);
      if(salaryNum < 310000) return '30萬以下';
      else if(salaryNum >= 310000 && salaryNum < 610000) return '31-60萬';
      else if(salaryNum >= 610000 && salaryNum < 1010000) return '61-100萬';
      else if(salaryNum >= 1010000 && salaryNum < 2010000) return '101-200萬';
      else return '201 萬以上'; 
    },
    dateParser(timeStr) {
      if(timeStr) return `${timeStr.split(' ')[0]} ${timeStr.split(' ')[1].split(':').slice(0, 2).join(':')}`;
      else timeStr; 
    }
  },
  data () {
    return {
      isError: false,
      isEdit: false,
      highlightField: '',
      tableData: null,
      queryData: null,
      interestsData: null,
      educationStatus:{
        "1": "國中及以下",
        "2": "高中職",
        "3": "大學專科",
        "4": "研究所以上"
      },
      marrigeStatus: {
        "0": "未婚",
        "1": "已婚",
        "2": "其他"
      },
      form: {
        specialReason: '',
        featureStr: [],
        tagStr: '',
        marrige: '',
        child: 0,
        salary: '',
        education: '',
        hobbies: []
      },
      userFields: {
        'specialReason': '',
        'featureStr': ['慣用左手','慣用右手', '雙目失明', '不識字', '失憶'],
        'tagStr': ['旅遊愛好', '新手爸媽'],
        'marrige': ['單身', '已婚'],
        'salary': ['30萬以下', '31-60萬', '61-100萬', '101-200萬', '201 萬以上'],
        'education': ['國中以下', '高中職', '大學/專科', '研究所以上']
      },
      interestFields: {
        '運動': ['跑步','登山', '健走', '健身', '瑜伽', '跳舞', '籃球', '棒球', '高爾夫'],
        '休閒娛樂': ['旅遊愛好', '文青藝文', '手遊電競', '音樂/電影/追劇', '寵物迷', '親子議題', '環保公益', '健身保健'],
        '美食': ['咖啡', '手搖飲', '酒', '甜點', '健康飲食', '吃貨'],
        '購物': ['網購族', '購物優惠', '精品', '美妝衣飾', '3C迷'],
        '財富管理': ['慈善樂捐', '保險保障規劃', '股票基金', '定存儲蓄', '外幣交易', '房地產', '稅務規劃']
      }
    }
  },
  mounted: function(){
    this.getData();
  }
}
</script>
