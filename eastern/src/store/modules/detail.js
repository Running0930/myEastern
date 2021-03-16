import { reqDetail, reqClassification } from "../../api";

const state = {
  detailList: {},
  categoryView: {},
};
const mutations = {
  GETDETAILLIST(state, detailList) {
    state.detailList = detailList;
  },
  GETCLASSIFICATION(state, categoryView) {
    state.categoryView = categoryView;
  }
};
const actions = {
  async getdetailList({ commit }, skyId) {
    const result = await reqDetail(skyId);
    commit("GETDETAILLIST", result.data.Data);
  },
  async getClassification({ commit }, couponId) {
    const result = await reqClassification(couponId);
    commit("GETCLASSIFICATION", result.data.Data);
  }
};
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
};
