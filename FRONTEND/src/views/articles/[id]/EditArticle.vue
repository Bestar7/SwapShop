<template>
  <EditArticleLayout>

    <template v-slot:NAVIGATION_BAR> <!--TODO put this in MainApp ?-->
      <NavBar />
    </template>

    <template v-slot:HEADER>
      <AppHeader titre="Modifier un matériau" />
    </template>

    <template v-slot:FORM>
      <Form.Article
        :onSubmit="formArticle.submitArticle"
        :onSucces="formArticle.goToArticle"
        :cancel="formArticle.cancel"
        :availableTags="availableTags"
        :availableMaterials="availableMaterials!"
        v-model:article="article"
      />
    </template>
    
  </EditArticleLayout>
</template>

<script setup lang="ts">
import NavBar from "~/components/NavBar/NavBar.vue";
import * as Form from "~/components/Form/Form";
import AppHeader from "~/components/Header/AppHeader.vue";
import EditArticleLayout from "./EditArticle.layout.vue";
import { getOneArticle, updateOneArticle } from "~/services/articles";
import { getAllMaterials } from "~/services/materials";
import { useRouter, useRoute } from "vue-router";
import { onMounted, ref, type Ref } from "vue";
import { getAllTags } from "~/services/tags";

const router = useRouter();
const id:number = Number(useRoute().params.id);

const availableTags: Ref<string[]> = ref([]);
const availableMaterials: Ref<Material[]> = ref([]);
onMounted(async ()=>{
  availableTags.value = await getAllTags();
  availableMaterials.value = await getAllMaterials();
  article.value = await getOneArticle(id);
})

const formArticle = {
  submitArticle : async () : Promise<boolean> => {
    const updatedArticle = await updateOneArticle(article.value);
    if (updatedArticle)
      return true;
    return false;
  },
  goToArticle : () => {
    router.push({ name: "viewOneArticle", params: { id: article.value.id } });
  },
  cancel : () => router.go(-1),
};

const article : Ref<Article> = ref({
  name: "",
  category: {} as Material,
  price: 0,
  condition: 1,
  tags: [],
  quantity: 0,
});

</script>