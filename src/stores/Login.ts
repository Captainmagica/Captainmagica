import { fa } from "element-plus/es/locales.mjs";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useLoginStore = defineStore('login', () => {
    const user = reactive({
        id: '',
        username: '',
        password: '',
        name: '',
        email: '',
        phone_number: '',
        role: '',
    })
    const image_data = ref('')
    const isLoggedIn = ref(false)

    const setLoggedIn = (status: boolean)=>{
        isLoggedIn.value = status
    }
    return{
        user,
        image_data,
        isLoggedIn,
        setLoggedIn
    }
})