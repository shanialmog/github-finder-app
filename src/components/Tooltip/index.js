

const Tooltip = ({ alert }) => {
    return (
        alert !== null && (
            <span  className={`tooltip-${alert.type}`}>
                {/* <span> */}
                    <i className="fas fa-info-circle" />
                    {` ${alert.msg}`}
                {/* </span> */}
            </span>
        )
    )
}

export default Tooltip