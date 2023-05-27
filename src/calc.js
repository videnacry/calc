export const actions = {
    addChar: 'addChar',
    removeChar: 'removeChar',
    removeAllChars: 'removeAllChars',
    resolve: 'resolve'
}

const getOperationMaxPriority = (elements) => {
    let operationMaxPriority = undefined
    elements.forEach(element => {
        if (typeof element == 'object') {
            console.log(element)
            operationMaxPriority = (element.priority < operationMaxPriority) ? operationMaxPriority : element.priority
        }
    });
    return operationMaxPriority
}

const getOperationString = (elements) => {
    const operationString = elements.map(element => {
        if (typeof element != 'string') {
            return element.string
        } else {
            return element
        }
    })
    return operationString.join('')
}

const dispatcher = {
    addChar: (state, newChar) => {
        let operation 
        const lastChar = state.operation[state.operation.length-1]
        if (typeof lastChar == 'string' && typeof newChar == 'string') {
            operation = [...state.operation.slice(0, state.operation.length-1), (lastChar + newChar)]
        } else {
            operation = [...state.operation, newChar]
        }
        const operationString = getOperationString(operation)
        return {...state, operation, operationString}
    },
    removeChar: (state) => {
        const lastChar = state.operation[state.operation.length-1]
        let operation = state.operation.slice(0, state.operation.length-1)
        if (typeof lastChar == 'string' && lastChar.length > 1) {
            operation = [...operation, lastChar.substring(0, lastChar.length-1)]
        }
        const operationString = getOperationString(operation)
        return {...state, operation, operationString}
    },
    removeAllChars: (state) => {
        return {...state, operation: [], operationString: ''}
    },
    resolve: (state) => {
        let operationMaxPriority = getOperationMaxPriority(state.operation)
        let operation = [...state.operation]
        let index = 0
        while (index < operation.length) {
            if (typeof operation[index] != 'string' && operation[index].priority == operationMaxPriority) {
                const result = operation[index].resolve(operation[index-1], operation[index+1])
                const nextChars = operation.slice(index+2)
                operation = (nextChars.length > 0)? [...operation.slice(0, index-1), result, ...nextChars] : [...operation.slice(0, index-1), result]
                index--
            }
            index++
            if (index == operation.length) {
                operationMaxPriority = getOperationMaxPriority(operation)
                console.log(operation)
                if (operationMaxPriority >= 0) index = 0
            }
        }
        const history = [state.operationString, ...state.history]
        const operationString = operation[0]
        return {history, operationString, operation:[]}
    }
}

export const calcInitialState = {
    history: [],
    operation: [],
    operationString: ''
}

export const calcReducer = (state, payload) => dispatcher[payload.action](state, payload.value||'')