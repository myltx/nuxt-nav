<script setup lang="ts">
import { getCategories } from '~/api/categories'
import { getTags } from '~/api/tag'
import { getWebsitesNoPage } from '~/api/website'

const categorys = ref([])
const tags = ref([])
const websites = ref([])

const onChange = (index: number) => {
  console.log(index)
}

const getSelectData = () => {
  getCategories({}).then((res) => {
    categorys.value = res.data.map((item) => {
      return {
        ...item,
        label: item.name,
        value: item.id,
      }
    })
  })
  getTags({}).then((res) => {
    tags.value = res.data
  })
  getWebsitesNoPage({}).then((res) => {
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
    <UTabs
      :items="categorys"
      @change="onChange"
    />
    <div>
      <div class="flex flex-wrap">
        <div
          v-for="item in websites"
          :key="item.id"
          class="w-1/3 cursor-pointer item"
          @click="goLink(item.url)"
        >
          <div class="p-2">
            <div class="bg-white rounded-lg shadow-md overflow-hidden">
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
