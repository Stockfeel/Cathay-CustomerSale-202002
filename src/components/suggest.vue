<template>
  <SuggestLayout>
    <Header>
      <router-link to="../">
        <CloseButton/>
      </router-link>
      <Title textAlign="center">{{ products[$route.params.id].title }}</Title>
    </Header>
    <pre>
請問您有信用卡嗎? 公司有個新活動，一通電話就可以 投保旅平險，保費可享77折比櫃台 投保還便宜，現在辦理完全免費，如果方便現在馬上幫你申辦開通資格好嗎？

一通電話就能讓您FUN心旅遊 
1.省力－只要塡申請書，不需任何手續費。 
2.省錢－一人申辦，約定之配偶、父母、子女電話投保同享77折費率 。
3.省時－出發前1小時撥打0800-036-599輕鬆投保。
4.貼心－365天24小時全年無休，一通電話即可享旅平險保障。
    </pre>
    <div class="intro__button">
      <SwitchButton word="同步中 ●">
        <input type="checkbox"/>
        <span class="slider"></span>
      </SwitchButton>
      <DropDownButton @click="isPop = !isPop">發送給客戶</DropDownButton>
      <DropDownButton>列印</DropDownButton>
    </div>
    <img :src="imgUrl" />
    <Footer>
      <ButtonWrapper>
        <Button bgColor="#05b077" @click="isEdit = !isEdit">接受</Button>
        <Button bgColor="#3aafb1" @click="isEdit = !isEdit">沒時間</Button>
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
    <PopUp v-if="isPop">
      <p>DM 發送對象：{{ '林國泰' }}</p>
      <FormInput>
        <Input type="checkbox" id="email-check" />
        <label for="email-check">客戶Email：</label>
      </FormInput>
      <FormInput><Input type="text" /></FormInput>
      <FormInput>
        <Input type="checkbox" id="mobile-check" />
        <label for="mobile-check">客戶手機號碼：</label>
      </FormInput>
      <FormInput><Input type="text" /></FormInput>
      <ButtonWrapper>
        <Button bgColor="#05b077" @click="isPop = !isPop">發送</Button>
        <Button bgColor="#616161" @click="isPop = !isPop">取消</Button>
      </ButtonWrapper>
    </PopUp>
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
import dm from "../assets/dm.png";

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
  img {
    box-shadow: 0 0 0 3px #ffcbcb, 0 0 0 4px #feecec;
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
  data () {
    return {
      imgUrl: dm,
      syncState: false,
      isPop: false,
      isEdit: false,
      noteInput: '',
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
