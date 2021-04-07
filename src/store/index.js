import {createStore} from 'vuex'
import router from "../router/index"

const firebase = require('../firebaseCfg.js');

export default createStore({
    state: {
        //Array with all products existing at storage
        products: [],
        eventsArr: [{}],
        currentUserEmail: "",
        filter: 0,
        //Categories list
        categories: ["kitchen", "bar", "consumables", "cleaning", "other"],
        AllItemNamesList: [],
        saveResultMessage: ""
    },
    mutations: {
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

        //Minus items quantity from selected products
        takeItemsFromStorage(state, payload) {
            firebase.productsCollection
                .doc(payload.data.idx)
                .set(payload)
                .then(() => {
                    console.log("Item successfully taken from storage!");
                })
                .catch((error) => {
                    console.log("Error take item from storage: ", error);
                });
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
            // fetch user profile and set in state
            router.push('/')

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

        //Save event do database log
        writeLog({ctx}, payload){
            console.log(ctx)
            firebase.logCollection
                .doc(payload.id)
                .set({
                    id: payload.id,
                    event: payload.event,
                    date:Date().substr(4,20)
                })
                .then(() => console.log("Success"))
                .catch((error) => console.log(error))

        },
         //Add item to storage
        async addItemToStorage({state}, payload) {
            state.products = []
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
                                    state.saveResultMessage = ("Document overwrite successfully!");
                                })
                                .catch((error) => {
                                    state.saveResultMessage = (`Error overwriting document: ${error}`);
                                });
                        }
                        //If not exist we write as new document
                        else {
                            firebase.productsCollection
                                .doc(product.data.idx)
                                .set(product)
                                .then(() => {
                                    state.saveResultMessage = ("Document successfully written!");
                                })
                                .catch((error) => {
                                    state.saveResultMessage = (`Error writing document: ${error}`);
                                });
                        }
                    }).catch((error) => {
                    state.saveResultMessage = (`Error getting document: ${error}`);
                });
            })
            //Remove message after 2 second
            setTimeout(() => state.saveResultMessage = "", 2000)
        },
    },
    modules: {},
    getters: {
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
            return state.eventsArr
        }

    },

})
