<template>
    <header>
        <nav class="flex items-center justify-between py-4 px-6 bg-gray-900">
            <div class="flex items-center">
                <h1 class="text-font-color font-semibold text-lg">Convert Case</h1>
            </div>
            <div class="flex items-center space-x-8">
                <router-link
                    to="/"
                    data-testid="link-home"
                    class="text-font-color hover:text-light-green text-lg"
                    >Início</router-link
                >
                <router-link
                    to="/sobre"
                    data-testid="link-about"
                    class="text-font-color hover:text-light-green text-lg pr-5"
                    >Sobre</router-link
                >
            </div>
        </nav>
    </header>
</template>
