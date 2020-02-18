<template>
  <Modal>
    <router-link to='./'>
      <CloseButton/>
    </router-link>
    <Title textAlign='center'>客戶輪廓</Title>
    <ProfileLayout v-if="!isEdit">
      <tr v-for="(userClass, idx) in Object.keys(user)" :key="idx">
        <th>{{ user[userClass].class }}</th>
        <td>
          <List listDirection='row'>
            <ListItem v-for="(item, idx) in user[userClass].data" :key="idx">{{ item }} </ListItem>
          </List>
        </td>
        <td>
          <p>{{user[userClass].updateTime}}</p>
          <p>{{user[userClass].author}} ({{user[userClass].place}})</p>
        </td>
      </tr>
      <tr v-for="(interestKey, index) in Object.keys(interests.data)" :key="index" class='profile__interest'>
        <th v-if="!index">{{ interestsOptions.class }}</th>
        <th v-if="index"></th>
        <td>
          <p>{{ interests.data[interestKey].class }}</p>
          <List listDirection='row'>
            <ListItem v-for="(item, index) in interests.data[interestKey].data" 
              listBasis="40%" :key="index"> 
          {{ item }} </ListItem>
          </List>
        </td>
        <td>
          <p>{{ interests.data[interestKey].updateTime }}</p>
          <p>{{ interests.data[interestKey].author }} ({{ interests.data[interestKey].place }})</p> 
        </td>
      </tr>
    </ProfileLayout>
    <ProfileLayout v-if="isEdit">
      <tr v-for="(userClass, idx) in Object.keys(userOptions)" :key="idx">
        <th>{{ userOptions[userClass].class }}</th>
        <td>
          <FormWrapper>
            <FormInput v-for="(item, idx) in userOptions[userClass].data" 
              inputBasis="40%" :key="idx">
              <input :type="userOptions[userClass].type" :name="userClass" 
                :id="`${userClass}-${idx}`" :value="item" v-model="form[userClass]"/>
              <label :for="`${userClass}-${idx}`" v-if="userOptions[userClass].type !== 'text'">{{ item }}</label>
            </FormInput>
          </FormWrapper>
        </td>
      </tr>
      <tr v-for="(interestKey, index) in Object.keys(interestsOptions.data)" 
        :key="index" class='profile__interest'>
        <th v-if="!index">{{ interestsOptions.class }}</th>
        <th v-if="index"></th>
        <td>
          <p>{{ interestsOptions.data[interestKey].class }}</p>
          <FormWrapper>
            <FormInput v-for="(item, index) in interestsOptions.data[interestKey].data" 
              inputBasis="40%" :key="index">
              <input type="checkbox" :name="interestKey" 
                :id="`${interestKey}-${index}`" :value="item" />
              <label :for="`${interestKey}-${index}`">{{ item }}</label>
            </FormInput>
          </FormWrapper>
        </td>
      </tr>
    </ProfileLayout>
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

const profileLayoutProps = { isEdited: String }
const ProfileLayout = styled('table', profileLayoutProps)`
  border-collapse: collapse;
  width: 90%;
  margin: 0 auto; 
  .profile__interest {
    th {
      border-bottom: none;
    }
    p {
      margin-bottom: 10px;
    }
    &:last-child td {
      border-bottom: none;
    }
  }
  p{
    margin: 0
  } 
  tr {
    vertical-align: top;
  }
  td {
    padding: 10px 0;
    border-bottom: 1px solid grey;
    color: #324c5a;
    font-size: 16px;
    & > p {
      font-size: 14px;
      color: #628ea7;
    }
    &:last-child {
      width: 150px;
      p {
        margin: 0px;
      }
    }
  }
  th {
    padding: 10px 0;
    border-bottom: 1px solid grey;
    font-size: 18px;
    color: #324c5a;
    font-weight: bold;
    text-align: left;
    width: 80px;
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
    ProfileLayout,
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
        specials: ['XXX/XX/XX 申訴名單', 'XXX/XX/XX 申訴名單'],
        specialNotes: '情緒不穩定，於櫃檯咆哮並怒罵客服人員',
        features: ['慣用左手', '慣用左手', '雙目失明'],
        employee: '國壽副總',
        tags: ['旅遊愛好'],
        marrige: '單身',
        child: 0,
        salary: '201 萬以上',
        education: '研究所以上'
      },
      userOptions: {
        specials: {
          class: '特殊客戶',
          type: 'checkbox',
          data: ['XXX/XX/XX 申訴名單', 'XXX/XX/XX 申訴名單'],
        },
        specialNotes: {
          class: '特殊狀況備註',
          type: 'text',
          data: ['情緒不穩定，於櫃檯咆哮並怒罵客服人員'], 
        },
        features: {
          class: '特徵',
          type: 'checkbox',
          data: ['慣用左手','慣用左手', '雙目失明', '不識字', '失憶'], 
        },
        employee: {
          class: '集團員工',
          type: 'text',
          data: ['國壽副總'], 
        },
        tags: {
          class: '客戶標籤',
          type: 'checkbox',
          data: ['旅遊愛好','新手爸媽','數位族'],
        },
        marrige: {
          class: '婚姻',
          type: 'radio',
          data: ['單身', '已婚'],
        },
        child: {
          class: '子女',
          type: 'radio',
          data: 1,
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
          foods: {
            type: 'checkbox',
            class: '美食',
            data: ['咖啡', '手搖飲', '酒', '甜點', '健康飲食', '吃貨'] 
          },
          exercises: {
            type: 'checkbox',
            class: '運動',
            data: ['籃球', '棒球']
          }
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
