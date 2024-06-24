<template>
  <div class="min-h-screen">
    <slot name="NAVIGATION_BAR" />

    <div class="py-10">
      <header>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <slot name="HEADER" />
        </div>
      </header>

      <main>
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div class="px-4 py-8 sm:px-0">

            <div class="mx-auto max-w-4xl">
              <slot name="ARTICLE_FULL" />
            </div>

            <slot v-if="$slots.LIST_TRANSACTION" name="LIST_TRANSACTION" />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>