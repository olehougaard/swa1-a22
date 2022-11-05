const reverse = (s: string) => s.split("").reverse().join("")
export default {
    data() {
        return {s: "reverse"}
    },
    computed: {
        reversed: { 
            get(): string { return reverse(this.s)},
            set(v: string): void { this.s = reverse(v) }
        }
    }
}
