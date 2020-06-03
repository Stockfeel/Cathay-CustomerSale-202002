<template>
  <Card>
    <AvatarLayout>
      <div class='avatar__picture'>
        <div :class='`avatar__annotation ${similarity >= 90 ? "match" : similarity === 0 ? "nomatch" : ""}`'>
          {{ similarity === 0 ? "無相似度資料" : `${similarity}% 相似`}}
        </div>
        <img :class='`${similarity >= 90 ? "match" : ""}`' :src='require(`../assets/${transformAvatar()}.svg`)' />
      </div>
      <DropDown 
        id="dropdown__interaction"
        text="互動"
        :list="[{
          text: '蒐資遊戲', 
          slug: ''
        }, {
          text: '問卷 1',
          slug: ''
        }, {
          text: '問卷 2',
          slug: ''
        }]" 
      />
      <b-tooltip custom-class="custom__tooltip" target="dropdown__interaction" triggers="hover" placement="top">
        在您等待時間可以玩一下 30 秒左右小遊戲，不會花您太多時間喔！
      </b-tooltip>
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
          <div class="intro__nodata all" v-if="Object.keys(user.info).length === 0">
            保戶尚未建立輪廓
            <DropDownButton bgColor="#05b077" @click="goToProfile">
              <p>新增輪廓</p>
              <Icon :iconUrl="require('../assets/icon-edit-edit-white.svg')" :size="20"/>
            </DropDownButton>
          </div>
          <div class="intro__nodata" v-else-if="Object.keys(user.info).length < 4">
            輪廓尚未建立完整
            <DropDownButton bgColor="#05b077" @click="goToProfile">
              <p>新增輪廓</p>
              <Icon :iconUrl="require('../assets/icon-edit-edit-white.svg')" :size="20"/>
            </DropDownButton>
          </div>
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
  DropDownButton,
  Title } from '../style.js';
import styled from 'vue-styled-components';
import DropDown from './ui/dropdown.vue';

const AvatarLayout = styled.div`
  display: flex;  
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1 0 160px;
  box-shadow: 0 6px 15px 0 rgba(128, 197, 197, 0.72);
  @media (max-width: 1280px) {
    flex: 0 1 230px;
    padding: 20px 0;
    justify-content: space-around;
  }
  .avatar__picture {
    position: relative;
    margin-bottom: 20px;
    margin-top: -50px;
    @media (max-width: 1280px) {
      margin-top: 0;
      margin-bottom: 0;
    }
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
    &.match {
      background: #3aafb1
    }
    &.nomatch {
      padding: 2px;
    }
  }
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 
      0 0 0 5px white,
      0 0 0 10px #dd7b7b,
      0 0 12px 8px #dd7b7b;
    &.match {
      box-shadow: 
        0 0 0 5px white,
        0 0 0 10px #3aafb1,
        0 0 12px 8px #3aafb1;
    }
  }
`

const IntroLayout = styled.div`
  position: relative;
  padding: 10px 20px;
  width: 100%;
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
  .intro__nodata {
    background: rgba(227, 250, 250, 0.5);
    border-radius: 12px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    & > * {
      margin: 10px;
    }
    &.all {
      flex-direction: column;
    }
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
    DropDownButton,
    Title,
    ListItem,
    List,
    DropDown,
  },
  methods: {
    goToProfile() {
      this.$router.push('/profile?edit=true')
    },
    transformAvatar() {
      if(this.user.id) {
        switch(this.user.id[1]) {
          case '1': 
            if(this.similarity < 90) return 'img-photo-man-warning';
            else return  'img-photo-man';
          case '2': 
            if(this.similarity < 90) return 'img-photo-woman-warning';
            else return  'img-photo-woman';
          default: 
            if(this.similarity < 90) return 'img-photo-neutral-warning';
            else return  'img-photo-neutral';
        }
      } else {
        if(this.similarity < 90) return 'img-photo-nodata-warning';
        else return 'img-photo-nodata';        
      }
    }
  },
  data () {
    return {
      isMenuOpen: false,
      similarity: 50
    }
  },
}
</script>
