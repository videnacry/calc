export const sum = {
    resolve: (a, b) => a + b,
    string: '+',
    priority: 0
}

export const substract = {
    resolve: (a, b) => a - b,
    string: '-',
    priority: 0
}

export const multiply = {
    resolve: (a, b) => a * b,
    string: '*',
    priority: 1
}

export const division = {
    resolve: (a, b) => a / b,
    string: '/',
    priority: 1
}