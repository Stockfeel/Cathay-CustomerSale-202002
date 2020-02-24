<template>
  <IntroLayout>
    <Header>
      <router-link to="../">
        <CloseButton/>
      </router-link>
      <Title textAlign="center">{{ products[$route.params.id].title }}</Title>
    </Header>
    <section>
      請問您有信用卡嗎? 公司有個新活動，一通電話就可以 投保旅平險，保費可享77折比櫃台 投保還便宜，現在辦理完全免費，如果方便現在馬上幫你申辦開通資格好嗎？
      一通電話就能讓您FUN心旅遊 
      1.省力－只要塡申請書，不需任何手續費。 
      2.省錢－一人申辦，約定之配偶、父母、子女電話投保同享77折費率 。
      3.省時－出發前1小時撥打0800-036-599輕鬆投保。
      4.貼心－365天24小時全年無休，一通電話即可享旅平險保障。
    </section>
    <div class="intro__button">
      <DropDownButton>同步中</DropDownButton>
      <DropDownButton>發送給客戶</DropDownButton>
      <DropDownButton>列印</DropDownButton>
    </div>
    <img :src="require('../assets/dm.png')" alt="圖片測試" />
    <ButtonWrapper>
      <Button>接受</Button>
      <Button>沒時間</Button>
      <Button>拒絕</Button>
    </ButtonWrapper>
  </IntroLayout>
</template>

<script>
import { Modal, Header, CloseButton, Title, ButtonWrapper, Button, DropDownButton } from "../style.js";
import styled from 'vue-styled-components';

const IntroLayout = styled(Modal)`
  section {
    padding: 20px;
  }
  .intro__button {
    display: flex;
    padding: 10px 30px;
    & > * {
      margin: 0 10px;
    }
  }
  img {
    box-shadow: 0 0 0 3px #ffcbcb, 0 0 0 4px #feecec;
  }
`

export default {
  name: "Intro",
  components: {
    IntroLayout,
    Header, 
    CloseButton, 
    Title,
    ButtonWrapper,
    Button,
    DropDownButton,
  },
  data () {
    return {
      products: {
        1: {
          id: 1,
          title: '申辦網路服務',
          state: 1,
        },
        2: {
          id: 2,
          title: '申辦電子單據',
          state: 2,
        },
        3: {
          id: 3,
          title: '申辦網路服務',
          state: 3,
        },
        4: {
          id: 4,
          title: '申辦網路服務',
          state: 1,
        },
        5: {
          id: 5,
          title: '申辦電子單據',
          state: 2,
        },
        6: {
          id: 6,
          title: '申辦電子單據',
          state: 3,
        }
      },
    }
  }
}
</script>
