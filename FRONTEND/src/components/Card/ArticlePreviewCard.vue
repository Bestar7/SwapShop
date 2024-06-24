<template>
  <router-link :to="{ name: 'viewOneArticle', params: { id: article.id } }" class="focus:outline-swapShop-500 focus:outline-offset-4 rounded-md" >
    <div class="rounded-md bg-swapShop-50 shadow">
      <HImage.Thumbnail :article="article" />
      <Card.ArticleInfoPreview :article="article" />
    </div>
  </router-link>
</template>

<script setup lang="ts">
import * as HImage from "~/components/Image/Image";
import * as Card from "~/components/Card/Card";

interface Props {
  article: Article;
}
defineProps<Props>();
</script>