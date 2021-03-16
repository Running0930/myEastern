<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="商品介绍 " name="first">
      <div v-html="detailList.pc_view_desc"></div>
    </el-tab-pane>
    <el-tab-pane label="规格参数 " name="second" class="detailList"
      >配置管理</el-tab-pane
    >
    <el-tab-pane label="包装清单" name="third" class="detailList">
      {{ detailList.recommend_desc }}
    </el-tab-pane>
    <el-tab-pane label="售后保障" name="fourth" class="detailList">
      <div v-html="detailList.warranty"></div>
    </el-tab-pane>
    <el-tab-pane label="购买须知" name="footer" class="detailList"
      >手机主机/手机保护/电源适配器/Type-C 数据线/插针/入门指南/三包凭证
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  name: "Bottap",
  data() {
    return {
      activeName: "first"
    };
  },
  props: ["detailList"]
};
</script>
<style lang="less" scoped>
.detailList {
  text-align: left;
}
</style>
