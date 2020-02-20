<template>
  <Modal>
    <router-link to='./'>
      <CloseButton/>
    </router-link>
    <Title textAlign='center'>客戶輪廓</Title>
    <main>
      <ProfileTable v-if="!isEdit">
        <tr v-for="(userClass, idx) in Object.keys(user)" :key="`user-${idx}`">
          <th>{{ user[userClass].class }}</th>
          <td>
            <List listDirection='row'>
              <ListItem v-for="(item, idx) in user[userClass].data" :key="idx">{{ item }} </ListItem>
            </List>
          </td>
          <td class='profile__service'>
            <p>{{user[userClass].updateTime}}</p>
            <p>{{user[userClass].author}} ({{user[userClass].place}})</p>
          </td>
        </tr>
        <tr v-for="(interestKey, idx) in Object.keys(interests.data)" :key="`interests-${idx}`" class='profile__interest'>
          <th v-if="!idx">{{ interestsOptions.class }}</th>
          <th v-if="idx"></th>
          <td>
            <p>{{ interests.data[interestKey].class }}</p>
            <List listDirection='row'>
              <ListItem v-for="(item, idx) in interests.data[interestKey].data" 
                listBasis="40%" :key="idx"> 
            {{ item }} </ListItem>
            </List>
          </td>
          <td class='profile__service'>
            <p>{{ interests.data[interestKey].updateTime }}</p>
            <p>{{ interests.data[interestKey].author }} ({{ interests.data[interestKey].place }})</p> 
          </td>
        </tr>
      </ProfileTable>
      <ProfileTable v-if="isEdit">
        <tr>
          <th>特殊狀況備註</th>
          <td>
            <FormWrapper>
              <FormInput inputBasis="100%">
                <input id="special-0" type="radio" name="special" />
                <label for="special-0">無</label>
              </FormInput>
              <FormInput inputBasis="10%">
                <input id="special-1" type="radio" name="special" />
                <label for="special-1">有</label>
              </FormInput>
              <FormInput inputBasis="80%">
                <textarea id="special-2" type="text" name="special"></textarea>
              </FormInput>
            </FormWrapper>
          </td>
        </tr>
        <tr v-for="(userClass, idx) in Object.keys(userOptions)" :key="`userOption-${idx}`">
          <th>{{ userOptions[userClass].class }}</th>
          <td>
            <FormWrapper>
              <FormInput v-for="(item, idx) in userOptions[userClass].data" 
                inputBasis="33%" :key="idx">
                <input :type="userOptions[userClass].type" :name="userClass" 
                  :id="`${userClass}-${idx}`" :value="item" v-model="form[userClass]"/>
                <label :for="`${userClass}-${idx}`" v-if="userOptions[userClass].type !== 'text'">{{ item }}</label>
              </FormInput>
            </FormWrapper>
          </td>
        </tr>
        <tr v-for="(interestKey, idx) in Object.keys(interestsOptions.data)" 
          :key="idx" class='profile__interest'>
          <th v-if="!idx">{{ interestsOptions.class }}</th>
          <th v-if="idx"></th>
          <td>
            <p>{{ interestsOptions.data[interestKey].class }}</p>
            <FormWrapper>
              <FormInput v-for="(item, idx) in interestsOptions.data[interestKey].data" 
                inputBasis="33%" :key="`interestOption-${idx}`">
                <input type="checkbox" :name="interestKey" 
                  :id="`${interestKey}-${idx}`" :value="item" />
                <label :for="`${interestKey}-${idx}`">{{ item }}</label>
              </FormInput>
            </FormWrapper>
          </td>
        </tr>
      </ProfileTable>
    </main>
    <ButtonWrapper>
      <Button v-on:click="isEdit = !isEdit" v-if="!isEdit">編輯</Button>
      <Button v-on:click="isEdit = !isEdit" v-if="isEdit">儲存</Button>
      <Button v-on:click="isEdit = !isEdit" v-if="isEdit" bgColor="#616161">取消</Button>
    </ButtonWrapper>
  </Modal>
</template>

<script>
import { List, ListItem, Modal, Title, FormWrapper, FormInput, ButtonWrapper, Button, CloseButton } from '../style.js';
import styled from 'vue-styled-components';

