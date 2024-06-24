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
              <div class="rounded-md bg-swapShop-50 shadow sm:rounded-lg">
                <div class="px-4 sm:p-6">
                  <div class="py-5 sm:py-0">
                    <slot name="FORM" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>