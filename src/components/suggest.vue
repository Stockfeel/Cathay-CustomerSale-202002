<template>
  <Modal :scroll="true">
    <Header>
      <router-link to="../">
        <CloseButton/>
      </router-link>
      <Title textAlign="center">{{ products[$route.query.id].title }}</Title>
    </Header>
    <SuggestMain>
      <Information :profile="profile" :product="products[$route.query.id]" />
    </SuggestMain>
    <Footer>
      <ButtonWrapper wrapperAlign="center">
        <Button :class="isEdit ? 'lock' : ''" bgColor="#05b077" @click="backTo()">接受</Button>
        <Button :class="isEdit ? 'lock' : ''" bgColor="#efbd00" @click="backTo()">沒時間</Button>
        <Button bgColor="#616161" @click="isEdit = !isEdit">拒絕</Button>
      </ButtonWrapper>
      <ScrollIn v-if="isEdit">
        <Textarea width="100%" />
        <SuggestFormWrapper>
          <FormInput inputBasis="20%">
            <input type="checkbox" v-model="isBook"/>
            <label>預約聯絡</label>
          </FormInput>
          <FormInput v-if="isBook" inputBasis="50%">
            <span>寄送時間</span>
            <input type="date" />
          </FormInput>
        </SuggestFormWrapper>
        <div class="input__button">
          <Button bgColor="#05b077">
            <router-link tag="div" to="../">
              <LinkStyle>寄送預約</LinkStyle>
            </router-link>
          </Button>
          <Button 
            bgColor="#fff" 
            textColor="#05b077"
            borderColor="#05b077"
          >
            <router-link tag="div" to="../">
              <LinkStyle textColor="#05b077">稍後再填</LinkStyle>
            </router-link>
          </Button>
        </div>
      </ScrollIn>
    </Footer>
  </Modal>
</template>

<script>
import { 
  Modal, 
  Header, 
  CloseButton, 
  Title,
  ScrollIn,
  Footer,
  LinkStyle,
  Button,
  ButtonWrapper,
  FormInput,
  FormWrapper
} from "../style.js";
import Information from "./information";
import Textarea from "./ui/textarea.vue";
import styled from 'vue-styled-components';

const SuggestMain = styled.main`
  height: 80%;
`
const SuggestFormWrapper = styled(FormWrapper)`
  margin-top: 20px;
  display: flex;
  align-items: center;
  span {
    margin-right: 20px;
  }
`

export default {
  name: "Suggest",
  components: {
    Modal,
    Header, 
    CloseButton, 
    Title,
    Information,
    ScrollIn,
    Footer,
    LinkStyle,
    Button,
    ButtonWrapper,
    SuggestMain,
    FormInput,
    SuggestFormWrapper,
    Textarea
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
      isBook: false,
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
          note: `請問您有信用卡嗎? 公司有個新活動，一通電話就可以 投保旅平險，保費可享77折比櫃台 投保還便宜，現在辦理完全免費，如果方便現在馬上幫你申辦開通資格好嗎？

一通電話就能讓您FUN心旅遊 
1.省力－只要塡申請書，不需任何手續費。 
2.省錢－一人申辦，約定之配偶、父母、子女電話投保同享77折費率 。
3.省時－出發前1小時撥打0800-036-599輕鬆投保。
4.貼心－365天24小時全年無休，一通電話即可享旅平險保障。`,
          state: 1,
        },
        2: {
          id: 2,
          title: '申辦電子單據',
          note: `請問您有信用卡嗎? 公司有個新活動，一通電話就可以 投保旅平險，保費可享77折比櫃台 投保還便宜，現在辦理完全免費，如果方便現在馬上幫你申辦開通資格好嗎？

一通電話就能讓您FUN心旅遊 
1.省力－只要塡申請書，不需任何手續費。 
2.省錢－一人申辦，約定之配偶、父母、子女電話投保同享77折費率 。
3.省時－出發前1小時撥打0800-036-599輕鬆投保。
4.貼心－365天24小時全年無休，一通電話即可享旅平險保障。`,
          state: 2,
        },
        3: {
          id: 3,
          title: '申辦網路服務',
          note: `請問您有信用卡嗎? 公司有個新活動，一通電話就可以 投保旅平險，保費可享77折比櫃台 投保還便宜，現在辦理完全免費，如果方便現在馬上幫你申辦開通資格好嗎？

一通電話就能讓您FUN心旅遊 
1.省力－只要塡申請書，不需任何手續費。 
2.省錢－一人申辦，約定之配偶、父母、子女電話投保同享77折費率 。
3.省時－出發前1小時撥打0800-036-599輕鬆投保。
4.貼心－365天24小時全年無休，一通電話即可享旅平險保障。`,
          state: 3,
        },
        4: {
          id: 4,
          title: '申辦網路服務',
          note: `請問您有信用卡嗎? 公司有個新活動，一通電話就可以 投保旅平險，保費可享77折比櫃台 投保還便宜，現在辦理完全免費，如果方便現在馬上幫你申辦開通資格好嗎？

一通電話就能讓您FUN心旅遊 
1.省力－只要塡申請書，不需任何手續費。 
2.省錢－一人申辦，約定之配偶、父母、子女電話投保同享77折費率 。
3.省時－出發前1小時撥打0800-036-599輕鬆投保。
4.貼心－365天24小時全年無休，一通電話即可享旅平險保障。`,
          state: 1,
        },
        5: {
          id: 5,
          title: '申辦電子單據',
          note: `請問您有信用卡嗎? 公司有個新活動，一通電話就可以 投保旅平險，保費可享77折比櫃台 投保還便宜，現在辦理完全免費，如果方便現在馬上幫你申辦開通資格好嗎？

一通電話就能讓您FUN心旅遊 
1.省力－只要塡申請書，不需任何手續費。 
2.省錢－一人申辦，約定之配偶、父母、子女電話投保同享77折費率 。
3.省時－出發前1小時撥打0800-036-599輕鬆投保。
4.貼心－365天24小時全年無休，一通電話即可享旅平險保障。`,
          state: 2,
        },
        6: {
          id: 6,
          title: '申辦電子單據',
          note: `請問您有信用卡嗎? 公司有個新活動，一通電話就可以 投保旅平險，保費可享77折比櫃台 投保還便宜，現在辦理完全免費，如果方便現在馬上幫你申辦開通資格好嗎？

一通電話就能讓您FUN心旅遊 
1.省力－只要塡申請書，不需任何手續費。 
2.省錢－一人申辦，約定之配偶、父母、子女電話投保同享77折費率 。
3.省時－出發前1小時撥打0800-036-599輕鬆投保。
4.貼心－365天24小時全年無休，一通電話即可享旅平險保障。`,
          state: 3,
        }
      },
    }
  }
}
</script>
