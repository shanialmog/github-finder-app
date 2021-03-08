

const Tooltip = ({ alert }) => {
    return (
        alert !== null && (
            <span  className={`tooltip-${alert.type}`}>
                    <i className="fas fa-info-circle" />
                    {` ${alert.msg}`}
            </span>
        )
    )
}

export default Tooltip