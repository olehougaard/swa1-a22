import { createApp } from "vue"
import vm from "./reversevm"

const app = createApp(vm)
app.mount('#base')
