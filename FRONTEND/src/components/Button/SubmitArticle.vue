<template>
  <button
    @click="$router.push({ name: 'submitArticle' })"
    type="button"
    class="focusable clickableMain my-4 inline-flex items-center rounded-md p-2 text-sm font-medium"
  >
    {{ $t('component.SUBMIT_ARTICLE.submit') }}
  </button>
</template>