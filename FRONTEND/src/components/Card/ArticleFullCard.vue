<template>

  <!-- Loaded state -->
  <div v-if="article" class="rounded-md bg-swapShop-50 shadow sm:rounded-lg">
    <div class="px-4 sm:p-6 py-5">
      <!--TODO check this + remove 'as Image[]' + choose component depending on device size carousel for phone and other for the rest-->
      <HImage.Carousel v-model="(article.images as Image[])" class=" sm:hidden" />
      <div class="hidden sm:grid gap-x-4 gap-y-6 grid-cols-5">
        <span v-for="img in (article.images as Image[])" :key="img.path" class="col-span-1">
          <img :src="img.path" class="w-full h-full object-cover" />
        </span>
      </div>
      

      <div class="mt-8 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div class="pb-5">
          <!-- Nom -->
          <h3 class="text-2xl font-medium leading-6 text-gray-900">
            {{ article.name }}
          </h3>

          <div class="mt-3 flex items-center text-2xl font-extrabold text-gray-900" >
            <span> {{ Number(article.price) }}&#129689; / article </span>
          </div>
        </div>

        <div class="my-2 ml-4 flex-shrink-0" v-if="peutEditer">
          <div class="flex justify-end space-x-4">
            <button
              v-on:click="$router.push({name: 'editArticle', params: { id: article!.id }})"
              type="button"
              class="focusable clickableMain rounded-md border px-4 py-2 text-sm font-medium"
            >
              {{$t('component.ARTICLE_FULL_VIEW.update')}}
            </button>
          </div>
        </div>
      </div>

      <div class="py-3 pb-4">
        <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
          <!-- Quantité -->
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">{{$t('component.ARTICLE_FULL_VIEW.qty')}}</dt>
            <dd class="mt-1 text-base text-gray-900">
              <code>
                <span class="mr-2 rounded bg-gray-100 px-2.5 py-0.5 text-gray-600" >
                  {{ article.quantity }} en stock
                </span>
              </code>
            </dd>
          </div>
          <!-- Catégorie -->
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">{{$t('component.ARTICLE_FULL_VIEW.category')}}</dt>
            <dd class="mt-1 text-sm text-gray-700">
              {{ article.category.category }} - {{  article.category.subcategory }}
            </dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">{{$t('component.ARTICLE.weight')}} (Kg)</dt>
            <dd class="mt-1 text-sm text-gray-700">
              {{ article.weight }}
            </dd>
          </div>
          <!-- Description -->
          <div class="sm:col-span-3">
            <dt class="text-sm font-medium text-gray-500">{{$t('component.ARTICLE_FULL_VIEW.description')}}</dt>
            <dd class="leading-700 mt-1 text-sm text-gray-900">
              {{ article.description ?? "-" }}
            </dd>
          </div>
          <!-- État -->
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">{{$t('component.ARTICLE_FULL_VIEW.condition')}}</dt>
            <dd class="text-sm text-gray-900">
              <Input.Rating :length="5" :isReadonly="true" v-model="article.condition" />
            </dd>
          </div>
          <!-- Tags -->
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">{{$t('component.ARTICLE_FULL_VIEW.tags')}}</dt>
            <dd class="mt-2 text-sm text-gray-900">
              {{ !article.tags?.length ? "-" : "" }}
              <span v-for="tag in article.tags" :key="tag.label"><!--TODO remove template and use it-->
                <router-link :to="{ name: 'catalog', query: { tags: tag.label } }" class="focusable clickableSecondary border-gray-500 rounded-full border px-3 py-0.5 m-1"><!--TODO :to="{ name: 'Materiau', query: { tags: tag } }"-->
                  <span class="relative inline-flex items-center text-sm" >
                    {{ tag.label }}
                  </span>
                </router-link>
              </span>
            </dd>
          </div>
        </dl>
      </div>
      <!--TODO add a 'go back' btn-->

    </div>
  </div>
  
  <!-- Not loaded state -->
  <div v-else class="animate-pulse">
    <div class="rounded-md bg-white shadow sm:rounded-lg">
      <div class="px-4 sm:p-6">
        <div :class="[ 'py-5 sm:py-0', { 'border-t border-gray-200 sm:pt-5': $slots.header },]">

          <div class="mt-6 flex flex-wrap items-center justify-between sm:flex-nowrap" >
            <div class="pb-5">
              <!-- Nom -->
              <h3 class="text-2xl font-medium leading-6 text-gray-900">
                <div class="h-4 rounded bg-slate-200"></div>
              </h3>

              <div class="mt-3 flex items-center justify-center text-5xl font-extrabold text-gray-900">
                <div class="h-10 w-32 rounded bg-slate-200">&nbsp;</div>
              </div>
            </div>
          </div>

          <div class="py-3 pb-4">
            <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
              <!-- Quantité -->
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">Quantité</dt>
                <dd class="mt-1 text-base text-gray-900">
                  <div class="h-1 w-full rounded bg-slate-200 py-2.5"></div>
                </dd>
              </div>
              <!-- Catégorie -->
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">Catégorie</dt>
                <dd class="mt-1 text-sm text-gray-700">
                  <div class="h-1 w-full rounded bg-slate-200 py-2.5"></div>
                </dd>
              </div>
              <!-- Description -->
              <div class="sm:col-span-3">
                <dt class="text-sm font-medium text-gray-500">Description</dt>
                <dd class="leading-700 mt-1 text-sm text-gray-900">
                  <div class="h-10 w-full rounded bg-slate-200 py-2.5"></div><!--TODO leave empty ???-->
                </dd>
              </div>
              <!-- État -->
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">État</dt><!--TODO leave empty ???-->
                <dd class="mt-1 text-sm text-gray-900">
                  <div class="h-1 w-full rounded bg-slate-200 py-2.5"></div>
                </dd>
              </div>
              <!-- État -->
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">Tags</dt><!--TODO leave empty ???-->
                <dd class="mt-1 text-sm text-gray-900">
                  <div class="h-1 w-full rounded bg-slate-200 py-2.5"></div>
                </dd>
              </div>
              <!--  Indication supplémentaire  -->
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">
                  Indication supplémentaire
                </dt>
                <dd class="mt-1 text-sm text-gray-700">
                  <div class="h-1 w-full rounded bg-slate-200 py-2.5"></div><!--TODO leave empty ???-->
                </dd>
              </div>
            </dl>
          </div>

        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";
import * as Input from '~/components/Form/Field/Input'
import * as HImage from '~/components/Image/Image'

import { useArticlesStore } from "~/stores/articles/articles";

interface Props {
  peutEditer: boolean;
}

withDefaults(defineProps<Props>(), {
  peutEditer: false,
});

// TODO article.value est undefined, puis reload page -> null->sub({}:Article)
const articleStore = useArticlesStore();
const article: Ref<Article | null> = ref(articleStore.getOneArticle);
articleStore.$subscribe(() => {
  article.value = articleStore.getOneArticle;
});

</script>
