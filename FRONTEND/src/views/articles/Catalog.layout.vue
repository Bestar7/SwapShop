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
            <div class="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
              <slot name="FILTER_NAME" />
              <slot name="FILTER_TAG" />
            </div>

            <slot name="ORDER_BY" />
            
            
            <slot name="SUBMIT_ARTICLE" />
            
            <div v-if="$slots.NO_ARTICLE" class="py-8 sm:px-0">
              <div class="h-96 rounded-lg border-4 border-dashed border-gray-200">
                <div class="flex h-full flex-col justify-evenly">
                  <div class="mt-3 text-center sm:mt-5">
                    <h3 class="text-lg font-medium leading-6 text-gray-900">
                      <slot name="NO_ARTICLE" />
                    </h3>
                  </div>
                </div>
              </div>
            </div>


            <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-6 gap-6 " >
              <slot name="ARTICLE_PREVIEW" />
            </div>
            


          </div>
        </div>
      </main>
    </div>
  </div>
</template>