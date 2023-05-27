import './index.css'

const Index = ({content, clickHandler}) => {
    return (
        <button className="btn-num" onClick={clickHandler}>{content}</button>
    )
}

export default Index