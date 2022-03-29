<template>
<div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
        <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Send Issue</h2>
        </div>
        <form class="mt-8 space-y-6" action="#" method="POST" @submit.prevent="sendIssue">
        <div class="rounded-md shadow-sm -space-y-px">
            <div>
                <input v-model="form.email" id="email" name="email" type="email" autocomplete="issue" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email">
            </div>
            <div>
                <textarea v-model="form.issue" id="issue" name="issue" autocomplete="issue" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Issue"></textarea>
            </div>
        </div>

        <div>
            <button :disabled="loading" :class="[loading ? 'opacity-25 pointer-events-none' : null]" type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Send
            </button>
        </div>
        </form>
    </div>
</div>
</template>
<script setup>
import { ref } from 'vue'
import API from '@/services/api'

const session = JSON.parse(localStorage.getItem('session'))

const email = ref()
const form = ref({
    issue: null,
    email: session ? session.email : null
})
const loading = ref(false)

async function sendIssue() {
    loading.value = true

    try {
        const response = await API.post('/issues', form.value)
        loading.value = false
        form.value.issue = null
    } catch (e) {
        loading.value = false
    }
}
</script>
