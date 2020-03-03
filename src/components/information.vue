<template>
  <InformationLayout>
    <p>話術</p>
    <pre>{{ product.note }}
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
  </InformationLayout>
</template>

<script>
import { 
  ButtonWrapper, 
  Button, 
  DropDownButton, 
  SwitchButton, 
  FormInput, 
  PopUp
} from "../style.js";
import styled from 'vue-styled-components';

const InformationLayout = styled.div`
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
  div.img__container {
    overflow: hidden;
    width: 90%; 
    height: 600px;
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
  name: "Information",
  components: {
    InformationLayout,
    ButtonWrapper,
    Button,
    DropDownButton,
    SwitchButton,
    PopUp,
    FormInput,
  },
  props: {
    profile: Object,
    product: Object
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
    }
  }
}
</script>
