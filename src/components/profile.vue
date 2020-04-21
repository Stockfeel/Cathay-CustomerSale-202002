<template>
  <div>
    <Loading v-if="isLoading" />
    <div v-if="!isLoading">
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
              <td v-if="Object.keys(tableData.spcMap).length > 0">
                <TableList :data="Object.keys(tableData.spcMap).map(item => `${tableData.spcMap[item].SPC_NAME} ${spcStatus[item]}`)" direction="column"/>
              </td>
              <td v-else>
                <p class="nodata">尚無資料，詢問搜集輪廓吧！
                  <Icon 
                    :iconUrl="require('../assets/icon-edit-edit-green.svg')" 
                    :size="20" 
                    @click="() => isEdit = !isEdit"
                  />
                </p>
              </td>
              <td class='profile__service'>
              </td>
            </tr>
            <tr>
              <th>特殊狀況備註</th>
              <td v-if="tableData.spcMemoMap.MEMO"><TableList :data="tableData.spcMemoMap.MEMO" /></td>
              <td v-else>
                <p class="nodata">尚無資料，詢問搜集輪廓吧！
                  <Icon 
                    :iconUrl="require('../assets/icon-edit-edit-green.svg')" 
                    :size="20" 
                    @click="() => isEdit = !isEdit"
                  />
                </p>
              </td>
              <td class='profile__service'>
                <p>{{ dateParser(tableData.spcMemoMap.INPUT_DATE) }}</p>
                <p>{{ tableData.spcMemoMap.INPUT_NAME }} ({{ tableData.spcMemoMap.SER_DIV_NAME }})</p>
              </td>
            </tr>
            <tr>
              <th>特徵</th>
              <td v-if="tableData.featureList"><TableList field="featureStr" :toggleEdit="toggleEdit" 
                :data="tableData.featureList.map(item => featuresStauts[item])" /></td>
              <td v-else>
                <p class="nodata">尚無資料，詢問搜集輪廓吧！
                  <Icon 
                    :iconUrl="require('../assets/icon-edit-edit-green.svg')" 
                    :size="20" 
                    @click="() => isEdit = !isEdit"
                  />
                </p>
              </td>
              <td class='profile__service'>
                <p>{{ dateParser(tableData.latestFeatureMap.INPUT_DATE) }}</p>
                <p>{{ tableData.latestFeatureMap.INPUT_NAME }} ({{ tableData.latestFeatureMap.SER_DIV_NAME }})</p>
              </td>
            </tr>
            <tr>
              <th>集團員工</th>
              <td v-if="tableData.EMPOLYEE"><TableList :data="tableData.EMPOLYEE" /></td>
              <td v-else>
                <p class="nodata">尚無資料，詢問搜集輪廓吧！
                  <Icon 
                    :iconUrl="require('../assets/icon-edit-edit-green.svg')" 
                    :size="20" 
                    @click="() => isEdit = !isEdit"
                  />
                </p>
              </td>
              <td class='profile__service'>
              </td>
            </tr>
            <tr>
              <th>客戶標籤</th>
              <td v-if="tableData.tagList"><TableList :data="tableData.tagList.map(item => item.TAG_NAME)" direction="column"/></td>
              <td v-else>
                <p class="nodata">尚無資料，詢問搜集輪廓吧！
                  <Icon 
                    :iconUrl="require('../assets/icon-edit-edit-green.svg')" 
                    :size="20" 
                    @click="() => isEdit = !isEdit"
                  />
                </p>
              </td>
              <td class='profile__service'>
              </td>
            </tr>
            <tr>
              <th>婚姻</th>
              <td v-if="marrigeStatus[tableData.indivInfoMap.MARITAL_STATUS_CD]">
                <TableList 
                  field="marrige" 
                  :toggleEdit="toggleEdit" 
                  :data="marrigeStatus[tableData.indivInfoMap.MARITAL_STATUS_CD]" 
                /></td>
              <td v-else>
                <p class="nodata">尚無資料，詢問搜集輪廓吧！
                  <Icon 
                    :iconUrl="require('../assets/icon-edit-edit-green.svg')" 
                    :size="20" 
                    @click="() => isEdit = !isEdit"
                  />
                </p>
              </td>
              <td class='profile__service'>
                <p>{{ dateParser(tableData.indivInfoMap.MARITAL_UPDATE_DTTM) }}</p>
                <p>{{ tableData.indivInfoMap.MARITAL_UPDATE_NAME }} ({{ tableData.indivInfoMap.MARITAL_UPDATE_DIV_NAME }})</p>
              </td>
            </tr>
            <tr>
              <th>子女</th>
              <td v-if="tableData.indivInfoMap.CHILDREN_CNT"><TableList field="child" :toggleEdit="toggleEdit" 
                :data="Number(tableData.indivInfoMap.CHILDREN_CNT) ? '無小孩': `有小孩 ${tableData.indivInfoMap.CHILDREN_CNT} 位`" /></td>
              <td v-else>
                <p class="nodata">尚無資料，詢問搜集輪廓吧！
                  <Icon 
                    :iconUrl="require('../assets/icon-edit-edit-green.svg')" 
                    :size="20" 
                    @click="() => isEdit = !isEdit"
                  />
                </p>
              </td>
              <td class='profile__service'>
                <p>{{ dateParser(tableData.indivInfoMap.CHILDREN_UPDATE_DTTM) }}</p>
                <p>{{ tableData.indivInfoMap.CHILDREN_UPDATE_NAME }} ({{ tableData.indivInfoMap.CHILDREN_UPDATE_DIV_NAME }})</p>
              </td>
            </tr>
            <tr>
              <th>年收入</th>
              <td v-if="tableData.indivInfoMap.ANNUAL_INCOME_AMT"><TableList field="salary" :toggleEdit="toggleEdit" 
                :data="salaryTrans(tableData.indivInfoMap.ANNUAL_INCOME_AMT)" /></td>
              <td v-else>
                <p class="nodata">尚無資料，詢問搜集輪廓吧！
                  <Icon 
                    :iconUrl="require('../assets/icon-edit-edit-green.svg')" 
                    :size="20" 
                    @click="() => isEdit = !isEdit"
                  />
                </p>
              </td>
              <td class='profile__service'>
                <p>{{ dateParser(tableData.indivInfoMap.ANNUAL_INCOME_UPDATE_DTTM) }}</p>
                <p>{{ tableData.indivInfoMap.ANNUAL_INCOME_UPDATE_NAME }} ({{ tableData.indivInfoMap.ANNUAL_INCOME_UPDATE_DIV_NAME }})</p>
              </td>
            </tr>
            <tr>
              <th>學歷</th>
              <td v-if="educationStatus[tableData.indivInfoMap.EDUCATION_LEVEL_CD]">
                <TableList field="education" :toggleEdit="toggleEdit" 
                :data="educationStatus[tableData.indivInfoMap.EDUCATION_LEVEL_CD]" />
              </td>
              <td v-else>
                <p class="nodata">尚無資料，詢問搜集輪廓吧！
                  <Icon 
                    :iconUrl="require('../assets/icon-edit-edit-green.svg')" 
                    :size="20" 
                    @click="() => isEdit = !isEdit"
                  />
                </p>
              </td>
              <td class='profile__service'>
                <p>{{ dateParser(tableData.indivInfoMap.EDUCATION_UPDATE_DTTM) }}</p>
                <p>{{ tableData.indivInfoMap.EDUCATION_UPDATE_NAME }} ({{ tableData.indivInfoMap.EDUCATION_UPDATE_DIV_NAME }})</p>
              </td>
            </tr>
            <tr v-for="(interestKey, idx) in Object.keys(interestsData)" :key="idx" class='profile__interest'>
              <th v-if="!idx">興趣</th>
              <th v-if="idx"></th>
              <td v-if="interestsData[interestKey]" >
                <p>{{ interestKey }}</p>
                <TableList :data="interestsData[interestKey]" />
              </td>
              <td v-else>
                <p class="nodata interst">尚無資料，詢問搜集輪廓吧！
                  <Icon 
                    :iconUrl="require('../assets/icon-edit-edit-green.svg')" 
                    :size="20" 
                    @click="() => isEdit = !isEdit"
                  />
                </p>
              </td>
              <td class='profile__service'>
                <p>{{ dateParser(tableData.latestHobbiesMap.INPUT_DATE) }}</p>
                <p>{{ tableData.latestHobbiesMap.INPUT_NAME }} ({{ tableData.latestHobbiesMap.SER_DIV_NAME }})</p>
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
                 <FormInput inputBasis="20%">
                    <input id="child-1" type="radio" :value="1" v-model="form.child" />
                    <label for="child-1">有小孩</label>
                  </FormInput> 
                 <FormInput inputBasis="23%">
                    <label class="inline-label" for="child-nonadult">成年</label>
                    <input class="inline-input" id="child-nonadult" type="text" />
                  </FormInput> 
                 <FormInput inputBasis="23%">
                    <label class="inline-label" for="child-adult">未成年</label>
                    <input class="inline-input" id="child-adult" type="text" />
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
  ErrorModal,
  Icon } from '../style.js';
