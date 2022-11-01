
export type Property<Value> = {
    get: () => Value,
    set: (v: Value) => void
}

export type Observer<Value> = (v: Value) => void

export type BoundProperty<Value> = Property<Value> & {
    onChange: (observer: Observer<Value>) => void,
    singleBind: (property: BoundProperty<Value>) => void,
    doubleBind: (property: BoundProperty<Value>) => void
}

function createBoundProperty<Value>({get, set}: Property<Value>, addListener?: (l: () => void) => void): BoundProperty<Value> {
    const observers: Observer<Value>[] = []
    
    const notify = () => observers.forEach((observer) => observer(get())) 

    const setAndNotify = (v: Value) => {
        if (v !== get()) {
            set(v)
            notify()
        }
    }
    
    const onChange = (obs: Observer<Value>) => observers.push(obs)

    // Requires an object with a set method. Calls the set method whenever this propery changes.
    const singleBind = (property: BoundProperty<Value>) => {
        property.set(get())
        onChange(v => property.set(v))
    }

    // Requires a property with at least set and single_bind
    const doubleBind = (property: BoundProperty<Value>) => {
        singleBind(property)
        property.singleBind(self)
    }

    const self: BoundProperty<Value> = { get, set: setAndNotify, onChange, singleBind, doubleBind }

    if (addListener) addListener(() => notify())

    return self
}

export const boundProperty = <Value>(prop: Property<Value>) => createBoundProperty(prop)

boundProperty.initialized = <Value>(value: Value) => boundProperty({
    get: () => value,
    set: v => value = v
})

boundProperty.computed = <Value, PropertyValue>(property: BoundProperty<PropertyValue>, compute: (v: PropertyValue) => Value, compute_reverse: (v: Value) => PropertyValue) => {
    return createBoundProperty({get: () => compute(property.get()), set: v => property.set(compute_reverse(v))}, property.onChange)
}

// Creates a bound property from an attribute on an element
// element - the HTML element in question
// attribute - the attribute that should be bound
// addListener - a function that adds a listener that responds to changes in the element
boundProperty.fromAttribute = <Element, Key extends keyof Element>(element: Element, attribute: Key, addListener: (l:() => void) => void) => {
    type Value = Element[Key]
    return createBoundProperty<Value>({get: () => element[attribute], set: (v: Value) => element[attribute] = v}, addListener)
}
