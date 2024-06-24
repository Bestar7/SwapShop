<template>
  <CatalogueLayout>

    <template v-slot:NAVIGATION_BAR> <!--TODO put this in MainApp ?-->
      <NavBar />
    </template>


    <template v-slot:HEADER>
      <AppHeader :titre="$t('CATALOG.listArticles')" />
    </template>


    <!--
    <template v-slot:FILTER_NAME>
      <Filters.Name />
    </template>

    <template v-slot:ORDER_BY>
      <Sort :optionsTri="optionsTri" />
    </template>
    -->

    <template v-slot:FILTER_TAG>
      <Filters.Tag :onTagSelect="onTagSelected"/>
    </template>


    <template v-if="usersStore.allowedRole([UserRole.ADMIN, UserRole.SHOP])" v-slot:SUBMIT_ARTICLE>
      <Button.SubmitArticle />
    </template>


    <template v-if="!articles || articles.length===0" v-slot:NO_ARTICLE>
      <span>{{$t('CATALOG.noItem')}}</span>
    </template>

    <template v-slot:ARTICLE_PREVIEW>
      <div v-for="article in articles" :key="article.id" class="group relative" >
        <Card.ArticlePreview :article="article"/>
      </div>
    </template>
    

  </CatalogueLayout>
</template>

<script setup lang="ts">
// TODO onBeforeRouteLeave sent updated favorites to backend
import { getAllArticles } from "~/services/articles";
import { getAllTags } from "~/services/tags";
import AppHeader from "~/components/Header/AppHeader.vue";
import CatalogueLayout from "./Catalog.layout.vue";
import * as Filters from "~/components/Filters/Filter";
import * as Button from "~/components/Button/Button";
import * as Card from "~/components/Card/Card";
import NavBar from "~/components/NavBar/NavBar.vue";

import { onMounted, ref, watch, type Ref  } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useArticlesStore } from "~/stores/articles/articles";
import { useTagsStore } from "~/stores/tags/tags";
import { useUsersStore } from "~/stores/users/users";
import { UserRole } from "~/utils/user";

const router = useRouter();
const route = useRoute();

const articlesStore = useArticlesStore();
const tagsStore = useTagsStore();
const usersStore = useUsersStore();

const articles:Ref<Article[] | []> = ref(articlesStore.getArticles);
articlesStore.$subscribe((_mutation, state) => { // needed to change sorting order or filters ? but changing these should re-fetch from api
  articles.value = state.articles;
});

const onTagSelected = async () => {
  if(tagsStore.getSelectedTags.length == 0)
    router.replace({ name: "catalog", query: {} })
  else
    router.replace({ name: "catalog", query: { tags: tagsStore.getSelectedTags } });
}

let params: string[];
onMounted(async () => {
  getQueryArticles();
  tagsStore.AllTags = await getAllTags();
});

watch(route, async ()=>{
  getQueryArticles();
});

const getQueryArticles = async () =>{
  if (route.query.tags)
    params = String(route.query.tags).split(',');
  else 
    params = [];

  articlesStore.articles = await getAllArticles(params);
}
</script>