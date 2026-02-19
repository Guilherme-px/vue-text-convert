import { createApp } from 'vue';
import '@/assets/styles.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';

import { faInstagram, faLinkedinIn, faGithubAlt } from '@fortawesome/free-brands-svg-icons';
import {
    faArrowRight,
    faCopy,
    faCheck,
    faTrashAlt,
    faGears,
    faAngleRight,
    faLeftRight,
    faHashtag,
    faSquareBinary,
    faCheckCircle,
    faInfoCircle,
    faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';

library.add(
    faInstagram,
    faLinkedinIn,
    faGithubAlt,
    faArrowRight,
    faCopy,
    faCheck,
    faTrashAlt,
    faGears,
    faAngleRight,
    faLeftRight,
    faHashtag,
    faSquareBinary,
    faCheckCircle,
    faInfoCircle,
    faExclamationCircle
);

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router);

app.mount('#app');
