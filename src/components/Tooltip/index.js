

const Tooltip = ({ alert }) => {
    return (
        alert !== null && (
            <div  className={`tooltip-${alert.type}`}>
                <span>
                    <i className="fas fa-info-circle" />
                    {` ${alert.msg}`}
                </span>
            </div>
        )
    )
}

export default Tooltip