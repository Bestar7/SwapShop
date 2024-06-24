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
        <slot name="CONTENT" />
      </main>
    </div>
  </div>
</template>