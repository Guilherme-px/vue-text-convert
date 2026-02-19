<template>
    <footer class="relative z-10 border-t border-white/5">
        <div class="max-w-7xl mx-auto px-6 py-8">
            <div class="flex flex-col md:flex-row items-center justify-between gap-6">
                <div class="flex items-center gap-4">
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.linkedin.com/in/guilherme-augusto-da-silva/"
                        data-testid="link-linkedin"
                        class="w-10 h-10 rounded-full bg-gray-800/50 border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all duration-300"
                    >
                        <font-awesome-icon icon="fa-brands fa-linkedin-in" class="text-lg" />
                    </a>

                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://github.com/Guilherme-px"
                        data-testid="link-github"
                        class="w-10 h-10 rounded-full bg-gray-800/50 border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all duration-300"
                    >
                        <font-awesome-icon icon="fa-brands fa-github-alt" class="text-lg" />
                    </a>
                </div>

                <div class="text-center md:text-right">
                    <p data-testid="text-dev" class="text-sm">
                        <span class="text-gray-500">Desenvolvido por </span>
                        <span class="text-emerald-400 font-medium">Guilherme Augusto</span>
                    </p>
                    <p data-testid="text-copy" class="text-xs text-gray-600 mt-1">
                        © 2023 Todos os direitos reservados
                    </p>
                </div>
            </div>
        </div>
    </footer>
</template>
