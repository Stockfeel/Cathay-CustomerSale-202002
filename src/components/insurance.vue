<template>
  <Modal :autoHeight="false" :scroll="true" :mainHeight="82">
    <Header>
      <router-link to='./'>
        <CloseButton/>
      </router-link>
      <Tab>
        <Title textAlign='center' :class="tab == 'suggest' ? 'active': ''" data-tab="suggest" @click="changeTab">商品推薦</Title>
        <span>|</span>
        <Title textAlign='center' :class="tab == 'hottest' ? 'active': ''" data-tab="hottest" @click="changeTab">熱銷商品</Title>
      </Tab>
    </Header>
    <InsuranceLayout v-if="tab == 'suggest'">
      <InsuranceSection />
      <section class="suggest__wrapper">
        <Product 
          data-cy="product"
          color="181,93.2%,40.6%"
          v-for="(item, idx) in suggest" :key="`product-${idx}`"
          @click="() => showSuggest(idx)" 
          :data-id="idx"
          :class="idx === id ? 'active' : ''"
        >
          <div class="item__name">{{ item.name }}</div>
          <p class="item__link">
            <span>詳細資訊</span>
            <Icon v-if="id !== idx" :iconUrl="require('../assets/icon-arrow-dark-down.svg')" />
            <Icon v-else :iconUrl="require('../assets/icon-arrow-dark-up.svg')" />
          </p>
          <StarIcon v-if="item.word" 
            :iconUrl="require('../assets/star.svg')" 
            :word="item.word" :size="30" 
          />
        </Product>
        <div class="section__show" v-if="id !== -1">
          <main>
            <Information :profile="profile" :product="suggest[id]"/>
          </main>
          <div class="section__close">
            <span>收合</span>
            <Icon 
              :iconUrl="require('../assets/button_more.svg')" 
              :size="30" 
              :rotate="-90"
              @click="() => showSuggest(id)" 
            />
          </div>
        </div>
      </section>
      <ButtonWrapper wrapperAlign="center">
        <Button>官網更多商品</Button>
      </ButtonWrapper>
    </InsuranceLayout>
    <InsuranceLayout v-if="tab == 'hottest'">
      <section class="suggest__wrapper" v-for="(item, index) in Object.keys(hottest)" :key="`section-${index}`">
        <div class="section__title">{{ item }}</div>
        <p>註：{{ hottest[item].note }}</p>
        <div class="section__products">
          <Product 
            v-for="(product, idx) in hottest[item].products" 
            :data-cy="`product-${index}`"
            color="0,67%,65.5%"
            :key="`hottest-${idx}`" 
            :class="idx == hottest[item].isShow ? 'active' : ''"
            :data-name="item" 
            :data-id="idx"
            @click="showHottest" 
          >
            <div class="item__name" :data-name="item" :data-id="idx">{{ product.name }}</div>
            <p class="item__link" :data-name="item" :data-id="idx">
              <span>銷售 {{ toCurrency(product.volume) }} 件</span>
            </p>
            <StarIcon :iconUrl="require('../assets/star.svg')" 
              :word="String(product.rank)" :size="35" 
            />
            <div class="item__more">
              <Icon 
                :iconUrl="require('../assets/button_more.svg')" 
                :size="30" 
                :rotate="90"
                v-if="hottest[item].isShow != idx"
              />
              <Icon 
                :iconUrl="require('../assets/button_more.svg')" 
                :size="30" 
                :rotate="-90"
                v-else
              />
            </div>
          </Product>
        </div>
        <div class="section__show" v-if="hottest[item].isShow !== -1">
          <main>
            <Information :profile="profile" :product="product"/>
          </main>
          <div class="section__close">
            <span>收合</span>
            <Icon 
              :iconUrl="require('../assets/button_more.svg')" 
              :size="30" 
              :rotate="-90"
              :data-name="item"
              :data-id="hottest[item].isShow"
              @click="showHottest" 
            />
          </div>
        </div>
      </section>
      <ButtonWrapper wrapperAlign="center">
        <Button>官網更多商品</Button>
      </ButtonWrapper>
    </InsuranceLayout>
    <Reply 
      v-if="showTab"
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
  Title, 
  CloseButton,
  Header, 
  Button,
  ButtonWrapper,
  Icon,
  StarIcon,
  Tab,
} from "../style";
import InsuranceSection from "./insuranceSection";
import styled from 'vue-styled-components';
import Information from './information';
import Reply from './ui/reply';

const hslReducer = (hsl) => {
  const strArr = hsl.split(',');
  const h = strArr[0];
  const s = strArr[1];
  const l = `${parseFloat(strArr[2])-10}%`;
  return `${h},${s},${l}`
}

