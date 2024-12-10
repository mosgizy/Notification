<script setup>
defineProps(['toggleNotification'])
</script>

<template>
  <nav class="py-4 px-6">
    <div class="flex items-center justify-between px-12 py-5 bg-white shadow-lg rounded-2xl">
      <div class="font-bold">My Notification</div>
      <div>
        <img
          src="/icons/bell.png"
          alt="notification"
          class="w-6 h-6 cursor-pointer"
          @click="toggleNotification"
        >
      </div>
    </div>
  </nav>
</template>


<style>
</style>