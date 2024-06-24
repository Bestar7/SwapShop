<template>
  <div class="p-2 flex justify-between">
    <div>
      <h3 class="font-medium text-gray-900">
        <!--router-link should be on the image + the text, not only here-->
        
          <!--<span aria-hidden="true" class="absolute inset-0" />-->
          {{ article.name }}
        
      </h3>
      <p class="mt-1 text-sm text-gray-500">
        {{ article.category.category }}
      </p>
      <p class="mt-1 text-sm text-gray-500">
        {{ article.category.subcategory }}
      </p>
    </div>

    <p class="text-right text-gray-900">
      <span class="flex justify-end">
        {{ Number(article.price) }} &#129689;
      </span>

      <span class="mt-1 text-sm text-gray-700">
        {{ article.quantity }} {{ $t('component.ARTICLE_INFO_PREVIEW.stock') }}
      </span>

      <br>
      <span class="mt-1 text-sm text-gray-700">
        {{ article.condition }}
      </span>
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  article: Article;
}
defineProps<Props>();
</script>