const hslAdder = (hsl) => {
  const strArr = hsl.split(',');
  const h = strArr[0];
  const s = strArr[1];
  const l = `${parseFloat(strArr[2])-5}%`;
  return `${h},${s},${l}`
}

const productProps = { color: String, isShow: Number } 
const Product = styled('div', productProps)`
  position: relative;
  background: hsl(${props => props.color});
  color: white;
  width: 165px; 
  height: 150px;
  padding: 20px 20px 0 20px;
  border-radius: 10px;
  margin: 10px;
  box-shadow: 0 2px 8px 0 hsla(${props => hslReducer(props.color)}, 0.4);
  &.active {
    box-shadow: 0 4px 20px 0 hsla(${props => hslReducer(props.color)}, 0.4);
    background: hsl(${props => hslAdder(props.color)});
  }
  .item__name {
    font-weight: bold;
  }
  .item__link {
    background: white;
    color: #324c5a;
    position: absolute;
    width: 100%; 
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 0;
    left: 0;
    margin: 0;
    border-radius: 0px 0px 10px 10px;
    opacity: .8;
    & > * {
      margin: 0 5px;
    }
  } 
  .item__more {
    position: absolute;
    bottom: -25px;
    left: 50%;
    transform: translateX(-50%);
  }
`

const InsuranceLayout = styled.main`
  -ms-overflow-style: none;
  .suggest__wrapper {
    width: 100%;
    padding: 30px 60px;
  }
  section {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 20px;
    .section__products {
      width: 100%;
      display: flex;
    }
    p {
      color: #628ea7;
      font-size: 14px;
    }
    .section__title {
      font-size: 22px;
      width: 100%;
      font-weight: bold;
      color: #324c5a;
      margin-bottom: 5px;
      margin-left: .8em;
      &::before {
        content: "•"; 
        color: #05b077;
        display: inline-block; 
        width: 1em;
        margin-left: -.8em
      }
    }
    .section__show {
      position: relative;
      margin-top: 50px;
      height: 50%;
      background: rgba(227, 250, 250, 0.5);
      width: 100%;
      padding: 20px;
      .section__close {
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translate(-50%, 50%);
        display: flex;
        align-items: center;
        justify-content: center; 
        &::before, &::after {
          content: '';
          width: 100px;
          height: 1px;
          background: #c3e3e3;
          top: 50%;
        }
        &::before {
          left: calc(-100%-50px);
        }
        &::after {
          right: 50px;
        }
      }

    }
  }
`

