type Person = {
  readonly name: string
  readonly age: number
}

const createPerson = (name: string, age: number) => ({name, age})

type Company = {
  readonly name: string
  readonly address: string
  readonly employees: Person[]
}


