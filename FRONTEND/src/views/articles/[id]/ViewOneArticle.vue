<template>

  <ViewOneArticleLayout>

    <template v-slot:NAVIGATION_BAR> <!--TODO put this in MainApp ?-->
      <NavBar />
    </template>

  
    <template v-slot:HEADER>
      <AppHeader titre="Voir un matériau" />
    </template>

    
    <template v-slot:ARTICLE_FULL>
      <Card.ArticleFull :peutEditer="usersStore.allowedRole([UserRole.ADMIN, UserRole.SHOP])" />
    </template>


    <!--
    <template v-slot:LIST_TRANSACTION>
      <ul v-if="true/*connectee && materiau*/" class="mt-3">
        <li v-for="transaction in transactions" :key="transaction.id" class="my-5 flex rounded-md border border-gray-200 shadow-sm" >
          <Transaction :transaction="transaction"/>
        </li>
      </ul>
    </template>
    -->
    
  </ViewOneArticleLayout>
</template>

<script setup lang="ts">
import ViewOneArticleLayout from "./ViewOneArticle.layout.vue";
import NavBar from "~/components/NavBar/NavBar.vue";
import AppHeader from "~/components/Header/AppHeader.vue";
import * as Card from "~/components/Card/Card";
//import Transaction from "~/components/Transaction/Transaction.vue";
import { onMounted, ref, type Ref } from "vue";
import { useRoute } from "vue-router";
import { getOneArticle } from "~/services/articles";
import { useArticlesStore } from "~/stores/articles/articles";
import { useUsersStore } from "~/stores/users/users";
import { UserRole } from "~/utils/user";
import { TypeTransactionEnum } from "~/types/TransactionType";

const articleStore = useArticlesStore();
const usersStore = useUsersStore();

const id:number = Number(useRoute().params.id);

onMounted(async ()=>{
  // KO (for update) les changement ne sont pas encore effectué en db, et ça renvoie l'ancien article
  //store.article = await getOneArticle(id);
  setTimeout(async () => {
    articleStore.setOneArticle(await getOneArticle(id));
  }, 150);
})

// TODO add const transactionsStore = useTransactionsStore()
const transactions2: Ref<Transaction[] | null> = ref(null);
const transactions: Transaction[] = [ // TODO this should be axios'd onMount()
  {
    id: 1,
    type: TypeTransactionEnum.WITHDRAWAL,
    user: {
      id: 1,
      firstName: "prenom",
      lastName: "nom",
      email:"email"
    },
    article: {} as Article,
    quantity: 20,
    pricePerUnit: 10,
    total: 200,
    discount: 0,
    date: new Date(),
  },
  {
    id: 2,
    type: TypeTransactionEnum.WITHDRAWAL,
    user: {
      id: 1,
      firstName: "prenom2",
      lastName: "nom2",
      email:"email2"
    },
    article: {} as Article,
    quantity: 25,
    pricePerUnit: 15,
    total: 375,
    discount: 0,
    date: new Date(),
  },
]
</script>