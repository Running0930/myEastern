<template>
  <div class="type-nav" @mouseleave="showOrHideList(false)">
    <div class="container">
      <div>
        <h2 class="all" @mouseenter="showOrHideList(true)">全部商品分类</h2>
        <a href="#" class="traval">
          <span>
            旅游度假
          </span>
        </a>
        <!-- 三级分类导航 -->
        <div
          :style="isShowList ? 'display:block' : 'display:none'"
          class="sort"
          @mouseenter="showOrHideNav(true)"
          @mouseleave="showOrHideNav(false)"
        >
          <div class="all-sort-list2">
            <div class="item" v-for="(first, index) in navInfo" :key="index">
              <!-- 一级分类信息 -->
              <h3 @mouseenter="changeCurrentNavIndex(index)">
                <a href="javascript:;">{{ first.Name }}</a>
              </h3>
              <div
                class="item-list clearfix"
                :style="isShowNav ? 'display:block' : 'display:none'"
              >
                <div class="subitem">
                  <!-- 二级分类信息 -->
                  <dl class="fore" v-for="(second, index) in navInfo[currentNavIndex].Subset"
                    :key="index">
                    <dt>
                      <a href="javascript:;">{{ second.Name }}</a>
                    </dt>
                    <!-- 三级分类信息 -->
                    <dd>
                      <em v-for="(third, index) in second.Subset" :key="index">
                        <a href="javascript:;">{{ third.Name }}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {reqNavInfo} from '@/api'
export default {
  name: "TypeNav",
  data() {
    return {
      isShowNav: false,
      isShowList: true,
      navInfo: [],
      currentNavIndex: 0,
    };
  },
  mounted(){
this.getNavInfo();
  },
  watch: {
    $route: {
      immediate: true,
      deep: true,
      handler() {
        this.$route.path === "/"
          ? (this.isShowList = true)
          : (this.isShowList = false);
      },
    },
  },
  methods: {
    // 展示或隐藏分类选择栏
    showOrHideNav(flag) {
      flag ? (this.isShowNav = true) : (this.isShowNav = false);
    },
    // 展示或隐藏列表栏
    showOrHideList(flag) {
      if (!(this.$route.path === "/")) {
        // console.log(flag);
        flag ? (this.isShowList = true) : (this.isShowList = false);
      }
    },
    // 获取导航栏信息
    async getNavInfo() {
      const result = await reqNavInfo();
      // console.log(result.data.Data)
      this.navInfo = result.data.Data;
      
    },
    // 改变导航下标
    changeCurrentNavIndex(index) {
      this.currentNavIndex = index;
    },
  },
};
</script>
<style lang="less">
.type-nav {
  // background: #fff;
  border-bottom: 2px solid #223b61;
  height: 45px;
  .container {
    width: 1200px;
    // width: 100%;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #223b61;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .traval {
      position: absolute;
      padding: 10px 20px;
      line-height: 23px;
      font-weight: 700;
      left: 200px;
      top: 0px;
      width: 135px;
      height: 45px;
      font-size: 16px;
      color: #444;
      text-align: center;
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 468px;
      background: rgba(255, 255, 255, 0.8);
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.item_on {
            background-color: #02a774;
            .item-list {
              display: block;
            }
          }
          &:hover {
            background-color: #f7f7f7;
            border-right: 1px solid transparent;
          }
        }
      }
    }
  }
}
</style>
