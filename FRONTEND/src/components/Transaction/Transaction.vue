<template>
  <!--
  <div class="flex w-16 flex-shrink-0 items-center justify-center rounded-l-md border-r border-gray-200 text-sm font-medium text-gray-300" >
    <div class="w-12 p-3">
      <component :is="transaction.icon" aria-hidden="true" />
    </div>
  </div>
  -->
  <div class="flex flex-1 items-center justify-between truncate rounded-r-md bg-white" >
    <div class="flex-1 truncate px-4 py-2 text-sm">
      <p>
        {{ transaction.article.name }} ancien name ???

        <span v-if="transaction.user">
          {{ " · " }}
          <router-link :to="{ name: 'userView', params: { id: transaction.user!.id }, }"
            class="font-medium text-gray-500 hover:text-gray-800"
          >
            {{ transaction.user!.firstName }} {{ transaction.user!.lastName }}
          </router-link>
        </span>
      </p>

      <p class="mt-2 text-gray-500">{{ transaction.date }}</p>
    </div>

    <div class="flex-shrink-0 pr-5">
      <code :class="['mr-2 rounded bg-gray-100 px-2.5 py-0.5 text-gray-600']" >
        {{ transaction.type==TypeTransactionEnum.WITHDRAWAL ? "-" : "+" /*TODO create enum, translate pieces*/}}
        {{ transaction.quantity }} pieces
      </code>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { TypeTransactionEnum } from "~/types/TransactionType";

interface Props {
  transaction: Transaction;
}

defineProps<Props>(); // TODO case no props given ???
</script>
