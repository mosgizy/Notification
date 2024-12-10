<script setup>
import { computed, onMounted, ref } from 'vue'
import Nav from './components/Nav.vue'

const notificationRef = ref([])
const isNotification = ref(false)

const fetchNotifications = async () => {
  try {
    const response = await fetch('http://localhost:3000/notifications')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    notificationRef.value = data
  } catch (error) {
    console.error('Failed to fetch notifications:', error)
  }
}

const postNotification = async () => {
  try {
    const response = await fetch('http://localhost:3000/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: '<span>Asterisk</span> commented on your picture',
        icon: '/images/avatar-kimberly-smith.webp',
        type: 'comment',
        read: true,
        time: '2weeks ago',
        id: 12,
      }),
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    notificationRef.value.unshift(data)
  } catch (error) {
    console.error('Failed to post notification:', error)
  }
}

const markAllAsread = () => {
  notificationRef.value = notificationRef.value.map((notification) => ({
    ...notification,
    read: true,
  }))
}

const numberofUnread = computed(() => {
  return notificationRef.value.filter((notification) => !notification.read).length
})

const toggleNotification = () => (isNotification.value = !isNotification.value)

onMounted(() => {
  fetchNotifications()
})
</script>

<template>
  <main class="bg-primary-300 min-h-screen pb-10 px-4">
    <Nav :toggleNotification="toggleNotification" />

    <section
      v-if="isNotification"
      class="bg-white px-4 lg:px-8 py-10 lg:max-w-[60%] mx-auto rounded-2xl mt-6"
    >
      <div class="flex items-center justify-between">
        <div class="flex gap-2 items-center text-lg text-secondary-500 font-bold"><span>Notifications</span> <span class="bg-secondary-500 px-[10px] py-[1.5px] rounded text-white text-xs">{{ numberofUnread }}</span></div>
        <div
          @click="markAllAsread"
          class="text-sm cursor-pointer font-bold text-secondary-200 hover:text-secondary-500"
        >Mark all as read</div>
      </div>
      <section>
        <div class="mt-9 flex flex-col gap-3">
          <div
            v-for="notification in notificationRef"
            :key="notification.id"
            :class="notification.read ? '' : 'bg-primary-100' "
            class="px-4 lg:px-6 py-4 rounded-md flex gap-5 text-secondary-200"
          >
            <div class="w-14 h-14 rounded-full">
              <img
                :src="notification.icon"
                alt="avatar"
              >
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <div
                  v-html="notification.title"
                  class="[&_span]:font-bold [&_span]:text-secondary-300 [&_span:hover]:text-secondary-500 [&_span]:cursor-pointer [&_.react]:text-secondary-200"
                >
                </div>
                <span
                  v-if="!notification.read"
                  class="w-2 h-2 bg-secondary-400 rounded-full block"
                ></span>
              </div>
              <div>{{notification.time}}</div>
              <div
                v-if="notification.message"
                class="border border-secondary-100 hover:border-primary-300 hover:bg-primary-300 rounded-md px-5 py-3 mt-3 text-secondary-100 hover:text-secondary-200 font-bold cursor-pointer"
              >
                {{ notification.message }}
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  </main>
</template>

