import './index.css'
import OpBtn from './operation'
import NumBtn from './number'
import { division, multiply, substract, sum } from './operations'
import { actions } from '../calc'

const Index = ({dispatch}) => {
    return (
        <div className='buttons'>
            <div className='left-panel'>
                <button className='clean-screen' onClick={() => dispatch({action:actions.removeAllChars})}>C</button>
                <div className='numbers'>
                    {['7','8','9','4', '5', '6', '1', '2', '3', '.', '0'].map((num, idx) => (
                        <NumBtn content={num} clickHandler={() => dispatch({action:actions.addChar, value:num})} key={num+idx}/>
                    ))}
                    <button className='delete' onClick={() => dispatch({action:actions.removeChar})}>
                        <span></span>
                        <span></span>
                        &times;
                    </button>
                </div>
            </div>
            <div className='operations'>
                {[sum, substract, multiply, division].map((op, idx) => (
                    <OpBtn content={op.string} clickHandler={() => dispatch({action:actions.addChar, value:op})} key={op.string+idx}/>
                ))}
                <button className='resolve' onClick={() => dispatch({action:actions.resolve})}>=</button>
            </div>
        </div>
    )
}

export default Index