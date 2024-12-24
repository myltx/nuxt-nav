<script setup lang="ts">
import { getNoTokenCategories } from '~/api/categories'
import { getNoTokenTags } from '~/api/tag'
import { getNoTokenWebsites } from '~/api/website'

const categorys = ref([])
const tags = ref([])
const activeTab = ref(0)
const websites = ref([])

const onChangeTab = (id: number) => {
  console.log(id)
  activeTab.value = id
}

const getSelectData = () => {
  getNoTokenCategories({}).then((res) => {
    categorys.value = res.data.map((item) => {
      return {
        ...item,
        label: item.name,
        value: item.id,
      }
    })
    if (res.data.length) {
      activeTab.value = res.data[0].id
    }
  })
  getNoTokenTags({}).then((res) => {
    tags.value = res.data
  })
  getNoTokenWebsites({}).then((res) => {
    websites.value = res.data
  })
}

const goLink = (url: string) => {
  window.open(url, '_blank')
}
onMounted(async () => {
  getSelectData()
})
</script>

<template>
  <div class="mt-2">
    <div class="b-b-1 b-#eee py-5 flex items-center my-2 mx-2">
      <div
        v-for="tab in categorys"
        :key="tab.id"
        class="p-5 cursor-pointer h-10 rounded-5 flex items-center justify-center mr-3 shadow hover:text-blue hover:font-500"
        :class="[tab.id === activeTab ? 'text-blue-500 border-blue-500 font-500' : 'text-gray-500 border-gray-500',
                 $colorMode.value === 'dark' ? 'b-1 b-#fff' : '']"
        @click="onChangeTab(tab.id)"
      >
        {{ tab.name }}
      </div>
    </div>
    <div class="mt-5">
      <div class="flex flex-wrap">
        <div
          v-for="item in websites"
          :key="item.id"
          class="w-1/5 cursor-pointer item"
          @click="goLink(item.url)"
        >
          <div
            class="p-2"
          >
            <div
              class="rounded-lg shadow overflow-hidden"
              :class="[$colorMode.value === 'dark' ? 'b-1 b-gray-500' : '']"
            >
              <div class="p-4 h-30">
                <div class="flex items-center">
                  <img
                    :src="item.logo"
                    alt=""
                    class="w-10 h-10 rounded-full mr-4"
                  >
                  <div>
                    <h2 class="text-4 font-bold mb-1">
                      {{ item.title }}
                    </h2>
                    <div class="text-gray-500 text-3">
                      {{ item.websiteTags?.map(item => item.tags).map(item => item.name).join('、') }}
                    </div>
                  </div>
                </div>
                <div>
                  <p class="text-slate-500 text-3 mt-2 font-500 tracking-1px overflow-hidden line-clamp-2">
                    {{ item.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  background-color: #fff;
  color: rgba(0,0,0,0.8);
}
.dark-mode body {
  background-color: #091a28;
  color: #ebf4f1;
}
.sepia-mode body {
  background-color: #f1e7d0;
  color: #433422;
}
.item:hover {
  transform: scale(1.05);
  transition: transform 0.2s ease-in-out;
}
</style>
