import {createStore} from 'vuex'
import router from "../router/index"
import ENUM from "../enums"


const firebase = require('../firebaseCfg.js');

export default createStore({
    state: {
        allItems: [], //Array of all items in our database
        finishedItems:[], // Filtered array for items that's quantity is 0
        finishSoonItems:[], //Filtered array for items that's quantity if less then 10 and more then 1
        apiState: ENUM.INIT,
        events: [],
        currentUserEmail: "",
        filter: 0,
        //Categories list
        categories: ["kitchen", "bar", "consumables", "cleaning", "other"], //All existing categories array
        AllItemNamesList: [],
        saveResultMessage: ""
    },
    mutations: {
        SetFinishedItems: (state, arr) => {
            state.finishedItems = []
            state.finishedItems = arr
        },
        SetFinishSoonItems: (state, arr) => {
            state.finishSoonItems = []
            state.finishSoonItems = arr
        },
        SetAllItems: (state, arr) => {
            state.allItems = []
            state.allItems = arr
        },
        saveResultMessage: (state, message) => {
            state.saveResultMessage = message
        },

        //Save current user logged email
        setLoggedAsEmail:(state, email) => {
            state.currentUserEmail = email
        },
        removeEmailAfterLogout(state){
            state.currentUserEmail = ""
        },

        //Set products filter state
        setFilter: (state, event) => {
            state.filter = event.target.value
        },



        //Add All items names to state
        AddItemNames: (state, data) => {
            if (state.AllItemNamesList.length) {
                state.AllItemNamesList = []
            }
            state.AllItemNamesList.push(...data)
        },
        //Save new item name to firebase
        addItemNameToList: (state, item) => {
            firebase.itemNamesCollection
                .add(item)
                .then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
        },
        SetChartData(state, arr){
            state.chartData = []
            state.chartData = arr
        },

        setUserProfile(state, val) {
            state.userProfile = val
          }
    },
    actions: {
        async login({ commit }, form) {
            // sign user in
            await firebase.auth.signInWithEmailAndPassword(form.email, form.password)
                .then(userCredential => {
                    commit("setLoggedAsEmail", userCredential.user.email)
                })
                .then(()=> router.push('/'))
                .catch(() => alert("Wrong Username or Password, please try again"))
          },
        //register new user
        async Register({commit}, form){

          firebase.auth.createUserWithEmailAndPassword(form.email, form.password)
          .then((userCredential) => {
            // Signed in
            commit("setLoggedAsEmail", userCredential.user.email)
              //redirect
              router.push('/')
            // ...
          })
          .catch((error) => {
            console.log(error)
          });
        },
        //User logout action
        logout({commit}){
            firebase.auth.signOut().then(() => {
                commit("removeEmailAfterLogout")
              console.log("User logout")
            }).catch((error) => {
              console.log("Error", error)
            });
            router.push('/login')
        },

        getAllEvents({state}){
            state.events = []
            firebase.logCollection.orderBy("timeStamp")
                .onSnapshot((querySnapshot) => {
                querySnapshot.forEach(event => {
                    state.events.push(event.data())
                })
                    state.events.reverse()
            })
        },

        //Get all items from firebase
        getAndSetAllItems({state, dispatch}){
            state.apiState = ENUM.LOADING
                firebase.productsCollection
                .onSnapshot((querySnapshot) => {
                                const allItems = []
                    querySnapshot.forEach((doc) => {
                        allItems.push(doc.data())
                    });
                //Commit to store all items array
                    dispatch("setAllItems", allItems)
                });
        },
         //Save all items and filter it
        setAllItems({commit,state}, arr){
            console.log(arr)
            const finishSoon = []
            const finished = []
            //Get all items that's finish soon and write to array
            arr.forEach(item => {
                    if (parseInt(item.quantity) < 10 && parseInt(item.quantity) >= 1) {
                        finishSoon.push(item)
                    }
                })
            //Get all already finished items and write to array
            arr.forEach(item => {
                    if (parseInt(item.quantity) === 0) {
                        finished.push(item)
                    }
                })
            //Save
            setTimeout(() => state.apiState = ENUM.LOADED,1000)  //Set state to LOADED for remove loader and show content
            commit("SetAllItems", arr)
            commit("SetFinishSoonItems", finishSoon)
            commit("SetFinishedItems", finished)
        },

        //Save event do database log
        writeLog({ctx}, payload){
            console.log(ctx)
            firebase.logCollection
                .doc(payload.id)
                .set({
                    id: payload.id,
                    event: payload.event,
                    date:Date().substr(4,20),
                    timeStamp: Date.now()
                })
                .then(() => console.log("Success"))
                .catch((error) => console.log(error))

        },

         //Add item to firebase storage
        async addItemToStorage({state,dispatch}, payload) {
            //Check for each product in payload is it already exist in storage database
            payload.forEach((product) => {
                firebase.productsCollection
                    .doc(product.data.idx)
                    .get()
                    .then((doc) => {
                        //If have document with current index we update quantity
                        if (doc.exists) {
                            //Add new product quantity to existing quantity
                            let newQuantity = parseInt(doc.data().quantity) + parseInt(product.quantity)
                            firebase.productsCollection
                                .doc(product.data.idx)
                                .set({
                                    data: {
                                        idx: product.data.idx,
                                        name: product.data.name,
                                        category: product.data.category,
                                    },
                                    quantity: newQuantity,
                                })
                                .then(() => {
                                    dispatch("writeLog", {id: product.data.idx, event: `Product '${product.data.name}' add quantity successfully! `})
                                    state.saveResultMessage = ("Product add quantity successfully!");
                                })
                                .catch((error) => {
                                    dispatch("writeLog", {id: product.data.idx, event: `Error overwriting document: '${product.data.name}'`})
                                    state.saveResultMessage = (`Error overwriting document: '${error}'`);
                                });
                        }
                        //If not exist we write as new document
                        else {
                            firebase.productsCollection
                                .doc(product.data.idx)
                                .set(product)
                                .then(() => {
                                    dispatch("writeLog", {id: product.data.idx, event: `Add new product '${product.data.name}' to storage`})
                                    state.saveResultMessage = ("Add new product to storage successfully!");
                                })
                                .catch((error) => {
                                    dispatch("writeLog", {id: product.data.idx, event: `Error writing document:  '${product.data.name}'`})
                                    state.saveResultMessage = (`Error writing document: '${error}'`);
                                });
                        }
                    }).catch((error) => {
                    state.saveResultMessage = (`Error getting document: '${error}'`);
                });
            })
            //Remove message after 2 second
            setTimeout(() => state.saveResultMessage = "", 2000)
        },
    },
    modules: {},
    getters: {
        GetAllItems(state){
            return state.allItems
        },
        GetFinishSoonItems(state){
            return state.finishSoonItems
        },
        //Get all finished items (items with 0 quantity)
        GetFinishedItems(state){
            return state.finishedItems
        },
        //Get data for Doughnut chart
        GetChartData(state){
            return [state.finishedItems.length, state.allItems.length ]
        },
        //Get all products from array
        GetFilterState(state) {
            return state.filter
        },
        GetAllCategories(state) {
            return state.categories
        },
        //Get all items names from state
        GetAllItemNamesList(state) {
            return state.AllItemNamesList
        },
        //Get messages to page
        saveResultMessage(state) {
            return state.saveResultMessage
        },
        LoggedWithEmail(state){
            return state.currentUserEmail
        },
        GetAllEvents(state){
            return state.events
        },

        GetApiState(state){
            return state.apiState
        }

    },

})
