const state = {
    name_cn:''
};
const mutations = {
    GETNAMECN(state,name_cn){
        state.name_cn=name_cn
    },
    LOGOUT(state){
        state.name_cn=''
    }
};
const actions = {
 
};
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
};