export default {
  name: 'Insurance',
  components: {
    Modal,
    Title,
    CloseButton,
    Header,
    InsuranceSection,
    InsuranceLayout,
    Button,
    ButtonWrapper,
    Icon,
    StarIcon,
    Tab,
    Product,
    Information,
    Reply,
  },
  methods: {
    resetReply() {
      this.isEdit = false;
      this.editStatus = "";
      if(this.tab === 'hottest') {
        Object.keys(this.hottest).forEach(key => this.hottest[key].isShow = -1)
      } else {
        this.id = -1;
      }
    },
    replyStatus(evt) {
      this.isEdit = true;
      this.editStatus = evt.target.dataset.reply;
    },
    backTo() {
      this.$router.push('/')
    },
    toCurrency(num){
      let parts = num.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.');
    },
    showSuggest(id) {
      if(!this.isEdit) {
        if(id === this.id) {
          this.id = -1;
          this.showTab = false;
        } else {
          this.id = id;
          this.showTab = true;
        }
      }
    },
    showHottest(evt) {
      const { name, id } = evt.target.dataset;
      if(!this.isEdit) {
        if(this.hottest[name].isShow == id) {
          this.hottest[name].isShow = -1;
          this.showTab = false;
        } else {
          Object.keys(this.hottest).forEach(key => {
            if(key !== name) {
              this.hottest[key].isShow = -1
            } else {
              this.hottest[name].isShow = id;
              this.product = this.hottest[name].products[id];
              this.showTab = true;
            }
          })
        }
      }
    },
    initData() {
      this.idEdit = false;
      this.isAccept = false;
      this.noteInput = '';
      this.id = -1;
    },
    changeTab(evt) {
      this.tab = evt.target.dataset.tab;
      this.showTab = false;
      this.product = null;
      this.initData();
    }
  },
  data() {
    return {
      tab: "suggest",
      editStatus: "",
      isEdit: false,
      isAccept: false,
      showTab: false,
      noteInput: '',
      id: -1,
      product: null,
      profile: {
        name: '林國泰',
        email: 'djfosi@gmail.com',
        mobile: '09897484731'
      },
      suggest: [
      {
        name: "國泰人壽新留學御守傷害保險(IG3)", 
        id: 0,
        word: "1",
        note: `
測試測試測試? 公司有個新活動，一通電話就可以 投保旅平險，保費可享77折比櫃台 投保還便宜，現在辦理完全免費，如果方便現在馬上幫你申辦開通資格好嗎？
一通電話就能讓您FUN心旅遊 
1.省力－只要塡申請書，不需任何手續費。 
2.省錢－一人申辦，約定之配偶、父母、子女電話投保同享77折費率 。
3.省時－出發前1小時撥打0800-036-599輕鬆投保。
4.貼心－365天24小時全年無休，一通電話即可享旅平險保障。`
      }, {
        name: "國泰人壽新留學御守傷害保險(IG3)", 
        id: 1,
        note: `
請問您有信用卡嗎? 公司有個新活動，一通電話就可以 投保旅平險，保費可享77折比櫃台 投保還便宜，現在辦理完全免費，如果方便現在馬上幫你申辦開通資格好嗎？
一通電話就能讓您FUN心旅遊 
1.省力－只要塡申請書，不需任何手續費。 
2.省錢－一人申辦，約定之配偶、父母、子女電話投保同享77折費率 。
3.省時－出發前1小時撥打0800-036-599輕鬆投保。
4.貼心－365天24小時全年無休，一通電話即可享旅平險保障。`
      }, {
        name: "國泰人壽新留學御守傷害保險(IG3)", 
        id: 2,
        note: `
請問您有信用卡嗎? 公司有個新活動，一通電話就可以 投保旅平險，保費可享77折比櫃台 投保還便宜，現在辦理完全免費，如果方便現在馬上幫你申辦開通資格好嗎？
一通電話就能讓您FUN心旅遊 
1.省力－只要塡申請書，不需任何手續費。 
2.省錢－一人申辦，約定之配偶、父母、子女電話投保同享77折費率 。
3.省時－出發前1小時撥打0800-036-599輕鬆投保。
4.貼心－365天24小時全年無休，一通電話即可享旅平險保障。`
      }],
      hottest: {
        "保障規劃類型保險(主約)": {
          isShow: -1,
          note: "包括健康醫療(住院、手術、實支實付、重疾、長照)、壽險與意外傷害保障的保險商品",
          products: [{
            name: "國泰人壽Hen幸福保險",
            volume: 24943, 
            rank: 1,
            note: `
測試測試? 公司有個新活動，一通電話就可以 投保旅平險，保費可享77折比櫃台 投保還便宜，現在辦理完全免費，如果方便現在馬上幫你申辦開通資格好嗎？
一通電話就能讓您FUN心旅遊 
1.省力－只要塡申請書，不需任何手續費。 
2.省錢－一人申辦，約定之配偶、父母、子女電話投保同享77折費率 。
3.省時－出發前1小時撥打0800-036-599輕鬆投保。
4.貼心－365天24小時全年無休，一通電話即可享旅平險保障。`,
          },{
            name: "國泰人壽Hen幸福保險",
            volume: 24943, 
            rank: 2,
            note: `
請問您有信用卡嗎? 公司有個新活動，一通電話就可以 投保旅平險，保費可享77折比櫃台 投保還便宜，現在辦理完全免費，如果方便現在馬上幫你申辦開通資格好嗎？
一通電話就能讓您FUN心旅遊 
1.省力－只要塡申請書，不需任何手續費。 
2.省錢－一人申辦，約定之配偶、父母、子女電話投保同享77折費率 。
3.省時－出發前1小時撥打0800-036-599輕鬆投保。
4.貼心－365天24小時全年無休，一通電話即可享旅平險保障。`, 

          },{
            name: "國泰人壽Hen幸福保險",
            volume: 24943, 
            rank: 3,
            note: `
請問您有信用卡嗎? 公司有個新活動，一通電話就可以 投保旅平險，保費可享77折比櫃台 投保還便宜，現在辦理完全免費，如果方便現在馬上幫你申辦開通資格好嗎？
一通電話就能讓您FUN心旅遊 
1.省力－只要塡申請書，不需任何手續費。 
2.省錢－一人申辦，約定之配偶、父母、子女電話投保同享77折費率 。
3.省時－出發前1小時撥打0800-036-599輕鬆投保。
4.貼心－365天24小時全年無休，一通電話即可享旅平險保障。`,
          }]
        },
        "保障規劃類型保險(附約)": {
          isShow: -1,
          note: "包括健康醫療(住院、手術、實支實付、重疾、長照)、壽險與意外傷害保障的保險商品",
          products: [{
            name: "國泰人壽Hen幸福保險",
            volume: 24943, 
            rank: 1,
            note: `
請問您有信用卡嗎? 公司有個新活動，一通電話就可以 投保旅平險，保費可享77折比櫃台 投保還便宜，現在辦理完全免費，如果方便現在馬上幫你申辦開通資格好嗎？
一通電話就能讓您FUN心旅遊 
1.省力－只要塡申請書，不需任何手續費。 
2.省錢－一人申辦，約定之配偶、父母、子女電話投保同享77折費率 。
3.省時－出發前1小時撥打0800-036-599輕鬆投保。
4.貼心－365天24小時全年無休，一通電話即可享旅平險保障。`,
          },{
            name: "國泰人壽Hen幸福保險",
            volume: 24943, 
            rank: 2,
            note: `
請問您有信用卡嗎? 公司有個新活動，一通電話就可以 投保旅平險，保費可享77折比櫃台 投保還便宜，現在辦理完全免費，如果方便現在馬上幫你申辦開通資格好嗎？
一通電話就能讓您FUN心旅遊 
1.省力－只要塡申請書，不需任何手續費。 
2.省錢－一人申辦，約定之配偶、父母、子女電話投保同享77折費率 。
3.省時－出發前1小時撥打0800-036-599輕鬆投保。
4.貼心－365天24小時全年無休，一通電話即可享旅平險保障。`,
          },{
            name: "國泰人壽Hen幸福保險",
            volume: 24943, 
            rank: 3,
            note: `
請問您有信用卡嗎? 公司有個新活動，一通電話就可以 投保旅平險，保費可享77折比櫃台 投保還便宜，現在辦理完全免費，如果方便現在馬上幫你申辦開通資格好嗎？
一通電話就能讓您FUN心旅遊 
1.省力－只要塡申請書，不需任何手續費。 
2.省錢－一人申辦，約定之配偶、父母、子女電話投保同享77折費率 。
3.省時－出發前1小時撥打0800-036-599輕鬆投保。
4.貼心－365天24小時全年無休，一通電話即可享旅平險保障。`,
          }]
        },
        "資產規劃類型保險(主約)": {
          isShow: -1,
          note: "包括健康醫療(住院、手術、實支實付、重疾、長照)、壽險與意外傷害保障的保險商品",
          products: [{
            name: "國泰人壽Hen幸福保險",
            volume: 24943, 
            rank: 1,
            note: `
請問您有信用卡嗎? 公司有個新活動，一通電話就可以 投保旅平險，保費可享77折比櫃台 投保還便宜，現在辦理完全免費，如果方便現在馬上幫你申辦開通資格好嗎？
一通電話就能讓您FUN心旅遊 
1.省力－只要塡申請書，不需任何手續費。 
2.省錢－一人申辦，約定之配偶、父母、子女電話投保同享77折費率 。
3.省時－出發前1小時撥打0800-036-599輕鬆投保。
4.貼心－365天24小時全年無休，一通電話即可享旅平險保障。`,
          },{
            name: "國泰人壽Hen幸福保險",
            volume: 24943, 
            rank: 2,
            note: `
請問您有信用卡嗎? 公司有個新活動，一通電話就可以 投保旅平險，保費可享77折比櫃台 投保還便宜，現在辦理完全免費，如果方便現在馬上幫你申辦開通資格好嗎？
一通電話就能讓您FUN心旅遊 
1.省力－只要塡申請書，不需任何手續費。 
2.省錢－一人申辦，約定之配偶、父母、子女電話投保同享77折費率 。
3.省時－出發前1小時撥打0800-036-599輕鬆投保。
4.貼心－365天24小時全年無休，一通電話即可享旅平險保障。`,
          },{
            name: "國泰人壽Hen幸福保險",
            volume: 24943, 
            rank: 3,
            note: `
請問您有信用卡嗎? 公司有個新活動，一通電話就可以 投保旅平險，保費可享77折比櫃台 投保還便宜，現在辦理完全免費，如果方便現在馬上幫你申辦開通資格好嗎？
一通電話就能讓您FUN心旅遊 
1.省力－只要塡申請書，不需任何手續費。 
2.省錢－一人申辦，約定之配偶、父母、子女電話投保同享77折費率 。
3.省時－出發前1小時撥打0800-036-599輕鬆投保。
4.貼心－365天24小時全年無休，一通電話即可享旅平險保障。`,
          }]
        },
      }
    }
  },
}
</script>
