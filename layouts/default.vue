<script lang="ts" setup>
import { useAuthStore } from '~/stores/authStore';
import { useRouter, useRoute } from 'vue-router';
import { ref, watch, onMounted } from 'vue';
import { AuthService } from '~/services/AuthService';
import { setAxiosAuthToken } from '~/libs/axios';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

useHead({
  title: 'Auth App',
})

const publicRoutes = new Set(['/auth/login', '/auth/register']);
const isPublicRoute = ref(false);

const verifyAuth = async () => {
  isPublicRoute.value = publicRoutes.has(route.path);

  if (isPublicRoute.value) return;
  
  try{
    const token = getAuthToken();
    setAxiosAuthToken(token as string);

    await AuthService.validateToken();

    authStore.login(token as string);
  } catch (error) {
    authStore.logout();
    setAxiosAuthToken('');
    
    router.push('/auth/login');
  }
};

onMounted(verifyAuth);

watch(() => route.path, verifyAuth);
</script>

<template>
  <div class="w-full max-w-4xl p-4 mx-auto" v-if="authStore.isLoggedIn || isPublicRoute">
    <slot />
    <UNotifications />
  </div>
</template>