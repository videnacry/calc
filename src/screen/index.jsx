import './index.css'

const Index = ({history:[first="",second="",third="",fourth=""], operationString="", errorMsg=""}) => {
    return (
        <div className='screen'>
            <p className='history'>
                <span>{fourth}</span>
                <span>{third}</span>
                <span>{second}</span>
                <span>{first}</span>
            </p>
            <div className='current'>{operationString}</div>
            <span className='error'>{errorMsg}</span>
        </div>
    )
}

export default Index