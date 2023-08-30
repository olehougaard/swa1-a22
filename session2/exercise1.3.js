function createPerson(name, age) {
    age ??= 0
    
    function getName() {
        return name
    }

    function setName(_name) {
        name = _name
    }

    function getAge() {
        return age
    }

    function setAge(_age) {
         age = _age
    }

    function toString() {
        return `Person(${name}, ${age})`
    }

    function equals(person) {
        return name == person.getName() && age == person.getAge()
    } 

    return { getAge, setAge, getName, setName, toString, equals }
}

function createEmployee(name, ageOrSalary, _salary) {
    let person
    let salary
    if (_salary === undefined) {
        person = createPerson(name)
        salary = ageOrSalary
    } else {
        person = createPerson(name, ageOrSalary)
        salary = _salary
    }
    
    const getSalary = () => salary
    const setSalary = (_salary) => salary = _salary

    const toString = () => person.toString() + salary

    return { ...person, getSalary, setSalary, toString }
}

/*
newer approach (object destructuring)
function createEmployee({name, age = 0, salary}) {

}

let e = createEmployee({name: '', age: 27, salary: 98765})
 */