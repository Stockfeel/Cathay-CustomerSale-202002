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
    <Reply 
      v-if="true"
      :isEdit="isEdit" 
      :editStatus="editStatus" 
      :onSend="resetReply" 
      :onReply="replyStatus" 
      :onCancel="resetReply" 
    />
  </Modal>
</template>

<script>
import { 
  Modal, 
  Header, 
  CloseButton, 
  Title,
} from "../style.js";
import Information from "./information";
import Reply from "./ui/reply";

import styled from 'vue-styled-components';

const SuggestMain = styled.main`
  height: 80%;
`

export default {
  name: "Suggest",
  components: {
    Modal,
    Header, 
    CloseButton, 
    Title,
    Information,
    SuggestMain,
    Reply
  },
  methods: {
    resetReply() {
      this.isEdit = false;
      this.editStatus = "";
    },
    replyStatus(evt) {
      this.isEdit = true;
      this.editStatus = evt.target.dataset.reply;
    },
  },
  data () {
    return {
      isSync: [],
      isPop: false,
      isEdit: false,
      editStatus: "",
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
