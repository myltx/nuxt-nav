<template>
  <div class="h-full">
    <div
      class="shadow p-2 rounded-2"
      :class="$colorMode.value === 'dark' ? 'bg-black' : 'bg-white'"
    >
      <div class="flex items-center">
        <div>
          <UInput
            v-model="value"
            placeholder="请输入名称"
            class="mr-4"
          />
        </div>
        <div>
          <UButton
            color="gray"
          >
            重置
          </UButton>
          <UButton class="mx-2">
            查询
          </UButton>
          <UButton @click="openEditModalFn">
            新增
          </UButton>
        </div>
      </div>
    </div>
    <div
      class="shadow p-2 rounded-2 mt-2 h-84%"
      :class="$colorMode.value === 'dark' ? 'bg-black' : 'bg-white'"
    >
      <UTable
        :rows="people"
        :columns="columns"
        :loading="loading"
      />
    </div>
    <div
      class="shadow p-2 rounded-2 mt-2"
      :class="$colorMode.value === 'dark' ? 'bg-black' : 'bg-white'"
    >
      <UPagination
        v-model="page"
        :page-count="5"
        :total="items.length"
      />
    </div>
    <!-- 提交表单 -->
    <UModal
      v-model="openEditModal"
      prevent-close
    >
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              编辑
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="closeEditModalFn"
            />
          </div>
        </template>
        <div>
          <UForm
            ref="form"
            :validate="validate"
            :state="state"
            class="space-y-4"
          >
            <UFormGroup
              label="分类名称"
              name="name"
            >
              <UInput v-model="state.name" />
            </UFormGroup>
          </UForm>
        </div>
        <template #footer>
          <div class="flex items-center justify-end">
            <UButton
              class="mr-2"
              color="gray"
              @click="closeEditModalFn"
            >
              取消
            </UButton>
            <UButton @click="onSubmit">
              提交
            </UButton>
          </div>
        </template>
        <Placeholder class="h-32" />
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import type { FormError } from '#ui/types'
import { getTags, addTag } from '~/api/tag'

definePageMeta({
  layout: 'admin',
})

const state = reactive({
  name: undefined,
})
const value = ref('')
const form = ref()
const page = ref(1)
const items = ref(Array(55))
const openEditModal = ref(false)

const openEditModalFn = () => {
  openEditModal.value = true
}
const closeEditModalFn = () => {
  form.value?.clear()
  openEditModal.value = false
}

const loading = ref(true)
const people = ref([])
const columns = ref([{
  key: 'name',
  label: '分类名称',
},
{
  key: 'created_at',
  label: '创建时间',
},
{
  key: 'updated_at',
  label: '更新时间',
},
{
  key: 'action',
  label: '操作',
  width: 100,
  align: 'center',
},

])

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.name) errors.push({ path: 'name', message: '请输入' })
  return errors
}

async function onSubmit() {
  // Do something with data
  const submitData = await form.value.validate()
  const data = await addTag(submitData)
  console.log(data)
  closeEditModalFn()
  getList()
}

// 这里获取列表数据
onMounted(() => {
  getList()
})

const getList = async () => {
  loading.value = true
  try {
    const data = await getTags({})
    if (data.code === 200) {
      people.value = data.data
    }
    loading.value = false
  }
  catch (err) {
    loading.value = false
  }
}
</script>

      <style scoped>

      </style>
