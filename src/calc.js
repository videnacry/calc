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
        if (state.operation.length == 0 && typeof newChar == 'object') {
            return {...state, errorMsg: 'Operation sign at the start of an operation is not supported'}
        }
        if (typeof state.operation[state.operation.length - 1] == 'object' && typeof newChar == 'object') {
            return {...state, errorMsg: 'Operation sign after an operation sign is not supported'}
        }
        let operation 
        const lastChar = state.operation[state.operation.length-1]
        if (typeof lastChar == 'string' && typeof newChar == 'string') {
            operation = [...state.operation.slice(0, state.operation.length-1), (lastChar + newChar)]
        } else {
            operation = [...state.operation, newChar]
        }
        const operationString = getOperationString(operation)
        return {...state, operation, operationString, errorMsg: ''}
    },
    removeChar: (state) => {
        const lastChar = state.operation[state.operation.length-1]
        let operation = state.operation.slice(0, state.operation.length-1)
        if (typeof lastChar == 'string' && lastChar.length > 1) {
            operation = [...operation, lastChar.substring(0, lastChar.length-1)]
        }
        const operationString = getOperationString(operation)
        return {...state, operation, operationString, errorMsg: ''}
    },
    removeAllChars: (state) => {
        return {...state, operation: [], operationString: '', errorMsg: ''}
    },
    resolve: (state) => {
        if (typeof state.operation[state.operation.length - 1] == 'object') {
            return {...state, errorMsg: 'Operation sign at the end of an operation is not supported'}
        }
        let operationMaxPriority = getOperationMaxPriority(state.operation)
        let operation = [...state.operation]
        let index = 0
        while (index < operation.length) {
            if (typeof operation[index] != 'string' && operation[index].priority == operationMaxPriority) {
                const result = operation[index].resolve(Number(operation[index-1]), Number(operation[index+1]))
                const nextChars = operation.slice(index+2)
                operation = (nextChars.length > 0)? [...operation.slice(0, index-1), result, ...nextChars] : [...operation.slice(0, index-1), result]
                index--
            }
            index++
            if (index == operation.length) {
                operationMaxPriority = getOperationMaxPriority(operation)
                if (operationMaxPriority >= 0) index = 0
            }
        }
        const history = [state.operationString, ...state.history]
        const operationString = operation[0]
        return {history, operationString, operation:[], errorMsg: ''}
    }
}

export const calcInitialState = {
    history: [],
    operation: [],
    operationString: '',
    errorMsg: ''
}

export const calcReducer = (state, payload) => dispatcher[payload.action](state, payload.value||'')