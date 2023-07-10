import '@/assets/styles.css';
import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';

import { faInstagram, faLinkedinIn, faGithubAlt } from '@fortawesome/free-brands-svg-icons';

library.add(faInstagram, faLinkedinIn, faGithubAlt);

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router);

app.mount('#app');
