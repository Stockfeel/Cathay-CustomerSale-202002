<template>
  <Footer>
    <ButtonWrapper wrapperAlign="center">
      <Button :class="editStatus === 'accept' || !isEdit ? '' : 'lock'" bgColor="#05b077" data-reply="accept" @click="onReply" data-cy="accept" >接受</Button>
      <Button :class="editStatus === 'notime' || !isEdit ? '' : 'lock'" bgColor="#efbd00" data-reply="notime" @click="onReply">沒時間</Button>
      <Button :class="editStatus === 'reject' || !isEdit ? '' : 'lock'" bgColor="#616161" data-reply="reject" @click="onReply">拒絕</Button>
      <Button bgColor="#05b077" @click="goToIntroduce">轉介</Button>    
    </ButtonWrapper>
    <ScrollIn v-if="isEdit">
      <Textarea />
      <TimeFormWrapper>
        <FormInput inputBasis="20%">
          <input id="isBook" type="checkbox" v-model="isBook"/>
          <label for="isBook">預約聯絡</label>
        </FormInput>
        <FormInput v-if="isBook" inputBasis="50%">
          <span>寄送時間</span>
          <input type="date" />
        </FormInput>
      </TimeFormWrapper>
      <div class="input__button">
        <Button bgColor="#05b077" @click="onSend">
          <LinkStyle>送出</LinkStyle>
        </Button>
        <Button 
          @click="onCancel"
          bgColor="#fff" 
          textColor="#05b077"
          borderColor="#05b077"
        >
          <LinkStyle textColor="#05b077">稍後再填</LinkStyle>
        </Button>
      </div>
    </ScrollIn>
  </Footer>
</template>
<script>
import Textarea from './textarea';
import { 
  Button, 
  LinkStyle, 
  ButtonWrapper, 
  ScrollIn, 
  FormInput, 
  Footer, 
  FormWrapper } from  "../../style";
import styled from 'vue-styled-components';

const TimeFormWrapper = styled(FormWrapper)`
  margin-top: 20px;
  display: flex;
  align-items: center;
  span {
    margin-right: 20px;
  }
`

export default {
  name: 'Reply',
  data() {
    return {
      isBook: false,
    }
  },
  components: {
    Textarea,
    Button,
    LinkStyle,
    ButtonWrapper,
    ScrollIn,
    FormInput,
    Footer,
    TimeFormWrapper
  },
  methods: {
    goToIntroduce() {
      this.$router.push('/introduce');
    }
  },
  props: {
    editStatus: {
      type: String,
      default: () => null
    },
    isEdit: {
      type: Boolean,
      default: () => false
    },
    onSend: {
      type: Function,
      required: true
    },
    onCancel: {
      type: Function,
      required: true
    },
    onReply: {
      type: Function,
      required: true
    }
  }
}
</script>
