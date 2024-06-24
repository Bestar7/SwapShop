<template>
  <CheckoutLayout>
    <template v-slot:NAVIGATION_BAR>
      <NavBar />
    </template>

    <template v-slot:HEADER>
      <AppHeader :titre="$t('CHECKOUT.title')" />
    </template>

    <template v-slot:CONTENT><!--TODO mettre tout ça dans un formulaire-->
      <div class="mx-auto max-w-7xl">
        <div class="px-4 py-8">
          <div class="mx-auto max-w-4xl">
            <div class="rounded-md bg-swapShop-50 shadow sm:rounded-lg">
              <div class="px-4 sm:p-6">
                <div class="py-5 sm:py-0">

                  <!--FOR WHO-->
                  <div class="grid grid-cols-1 sm:grid-cols-4">
                    <div class="col-span-1 text-center self-center">{{ $t('CHECKOUT.recipient') }} : </div>
                    <Input.UserSelect :possibleUsers="possibleRecipients" v-model="transaction.user" class="col-span-3" :required="true" />
                  </div>

                  <!--CART CONTENT-->
                  <div v-for="article in transaction.requestedArticles" :key="article.article.id" class="group relative" >
                    <div class="grid grid-cols-2 sm:grid-cols-6 my-6 gap-0 sm:gap-6 rounded-md border-2 sm:border-0">
                      <div class="sm:col-span-2 col-span-2">
                        <HImage.Thumbnail :article="article.article"/>
                      </div>
                      <div class="sm:col-span-2 col-span-2 p-2">
                        <Card.ArticleInfoPreview :article="article.article" class="col-span-1"/>
                      </div>
                      <div class="sm:col-span-1 col-span-1 p-2">
                        <div class="text-center">{{ $t('CHECKOUT.qty') }} : </div>
                        <input type="number" min="1" v-model="article.quantity" required class="focusable w-full rounded-md border-gray-300 sm:text-sm">
                      </div>
                      <div class="sm:col-span-1 col-span-1 p-2">
                        <div class="text-center">{{ $t('CHECKOUT.subtotal') }} :</div>
                        <div class="text-center"> {{article.article.price * (article.quantity)}} &#129689;</div>
                      </div>
                    </div>
                  </div>

                  <!--TOTAL PRICE-->
                  <div class="grid grid-cols-4">
                    <div class="col-span-1">{{ $t('CHECKOUT.totalPrice') }} : {{totalPrice}} &#129689;</div>
                    <div class="col-span-2"></div>
                    <div class="col-span-1"><!--TODO on sumbit go to user page=> transaction ? -->
                      <button v-on:click="onSubmit()" type="submit" class="focusable clickableMain rounded-md p-2 font-medium">{{ $t('CHECKOUT.confirm') }} </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </CheckoutLayout>
</template>

<script setup lang="ts">
import CheckoutLayout from "./Checkout.layout.vue";
import NavBar from "~/components/NavBar/NavBar.vue";
import AppHeader from "~/components/Header/AppHeader.vue";
import * as Card from "~/components/Card/Card";
import * as HImage from "~/components/Image/Image";
import * as Input from "~/components/Form/Field/Input"

import { useCartStore } from "~/stores/cart";
import { Ref, computed, onMounted, ref, watch } from "vue";
import { getAllUsers } from "~/services/users";
import { useSwapShopStore } from "~/stores/swapShop";
import { createTransaction } from "~/services/transactions";
import { useRouter } from "vue-router";
import { TypeTransactionEnum } from "~/types/TransactionType";

const cartStore = useCartStore();
const swapShopStore = useSwapShopStore();
const route = useRouter();

onMounted(async()=>{
  possibleRecipients.value = await getAllUsers();
});

const onSubmit = async ()=>{
  const res = await createTransaction(transaction.value);
  if (res){
    cartStore.clearCart();
    route.push({name:'catalog'});
  }
}

const formatRequestedArticles = (articles: Article[]): ArticleRequest[] => {
  return articles.map((article)=>({
    article: article,
    quantity: 1,
  }));
}
const transaction = ref<Transactions>({
  type: TypeTransactionEnum.WITHDRAWAL,
  user: null, // TODO default value should be undefined, could be anon donation
  swapShop: swapShopStore.getSwapShop!,
  requestedArticles: formatRequestedArticles(cartStore.getArticles),
});
watch(cartStore, ()=>{
  transaction.value.requestedArticles = formatRequestedArticles(cartStore.getArticles);
});

const possibleRecipients: Ref<User[]> = ref([]);
const totalPrice = computed(()=>{ // TODO ugly, make it smaller
  return transaction.value.requestedArticles.reduce(
    (result, article)=>{return result += article.article.price * article.quantity}, 0
  );
});
</script>