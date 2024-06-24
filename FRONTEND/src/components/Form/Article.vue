<template>
  <form @submit.prevent="onFormSubmit" class="space-y-8">
    <!--<ErreurView :erreur="reseau.erreur" />-->

    <!--FROM WHO-->
    <div v-if="possibleContributors" class="grid grid-cols-4">
      <div class="col-span-1 text-center self-center">{{ $t('component.FORM_ARTICLE.contributor') }} : </div>
      <Input.UserSelect :possibleUsers="possibleContributors" v-model="contributor" :required="true" class="col-span-3" />
    </div>
    
    <div class="grid grid-cols-6 gap-x-1 sm:gap-x-4 gap-y-4">
      <div class="col-span-6">
        <label class="block text-sm font-medium text-gray-700">
          {{ $t('component.ARTICLE.picture') }}
          <input :required="article.images?.length==0" type="file" v-on:change="formImage.onPickedImage" name="article.photos" accept="image/*" multiple class="block focusable rounded-md p-0.5 w-full border-gray-300 sm:text-sm" />
        </label>
      </div>

      <div v-for="image in article.images" class="col-span-1" >
        <img :src="formImage.getURLFrom(image)" alt="photo" class="w-12 h-12 sm:w-32 sm:h-32 object-cover" />
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-6 gap-x-1 sm:gap-x-4 gap-y-2 sm:gap-y-6">

      <div class="col-span-6 sm:col-span-3">
        <label class="block text-sm font-medium text-gray-700">
          {{ $t('component.ARTICLE.name') }}
          <input :required="true" type="text" v-model="article.name" name="article.name" class="w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
        </label>
      </div>

      <div class="col-span-6 sm:col-span-3">
        <label class="block text-sm font-medium text-gray-700"><!--TODO cannot use multiselect because we need to add favorite, ref to explanation-->
          {{ $t('component.ARTICLE.category') }}
          <div class="block w-full sm:text-sm"><!--TODO when selected, modify category AND subcategory (set with one field, and not full Object)-->
            <Input.Category :availableMaterials="availableMaterials" v-model="article.category" />
          </div>
        </label>
      </div>

      <div class="col-span-6 sm:col-span-2">
        <label class="block text-sm font-medium text-gray-700">
          {{ $t('component.ARTICLE.weight') }} {{ getArticleUnit()==measureUnit.weight ? '' : "["+$t('component.ARTICLE.optional_m')+"]" }} (Kg)
          <input :required="getArticleUnit()==measureUnit.weight" type="number" v-model="article.weight" name="article.weight" step="0.1" placeholder="0.00" min="0" class="w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
        </label>
      </div>

      <div class="col-span-6 sm:col-span-2">
        <label class="block text-sm font-medium text-gray-700">
          {{ $t('component.ARTICLE.quantity') }}
          <input :required="true" type="number" v-model="article.quantity" name="article.quantity" step="1" value="1" min="1" class="w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
        </label>
      </div>

      <div class="col-span-6 sm:col-span-2">
        <label class="block text-sm font-medium text-gray-700">
          {{ $t('component.ARTICLE.condition') }}
          <Input.Rating :length="5" v-model="article.condition" />
        </label>
      </div>
      
      <div class="col-span-6 sm:col-span-2">
        <label class="block text-sm font-medium text-gray-700">
          {{ $t('component.ARTICLE.dimension') }} (m)  {{ getArticleUnit()==measureUnit.dimension ? '' : "["+$t('component.ARTICLE.optional_f')+"]" }}
          <input :required="getArticleUnit()==measureUnit.dimension" type="number" v-model="article.dimension" name="article.dimension" step="any" placeholder="0.00" min="0" class="w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
        </label>
      </div>

      <div class="col-span-6 sm:col-span-4">
        <label class="block text-sm font-medium text-gray-700">
          {{ $t('component.ARTICLE.tags') }} [{{ $t('component.ARTICLE.optional_m') }}]
          <div class="block w-full sm:text-sm ">
            <Input.Tag :availableTags="availableTags" v-model="article.tags" />
          </div>
        </label>
      </div>

      <div class="col-span-6">
        <label class="block text-sm font-medium text-gray-700">
          {{ $t('component.ARTICLE.description') }} [{{ $t('component.ARTICLE.optional_f') }}]
          <textarea v-model="article.description" name="article.description" rows="3" class="block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm" />
        </label>
      </div>

      <div class="col-span-6 sm:col-span-2">
        <label class="block text-sm font-medium text-gray-700">
          &#129689; {{ $t('component.ARTICLE.suggestedPricePerArticle') }}
          <input :required="true" type="number" v-model="article.price" name="article.price" step="any" value="1" min="0.00" class="w-full rounded-md border-gray-300 shadow-sm sm:text-sm" /> 
        </label>
      </div>

    </div>

    <div class="flex justify-end">
      <button type="button" @click="() => cancel()" class="focusable clickableSecondary rounded-md border px-4 py-2 text-sm font-medium" >
        {{ $t('utils.cancel') }}
      </button>

      <button type="submit" class="focusable clickableMain ml-3 inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium"><!--TODO disable when required not filled-->
        {{ $t('utils.save') }}
      </button>
    </div>


  </form>
</template>

<script setup lang="ts">
import { watchEffect } from "vue";
import { getSuggestedPrice, measureUnit } from '~/utils/article'
import * as Input from './Field/Input';

interface Props {
  onSubmit: () => Promise<boolean>;
  onSucces: () => void;
  cancel: () => void;
  availableTags: string[];
  availableMaterials: Material[];
  possibleContributors?: User[];
}
const props = defineProps<Props>();
const article = defineModel<Article>('article', {required:true});
const contributor = defineModel<User>('contributor');

const formImage = {
  onPickedImage : (event: { target: { files: any; }; }) => { // TODO also see fileReader
    article.value.images = [];
    for (const img of event.target.files){ // ignore the warning, it's correct... // TODO find something without IDE error
    article.value.images.push(img);
    }
  },
  getURLFrom : (file: File | Image): string => { // TODO make better
    if (file instanceof File)
      return URL.createObjectURL(file);
    return (file as Image).path;
  }
}

const onFormSubmit = async ()=>{
  const isSuccess = await props.onSubmit(); // TODO this should return true/false if success/error
  if (isSuccess)
    props.onSucces();
}
const getArticleUnit = ()=>{return article.value.category?.defaultUnit}
watchEffect(()=>{
  article.value.price = Number(getSuggestedPrice(article.value).toFixed(3));
});
</script>