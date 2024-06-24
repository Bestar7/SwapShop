<template>
  <div class="mx-auto max-w-4xl px-4 pb-12 pt-10 lg:pb-16">
    
    <div class="relative px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
      <h1 class="text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
        <span class="block text-swapShop-300">
          <slot name="SWAP_SHOP_FEDERATION" />
        </span>
        <span class="block text-swapShop-500">
          <slot name="SWAP_SHOP_NAME" />
        </span>
      </h1>
    </div>

    <p class="text-lg font-extrabold tracking-tight text-swapShop-900">
      <slot name="SWAP_SHOP_DESCRIPTION" />
    </p>
    <!--TODO add a warning if the user is not connected, and what it implies-->
    
    <div class="mt-12 flex space-x-6"><slot name="TO_CATALOG" /></div>

  </div>
</template>