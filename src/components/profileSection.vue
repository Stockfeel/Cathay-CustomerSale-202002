<template>
  <Card>
    <AvatarLayout>
      <div class='avatar__picture'>
        <div class='avatar__annotation'>70% 相似</div>
        <img src='../assets/info_avatar.png'>
      </div>
      <DropDownButton>
        <span>互動</span>
        <Icon :iconUrl="require('../assets/icon-arrow-white-down.svg')" />
      </DropDownButton>
    </AvatarLayout>
    <IntroLayout>
      <section>
        <Title textAlign='left'>{{ user.name }} ({{ user.age }} 歲)</Title>
        <List listDirection='column'>
          <ListItem>特殊客戶：
            <span v-for="(special, idx) in user.specials" :key="idx">{{ idx ? '、': ''}} {{ special }}</span>
          </ListItem>
          <ListItem>特徵： 
            <span v-for="(tag, idx) in user.features" :key="idx">{{ idx ? '、': ''}}{{ tag }}</span>
          </ListItem>
          <ListItem>集團員工： {{ user.employee }}</ListItem>
          <ListItem>客戶標籤：
            <span v-for="(tag, idx) in user.tags" :key="idx">{{ idx ? '、': ''}}{{ tag }}</span>
          </ListItem>
        </List>
        <router-link to='./profile'>
          <MoreButton>
            <p>看更多輪廓及編輯</p>
            <Icon :iconUrl="require('../assets/button_more.svg')" :size="20"/>
          </MoreButton>
        </router-link>
      </section>
      <section>
        <Title textAlign='left'>服務歷程</Title>
        <p>{{ service.date }} {{ service.time }} {{ service.route }}</p>
        <p>{{ service.note }} </p>
        <router-link to='./service'>
          <MoreButton>
              <p>看更多歷程</p>
              <Icon :iconUrl="require('../assets/button_more.svg')" :size="20"/>
          </MoreButton>
        </router-link>
      </section>
    </IntroLayout>
  </Card>
</template>

<script>
import { List, ListItem, Card, Icon, DropDownButton, MoreButton, Title } from '../style.js';
import styled from 'vue-styled-components';

const AvatarLayout = styled.div`
  display: flex;  
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 0 1 160px;
  box-shadow: 0 6px 15px 0 rgba(128, 197, 197, 0.72);
  .avatar__picture {
    position: relative;
    margin-bottom: 20px;
  }
  .avatar__annotation {
    position: absolute;
    display: flex;
    align-items: center;
    top: -20px;
    left: -20px;
    font-size: 12px;
    text-align: center;
    vertical-align: middle;
    border-radius: 50%;
    background: #dd7b7b;
    color: white;
    padding: 5px;
    width: 45px;
    height: 45px;
  }
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 
      0 0 0 5px white,
      0 0 0 10px #dd7b7b,
      0 0 12px 8px #80c5ca;
  }
`

const IntroLayout = styled.div`
  flex: 1 1 auto;
  position: relative;
  padding: 10px 20px;
  section {
    position: relative;
  }
  p {
    margin: 0;
  }
  section > p {
    margin-top: 5px;
  }
`

export default {
  name: 'profileSection',
  components: {
    Card,
    IntroLayout,
    AvatarLayout,
    Icon,
    MoreButton,
    Title,
    DropDownButton,
    ListItem,
    List
  },
  data () {
    return {
      user: {
        name: '林國泰',
        age: 31,
        specials: ['XXX/XX/XX 申訴名單', 'XXX/XX拒絕行'],
        features: ['慣用左手','不識字'],
        employee: '國壽副總',
        tags: ['旅遊愛好','新手爸媽','數位族'],
      },
      service: {
        date: '108/12/26',
        time: '10:36',
        route: '0800 進線',
        note: '申請 ATM 保單借款'
      } 
    }
  },
}
</script>
