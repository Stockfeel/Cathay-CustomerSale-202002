<template>
  <Card>
    <Avatar>
      <img />
      <div>互動</div>
    </Avatar>
    <Intro>
      <p>{{ user.name }} ({{ user.age }} 歲)</p>
      <ul>
        <li>特殊客戶：</li>
        <li>特徵： 
          <span v-for="(tag, idx) in user.features" :key="idx">{{ tag }} </span>
        </li>
        <li>集團員工： {{ user.employee }}</li>
        <li>客戶標籤：
          <span v-for="(tag, idx) in user.tags" :key="idx">{{ tag }} </span>
        </li>
      </ul>
      <div>
        <p>看更多輪廓及編輯</p>
      </div>
    </Intro>
  </Card>
</template>

<script>
import { Card } from '../style.js';
import styled from 'vue-styled-components';

// const Avatar = styled.div`
  
// `

const Intro = styled.div`
  p {
    font-weight: bold;
  }  
`

export default {
  name: 'Info',
  props: {
    msg: String
  },
  components: {
    Card,
    Intro
  },
  data () {
    return {
      user: {
        name: '林國泰',
        age: 31,
        features: ['慣用左手','不識字'],
        employee: '國壽副總',
        tags: ['旅遊愛好','新手爸媽','數位族'],
      } 
    }
  },
}
</script>
