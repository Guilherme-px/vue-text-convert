<template>
    <footer class="bg-gray-900 text-font-color py-6">
        <div class="flex justify-center items-center space-x-4">
            <a
                target="_blank"
                href="https://www.instagram.com/guilherme_jsx/"
                data-testid="link-insta"
            >
                <font-awesome-icon
                    icon="fa-brands fa-instagram"
                    class="hover:text-light-green text-2xl"
                />
            </a>
            <div class="w-4 h-px bg-light-green"></div>
            <a
                target="_blank"
                href="https://www.linkedin.com/in/guilherme-augusto-da-silva/"
                data-testid="link-linkedin"
            >
                <font-awesome-icon
                    icon="fa-brands fa-linkedin-in"
                    class="hover:text-light-green text-2xl"
                />
            </a>
            <div class="w-4 h-px bg-light-green"></div>
            <a target="_blank" href="https://github.com/Guilherme-px" data-testid="link-github">
                <font-awesome-icon
                    icon="fa-brands fa-github-alt"
                    class="hover:text-light-green text-2xl"
                />
            </a>
        </div>
        <div class="bg-light-green h-px my-4"></div>
        <div class="mt-4 mx-10 text-center text-lg">
            <p data-testid="text-dev" class="mb-3">
                <strong class="text-light-green">Desenvolvido por:</strong> Guilherme Augusto
            </p>
            <p data-testid="text-copy" class="text-font-color">
                &copy; 2023 Todos os direitos reservados
            </p>
        </div>
    </footer>
</template>
