// Generics
// Generics allow us to create reusable components that can work with a variety of types rather than a single one.
// Type is not specified, it is provided later during function call.

type DataStorage<T> = {
    storage: T[];
    add: (data: T) => void;
}

const textStorage: DataStorage<string> = {
    storage: ["Hello", "World"],
    add: function(data: string) {
        this.storage.push(data);
    }
}