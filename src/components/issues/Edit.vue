<template>
<div v-if="!loading" class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
        <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Issue ({{ item.status }})</h2>
        </div>
        <form class="mt-8 space-y-6" action="#" method="POST" @submit.prevent="answerIssue">
        <div class="rounded-md shadow-sm -space-y-px">
            <div>
            <p class="w-full font-semibold">Issue:</p>
            <p>{{ item.issue }}</p>
            </div>
            <div>
                <textarea v-model="form.answer" id="answer" name="answer" autocomplete="answer" required class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Answer"></textarea>
            </div>
        </div>

        <div>
            <button :disabled="loading" :class="[loading ? 'opacity-25 pointer-events-none' : null]" type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Answer
            </button>
        </div>
        </form>
    </div>
</div>
<div v-else class="animate-pulse bg-gray-100 px-1 py-2">Loading...</div>
</template>
<script setup>
import { ref } from 'vue'
import API from '@/services/api'
import { useRoute } from 'vue-router'

const item = ref(null)
const form = ref({
    answer: null,
    status: 1
})
const loading = ref(true)
const route = useRoute()

async function answerIssue() {
    loading.value = true

    try {
        const response = await API.put(`/issues/${route.params.id}`, form.value)
        loading.value = false
    } catch (e) {
        loading.value = false
    }
}

async function getIssue() {
    loading.value = true

    try {
        const response = await API.get(`/issues/edit/${route.params.id}`)
        loading.value = false
        item.value = response.data.issue
        form.value.answer = item.value.answer
    } catch (e) {
        loading.value = false
    }
}

getIssue()
</script>
