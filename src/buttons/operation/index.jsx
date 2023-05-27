import './index.css'

const Index = ({content, clickHandler}) => {
    return (
        <button className="btn-op" onClick={clickHandler}>{content}</button>
    )
}

export default Index