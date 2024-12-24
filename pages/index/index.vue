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
    <!-- <UTabs
      :items="categorys"
      @change="onChange"
    /> -->
    <div class="b-b-1 b-#eee py-5 flex items-center my-2">
      <div
        v-for="tab in categorys"
        :key="tab.id"
        class="p-5 cursor-pointer b-1 b-#666 h-10 rounded-5 flex items-center justify-center mr-5"
        :class="[tab.id === activeTab ? 'text-blue-500 border-blue-500' : 'text-gray-500 border-gray-500']"
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
          class="w-1/3 cursor-pointer item"
          @click="goLink(item.url)"
        >
          <div class="p-2">
            <div
              class="rounded-lg shadow-md overflow-hidden"
            >
              <div class="p-4 flex items-center">
                <img
                  :src="item.logo"
                  alt=""
                  class="w-16 h-16 rounded-full mr-4"
                >
                <div>
                  <h2 class="text-xl font-bold mb-2">
                    {{ item.title }}
                  </h2>
                  <p class="text-gray-600">
                    {{ item.description }}
                  </p>
                  <div class="text-gray-500 mt-2 text-sm">
                    {{ item.websiteTags?.map(item => item.tags).map(item => item.name).join('、') }}
                  </div>
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
