<template>
  <SuggestLayout>
    <Header>
      <router-link to="../">
        <CloseButton/>
      </router-link>
      <Title textAlign="center">{{ products[$route.query.id].title }}</Title>
    </Header>
    <main>
      <pre>
  請問您有信用卡嗎? 公司有個新活動，一通電話就可以 投保旅平險，保費可享77折比櫃台 投保還便宜，現在辦理完全免費，如果方便現在馬上幫你申辦開通資格好嗎？

  一通電話就能讓您FUN心旅遊 
  1.省力－只要塡申請書，不需任何手續費。 
  2.省錢－一人申辦，約定之配偶、父母、子女電話投保同享77折費率 。
  3.省時－出發前1小時撥打0800-036-599輕鬆投保。
  4.貼心－365天24小時全年無休，一通電話即可享旅平險保障。
      </pre>
      <div class="intro__button">
        <SwitchButton :word="isSync == 'on' ? '同步中 ●' : '同步畫面'">
          <input type="checkbox" v-model="isSync" value="on"/>
          <span class="slider"></span>
        </SwitchButton>
        <div>
          <DropDownButton @click="isPop = !isPop">發送給客戶</DropDownButton>
          <PopUp v-if="isPop">
            <p>DM 發送對象：{{ profile.name }}</p>
            <FormInput>
              <Input type="checkbox" id="email-check" v-model="isEmailEnter" value="on" />
              <label for="email-check">客戶Email：</label>
            </FormInput>
            <FormInput>
              <Input type="text" :value="isEmailEnter == 'on' ? '' : profile.email" />
            </FormInput>
            <FormInput>
              <Input type="checkbox" id="mobile-check" />
              <label for="mobile-check">客戶手機號碼：</label>
            </FormInput>
            <FormInput><Input type="text" :value="isEmailEnter == 'on' ? '' : profile.mobile" /></FormInput>
            <ButtonWrapper>
              <Button bgColor="#05b077" @click="isPop = !isPop">發送</Button>
              <Button bgColor="#616161" @click="isPop = !isPop">取消</Button>
            </ButtonWrapper>
          </PopUp>
        </div>
        <DropDownButton>列印</DropDownButton>
      </div>
      <div :class="`img__container ${isSync == 'on' ? 'active' : ''}`">
        <img :src="require(`../assets/dm.png`)" />
      </div>
    </main>
    <Footer>
      <ButtonWrapper>
        <Button bgColor="#05b077" @click="backTo()">接受</Button>
        <Button bgColor="#3aafb1" @click="backTo()">沒時間</Button>
        <Button bgColor="#616161" @click="isEdit = !isEdit">拒絕</Button>
      </ButtonWrapper>
      <ScrollIn v-if="isEdit">
        <FormInput inputBasis="450">
          <b-form-textarea
            id="textarea"
            v-model="noteInput"
            placeholder="輸入備註"
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </FormInput>
        <div class="input__button">
          <Button bgColor="#05b077">
            <router-link to="../">
              <LinkStyle>寄送預約</LinkStyle>
            </router-link>
          </Button>
          <Button bgColor="#fff" textColor="#05b077">
            <router-link to="../">
              <LinkStyle textColor="#05b077">稍後再填</LinkStyle>
            </router-link>
          </Button>
        </div>
      </ScrollIn>
    </Footer>
  </SuggestLayout>
</template>

<script>
import { 
  Modal, 
  Header, 
  CloseButton, 
  Title, 
  Footer, 
  ButtonWrapper, 
  Button, 
  DropDownButton, 
  SwitchButton, 
  FormInput, 
  LinkStyle,
  PopUp,
  ScrollIn } from "../style.js";
import styled from 'vue-styled-components';

const SuggestLayout = styled(Modal)`
  section {
    padding: 20px;
  }
  .intro__button {
    display: flex;
    justify-content: center;
    padding: 10px 30px;
    & > * {
      margin: 0 10px;
    }
  }
  main > div.img__container {
    overflow: hidden;
    width: 90%; 
    margin: 0 auto;
    margin-top: 20px;
    border-radius: 15px;
    img {
      width: 100%:
      height: 100%;
      object-position: 50% 50%;
      object-fit: cover;
    }
    &.active {
      box-shadow: 0 0 0 3px #ffcbcb, 0 0 0 4px #feecec;
    }
  }
  pre {
    width: 80%;
    margin: 0 auto
    white-space: pre-wrap;  
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;
  }
`

export default {
  name: "Suggest",
  components: {
    SuggestLayout,
    Header, 
    CloseButton, 
    Title,
    ButtonWrapper,
    Button,
    DropDownButton,
    SwitchButton,
    PopUp,
    FormInput,
    ScrollIn,
    LinkStyle,
    Footer,
  },
  methods: {
    backTo() {
      this.$router.push('/')
    }
  },
  data () {
    return {
      isSync: [],
      isPop: false,
      isEdit: false,
      isEmailEnter: [],
      isMobileEnter: [],
      noteInput: '',
      profile: {
        name: '林國泰',
        email: 'djfosi@gmail.com',
        mobile: '09897484731'
      },
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
