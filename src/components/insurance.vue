<template>
  <Modal :autoHeight="true">
    <Header>
      <router-link to='./'>
        <CloseButton/>
      </router-link>
      <Tab>
        <Title textAlign='center' :class="tab == 'suggest' ? 'active': ''" @click="tab = 'suggest'">商品推薦</Title>
        <span>|</span>
        <Title textAlign='center' :class="tab == 'hottest' ? 'active': ''" @click="tab = 'hottest'">熱銷商品</Title>
      </Tab>
    </Header>
    <InsuranceLayout v-if="tab == 'suggest'">
      <InsuranceSection />
      <section>
        <Product 
          :state="tab"
          v-for="(item, idx) in suggest" :key="`product-${idx}`" 
          class="insurance__item">
          <div class="item__name">{{ item.name }}</div>
          <p class="item__link">
            <span>詳細資訊</span>
            <Icon :iconUrl="require('../assets/icon-arrow-dark-down.svg')"/>
          </p>
          <StarIcon v-if="item.word" 
            :iconUrl="require('../assets/star.svg')" 
            :word="item.word" :size="30" 
          />
        </Product>
      </section>
    </InsuranceLayout>
    <InsuranceLayout v-if="tab == 'hottest'">
      <section v-for="(item, idx) in Object.keys(hottest)" :key="`section-${idx}`">
        <div class="section__title">{{ item }}</div>
        <p>註：{{ hottest[item].note }}</p>
        <Product 
          v-for="(product, idx) in hottest[item].products" 
          :key="`hottest-${idx}`" 
          :class="idx === hottest[item].isShow ? 'active' : ''"
        >
          <div class="item__name">{{ product.name }}</div>
          <p class="item__link">
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
              v-if="hottest[item].isShow !== idx"
              @click="hottest[item].isShow = hottest[item].isShow === idx ? -1 : idx" 
            />
            <Icon 
              :iconUrl="require('../assets/button_more.svg')" 
              :size="30" 
              :rotate="-90"
              v-if="hottest[item].isShow === idx"
              @click="hottest[item].isShow = hottest[item].isShow === idx ? -1 : idx" 
            />
          </div>
        </Product>
        <div class="section__show" v-if="hottest[item].isShow !== -1">
          <main>
            <Information :profile="profile" :product="hottest[item].products[hottest[item].isShow]"/>
          </main>
          <Footer>
            <ButtonWrapper>
              <Button :class="isEdit ? 'lock' : ''" bgColor="#05b077" @click="isAccept = !isAccept">接受</Button>
              <Button :class="isEdit ? 'lock' : ''" bgColor="#efbd00" @click="backTo()">沒時間</Button>
              <Button bgColor="#616161" @click="isEdit = !isEdit">拒絕</Button>
            </ButtonWrapper>
            <ScrollIn v-if="isAccept">
              <p>請選擇轉介對象</p>
              <ButtonWrapper>
                <DropDown 
                  text="配對顧問"
                  :list="[{
                    text: '原顧問',
                    slug: 'introduce?type=current&cat=consult'
                  }, {
                    text: '新顧問',
                    slug: 'introduce?type=new&cat=consult'
                  }]" 
                />
                <DropDown 
                  text="諮詢客服"
                  :list="[{
                    text: '客服顧問',
                    slug: 'introduce?type=new&cat=service'
                  }, {
                    text: '本次客服',
                    slug: 'introduce?type=current&cat=service'
                  }]" 
                />
              </ButtonWrapper>
            </ScrollIn>
            <ScrollIn v-if="isEdit">
              <Textarea />
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
        </div>
      </section>
    </InsuranceLayout>
    <ButtonWrapper>
      <Button>官網更多商品</Button>
    </ButtonWrapper>
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
  LinkStyle,
  ScrollIn,
} from "../style";
import InsuranceSection from "./insuranceSection";
import styled from 'vue-styled-components';
import Information from './information';
import Textarea from './ui/textarea';
import DropDown from './ui/dropdown';


const productProps = { state: String, isShow: Number } 
const Product = styled('div', productProps)`
  position: relative;
  background: ${props => props.state == "suggest" ? "#e26c6c" : "#07c5c8"};
  color: white;
  width: 165px; 
  height: 150px;
  padding: 20px 20px 0 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px 0 rgba(226, 108, 108, 0.3);
  &.active {
    box-shadow: 0 4px 29px 0 rgba(0, 159, 161, 0.5);
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
  section {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 20px;
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
      margin-top: 50px;
      height: 50%;
      background: rgba(227, 250, 250, 0.5);
      width: 100%;
      padding: 20px;
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
    LinkStyle,
    ScrollIn,
    Textarea,
    DropDown
  },
  methods: {
    backTo() {
      this.$router.push('/')
    },
    toCurrency(num){
      let parts = num.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.');
    }
  },
  data() {
    return {
      tab: "suggest",
      isEdit: false,
      isAccept: false,
      noteInput: '',
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
      }, {
        name: "國泰人壽新留學御守傷害保險(IG3)", 
        id: 1,
      }, {
        name: "國泰人壽新留學御守傷害保險(IG3)", 
        id: 2,
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
