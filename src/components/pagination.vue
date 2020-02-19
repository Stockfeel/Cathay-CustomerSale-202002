<template>
  <PaginationLayout>
    <img src="../assets/icon-pagination-previous-ten.svg" />
    <img src="../assets/icon-pagination-previous.svg" />
    <span v-for="(page, idx) in prevPart" :key="`page-${idx}`">{{ page + 1 }}</span> 
    <span v-if="![1,2,length - 1,length].includes(page)">...</span>
    <span v-if="![1,2,length - 1,length].includes(page)">{{current}}</span>
    <span>...</span>
    <span v-for="(page, idx) in postPart" :key="`page-${idx}`">{{ page + 1 }}</span> 
    <img src="../assets/icon-pagination-next.svg" />
    <img src="../assets/icon-pagination-next-ten.svg" />
  </PaginationLayout>
</template>

<script>
import styled from 'vue-styled-components';

const paginationLayoutProps = {
  pageIdx: Number,
  currentPage: Number,
}
const PaginationLayout = styled('div', paginationLayoutProps)`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  > * {
    margin: 0 5px;
    font-size: 14px;
  }
  span {
    color: black
  }
`

export default {
  name: 'Pagination',
  props: {
    length: Number,
    current: Number
  },
  components: {
    PaginationLayout
  },
  data() {
    return {
      prevPart: Array.from(Array(this.length).keys()).slice(0, 2),
      postPart: Array.from(Array(this.length).keys()).slice(this.length - 2, this.length)
    }
  }
}
</script>
