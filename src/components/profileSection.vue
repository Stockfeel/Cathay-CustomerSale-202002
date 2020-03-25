<template>
  <Card>
    <AvatarLayout>
      <div class='avatar__picture'>
        <div class='avatar__annotation'>70% 相似</div>
        <img src='../assets/info_avatar.png'>
      </div>
      <DropDown 
        text="互動"
        :list="[{
          text: '搜資遊戲', 
          slug: ''
        }, {
          text: '問卷 1',
          slug: ''
        }, {
          text: '問卷 2',
          slug: ''
        }]" 
      />
    </AvatarLayout>
    <IntroLayout>
      <section>
        <Title textAlign='left'>
          {{ user.name }} ({{ user.age }} 歲)
          <span class="icon__wrapper"> 
            <Icon v-if="user.isSecret === 'Y' ? true : false" :iconUrl="require('../assets/icon-profile-birth.svg')" :size="25"/>
            <Icon v-if="user.isBirthday === 'Y' ? true : false" :iconUrl="require('../assets/icon-profile-secret.svg')" :size="25"/>
            <Icon v-if="user.isVip" :iconUrl="require('../assets/icon-profile-vip.svg')" :size="25"/>
          </span>
        </Title>
        <List listDirection='column'>
          <ListItem v-for="(item, key) in Object.keys(user.info)" :key="`key-${key}`">{{item}}:
            <span>{{ user.info[item] }}</span>
          </ListItem>
        </List>
        <router-link tag="div" to='./profile'>
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
        <router-link tag="div" to='./service'>
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
import { 
  List, 
  ListItem, 
  Card, 
  Icon, 
  MoreButton, 
  Title } from '../style.js';
import styled from 'vue-styled-components';
import DropDown from './ui/dropdown.vue';

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
    margin-top: -50px;
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
  .icon__wrapper {
    display: flex;
    & > * {
      margin: 0 5px;
    }
  }
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
  props: {
    user: Object,
    service: Object,
  },
  components: {
    Card,
    IntroLayout,
    AvatarLayout,
    Icon,
    MoreButton,
    Title,
    ListItem,
    List,
    DropDown
  },
  data () {
    return {
      isMenuOpen: false,
    }
  },
}
</script>
