const reverse = (s: string) => s.split("").reverse().join("")
const el = document.getElementById('base')
export default {
    el,
    data: {
        s: "reverse"
    },
    computed: {
        reversed: { 
            get(): string { return reverse(this.s)},
            set(v: string): void { this.s = reverse(v) }
        }
    }
}
