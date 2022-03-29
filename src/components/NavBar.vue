<template>
    <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
            <span class="font-semibold text-xl tracking-tight">
                <router-link :to="{name: 'Home'}">Helpdesk</router-link>
            </span>
        </div>
        <div v-if="!isLoggedIn" class="flex gap-2">
            <router-link :to="{name: 'Login'}" class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                Login
            </router-link>
            <router-link :to="{name: 'Register'}" class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                Register
            </router-link>
        </div>
        <div v-else  class="flex gap-2">
            <router-link :to="{name: 'Issues'}" class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                Issues
            </router-link>
            <a href="#" class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white" @click="logout">
                Logout
            </a>
        </div>
    </nav>
</template>
<script setup>
import { ref } from 'vue'
import API from '@/services/api'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoggedIn = ref(localStorage.getItem('session'))
const loading = ref(false)

async function logout() {
    loading.value = true
    try {
        await API.post('/logout')
        localStorage.removeItem('session')
        loading.value = false
        isLoggedIn.value = false
        router.push({name: 'Home'})
    } catch (e) {
        loading.value = false
    }
}
</script>