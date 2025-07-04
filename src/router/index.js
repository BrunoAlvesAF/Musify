import { createMemoryHistory, createRouter } from 'vue-router'

import tlusu from '../components/tlusu.vue'
import usua from '../components/usua.vue'

const routes = [
  { path: '/tlusu', component: tlusu },
  { path: '/usua', component: usua },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;