import styled from 'vue-styled-components';
import Textarea from './ui/textarea.vue';
import TableList from './ui/tableList.vue';
import Loading from './ui/loading.vue';
import data from '../data/profile.json';

const profileTableProps = { isEdited: String }
const ProfileTable = styled('table', profileTableProps)`
  border-collapse: collapse;
  width: 90%;
  margin: 0 auto; 
  table-layout: fixed;
  .nodata {
    color: #05b077;
    display: flex;
    align-items: center;
  }
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
      width: 140px;
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
    ErrorModal,
    Loading,
    Icon
  },
  methods: {
    getData() {
      this.queryData = data;
      if(this.queryData.ErrMsg.returnCode === 0) {
        this.tableData = this.queryData.perDataMoreMap
        this.groupHobbies();
      } else {
        this.isError = true;
      }
    },
    groupHobbies() {
      const hobbies = {
        "L010001": "籃球",
        "L010002": "棒球",
        "L010003": "高爾夫",
        "L010004": "健身瑜珈跳舞",
        "L010005": "跑步登山健走",
        "L020001": "旅遊愛好",
        "L020002": "文青藝文",
        "L020003": "手遊電競",
        "L020004": "音樂電影追劇",
        "L020005": "寵物迷",
        "L020006": "親子議題",
        "L020007": "環保公益",
        "L020008": "養身保健",
        "L030001": "咖啡",
        "L030002": "手搖飲",
        "L030003": "酒",
        "L030004": "甜點",
        "L030005": "吃貨",
        "L030006": "美食烹飪",
        "L040001": "購物信用卡優惠",
        "L040002": "3C迷",
        "L040003": "汽機車迷",
        "L050001": "保險",
        "L050002": "活/定存",
        "L050003": "股票",
        "L050004": "民間互助會",
        "L050005": "基金",
        "L050006": "不動產",
        "L050007": "期貨外匯",
        "L050008": "其他"
      }
      const category = {
        "L01": "運動",
        "L02": "休閒娛樂",
        "L03": "美食",
        "L04": "購物",
        "L05": "理財工具",
      }
      this.interestsData = this.tableData.hobbiesList.reduce((acc, hobby) => {
        let key = category[hobby.slice(0,3)];
        (acc[key] = acc[key] || []).push(hobbies[hobby]);
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
      isLoading: false,
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
      featuresStauts: {
        "S030001": "慣用左手",
        "S030002": "慣用右手",
        "S030003": "失聰",
        "S030004": "不識字",
        "S030005": "雙目失明",
      },
      spcStatus: {
        "B99001Map": "特殊保戶群組",
        "B99010Map": "拒絕行銷名單",
        "B99013Map": "申訴名單", 
        "B99004Map": "新契約不受歡迎名單",
        "B99009Map": "理賠控管保戶名單",
        "B99005Map": "法扣名單"
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
    this.isEdit = this.$route.query.edit;
  }
}
</script>