const profileTableProps = { isEdited: String }
const ProfileTable = styled('table', profileTableProps)`
  border-collapse: collapse;
  width: 90%;
  margin: 0 auto; 
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
    & > p {
      font-size: 14px;
      color: #628ea7;
    }
    &.profile__service {
      width: 180px;
    }
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
    List, 
    ListItem,
  },
  data () {
    return {
      isEdit: false,
      form: {
        specialNotes: '情緒不穩定，於櫃檯咆哮並怒罵客服人員',
        features: ['慣用左手', '慣用左手', '雙目失明'],
        tags: ['旅遊愛好'],
        marrige: '單身',
        child: 0,
        salary: '201 萬以上',
        education: '研究所以上'
      },
      userOptions: {
        features: {
          class: '特徵',
          type: 'checkbox',
          data: ['慣用左手','慣用左手', '雙目失明', '不識字', '失憶'], 
        },
        marrige: {
          class: '婚姻',
          type: 'radio',
          data: ['單身', '已婚'],
        },
        child: {
          class: '子女',
          type: 'radio',
          data: ['無小孩', '有小孩'],
        },
        salary: {
          class: '年收入',
          type: 'radio',
          data: ['30萬以下', '31-60萬', '61-100萬', '101-200萬', '201 萬以上'],
        },
        education: {
          class: '學歷',
          type: 'radio',
          data: ['國中以下', '高中職', '大學/專科', '研究所以上'],
        }
      },
      interestsOptions: {
        class: '興趣',
        data: {
          exercises: {
            type: 'checkbox',
            class: '運動',
            data: ['跑步', '登山', '健走', '健身', '登山', '健走', '籃球', '登山', '高爾夫']
          },
          entertainment: {
            type: 'checkbox',
            class: '休閒娛樂',
            data: ['旅遊愛好', '文青藝文', '手遊電競', '音樂/電影/追劇', '寵物迷', '親子議題', '環保公益', '健身保健']
          },
          foods: {
            type: 'checkbox',
            class: '美食',
            data: ['咖啡', '手搖飲', '酒', '甜點', '健康飲食', '吃貨'] 
          },
          shop: {
            type: 'checkbox',
            class: '購物',
            data: ['網購族', '購物優惠', '精品', '美妝衣飾', '3C迷'] 
          },
          finance: {
            type: 'checkbox',
            class: '財富管理',
            data: ['慈善樂捐', '保險保障規劃', '股票基金', '定存儲蓄', '外幣交易', '房地產', '稅務規劃'] 
          },
        },
      },
      user: {
        specials: {
          class: '特殊客戶',
          author: '陳世華',
          place: '世界服務中心',
          updateTime: '108/12/26/10:36',
          data: ['XXX/XX/XX 申訴名單'],
        },
        specialNotes: {
          class: '特殊狀況備註',
          author: '陳世華',
          place: '世界服務中心',
          updateTime: '108/12/26/10:36',
          data: ['情緒不穩定，於櫃檯咆哮並怒罵客服人員'], 
        },
        features: {
          class: '特徵',
          author: '陳世華',
          place: '世界服務中心',
          updateTime: '108/12/26/10:36',
          data: ['慣用左手','不識字'], 
        },
        employee: {
          class: '集團員工',
          author: '陳世華',
          place: '世界服務中心',
          updateTime: '108/12/26/10:36',
          data: ['國壽副總'], 
        },
        tags: {
          class: '客戶標籤',
          author: '陳世華',
          place: '世界服務中心',
          updateTime: '108/12/26/10:36',
          data: ['旅遊愛好','新手爸媽'],
        },
        marrige: {
          class: '婚姻',
          author: '陳世華',
          place: '世界服務中心',
          updateTime: '108/12/26/10:36',
          data: ['單身'],
        },
        child: {
          class: '子女',
          author: '陳世華',
          place: '世界服務中心',
          updateTime: '108/12/26/10:36',
          data: ['有小孩'],
        },
        salary: {
          class: '年收入',
          author: '陳世華',
          place: '世界服務中心',
          updateTime: '108/12/26/10:36',
          data: ['201 萬以上'],
        },
        education: {
          class: '學歷',
          author: '陳世華',
          place: '世界服務中心',
          updateTime: '108/12/26/10:36',
          data: ['研究所以上'],
        }
      },
      interests: {
        class: '興趣',
        author: '陳世華',
        place: '世界服務中心',
        updateTime: '108/12/26/10:36',
        data: {
          foods: {
            class: '美食',
            author: '陳世華',
            place: '世界服務中心',
            updateTime: '108/12/26/10:36',
            data: ['咖啡', '手搖飲', '酒', '甜點', '健康飲食', '吃貨'] 
          },
          exercises: {
            class: '運動',
            author: '陳世華',
            place: '世界服務中心',
            updateTime: '108/12/26/10:36',
            data: ['籃球', '棒球']
          }
        },
      },
    }
  },
}
</script>
