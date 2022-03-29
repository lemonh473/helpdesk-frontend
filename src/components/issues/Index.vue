<template>
    <div v-if="!loading" class="relative overflow-x-auto shadow-md my-4 mx-2">
        <select class="w-20 border my-1 rounded" v-model="filter" @change="getList">
            <option v-for="(option, key) in options" :value="key">{{ option }}</option>
        </select>
        <table class="w-full text-sm text-left text-gray-500 light:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 light:bg-gray-700 light:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Issue
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Answer
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Status
                    </th>
                    <th scope="col" class="px-6 py-3">
                        <span class="sr-only">Answer</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, key) in items" :key="key" class="bg-white border-b light:bg-gray-800 light:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 light:text-white whitespace-nowrap">
                        {{ item.issue }}
                    </th>
                    <td class="px-6 py-4">
                        {{ item.answer || '--' }}
                    </td>
                    <td class="px-6 py-4">
                        {{ item.status }}
                    </td>
                    <td class="px-6 py-4 text-right">
                        <a v-if="userRole === 2" href="#" class="font-medium text-blue-600 light:text-blue-500 hover:underline">Mark as solved</a>
                        <router-link v-if="userRole === 1" :to="{name: 'Edit', params: {id: item.id}}" class="font-medium text-blue-600 light:text-blue-500 hover:underline">Answer</router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-else class="animate-pulse bg-gray-100 px-1 py-2">Loading...</div>
</template>
<script setup>
import { ref, computed } from 'vue'
import API from '@/services/api'

const form = ref({
    issue: null,
})
const loading = ref(true)
const items = ref([])
const filter = ref(null)
const options = ref([])

const user = JSON.parse(localStorage.getItem('session'))
const userRole = user.role || 1

async function getList() {
    loading.value = true

    try {
        const response = await API.get('/issues', {
            params: {
                filter: filter.value
            }
        })
        loading.value = false
        
        items.value = response.data.list.data
        options.value = response.data.options
    } catch (e) {
        loading.value = false
    }
}

getList()
</script>
