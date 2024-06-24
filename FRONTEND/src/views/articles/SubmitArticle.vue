<template>
  <SubmitArticleLayout>

    <template v-slot:NAVIGATION_BAR> <!--TODO put this in MainApp ?-->
      <NavBar />
    </template>

    <template v-slot:HEADER>
      <AppHeader :titre="$t('SUBMIT_ARTICLE.submitItem')" />
    </template>

    <template v-slot:FORM>
      <Form.Article
        :onSubmit="formArticle.submitArticle"
        :onSucces="formArticle.goToArticle"
        :cancel="formArticle.cancel"
        :availableTags="availableTags"
        :availableMaterials="availableMaterials"
        :possibleContributors="possibleContributors"
        v-model:article="article"
        v-model:contributor="contributor"
      />
    </template>
    
  </SubmitArticleLayout>
</template>

<script setup lang="ts">
import NavBar from "~/components/NavBar/NavBar.vue";
import * as Form from "~/components/Form/Form";
import AppHeader from "~/components/Header/AppHeader.vue";
import SubmitArticleLayout from "./SubmitArticle.layout.vue";
import { createArticle } from "~/services/articles";
import { createImages } from "~/services/images";
import { getAllTags } from "~/services/tags";
import { getAllMaterials } from "~/services/materials";
import { useRouter } from "vue-router";
import { onMounted, ref, type Ref } from "vue";
import { getAllUsers } from "~/services/users";
import { createTransaction } from "~/services/transactions";
import { useSwapShopStore } from "~/stores/swapShop";
import { TypeTransactionEnum } from "~/types/TransactionType";

const router = useRouter();
const shop = useSwapShopStore();

const availableTags: Ref<string[]> = ref([]);
const availableMaterials: Ref<Material[]> = ref([]);
const possibleContributors: Ref<User[]> = ref([]);

onMounted(async ()=>{
  availableTags.value = await getAllTags();
  availableMaterials.value = await getAllMaterials();
  possibleContributors.value = await getAllUsers();
})

const formArticle = {
  submitArticle : async () : Promise<boolean> => {
    const qty = article.value.quantity;
    const sentArticle = await createArticle({...article.value, storingShopId:shop.getSwapShop!.id, quantity:0, images: []});
    //const sentArticle = await createArticle({...article.value, images: []});
    const ok = await createTransaction({
      swapShop: shop.getSwapShop!,
      type: TypeTransactionEnum.DEPOSIT,
      user: contributor.value!,
      requestedArticles: [{
        article: await sentArticle,
        quantity: qty
      }]
    })
    console.log("CREATE", sentArticle, ok);
    const images = await createImages(article.value.images as File[], sentArticle.id!);
    article.value = sentArticle;
    return sentArticle && images && images.length > 0;
  },
  goToArticle : () => {
    router.push({ name: "viewOneArticle", params: { id: article.value.id } });
  },
  cancel : () => router.go(-1),
};

const contributor: Ref<User | undefined> = ref();
const article : Ref<Article> = ref({
  name: "",
  category: {} as Material,
  price: 0,
  condition: 1,
  images: [],
  tags: [],
  quantity: 0,
  storingShopId: shop.getSwapShop?.id,
});

</script>