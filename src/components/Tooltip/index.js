

const Tooltip = ({ tooltipTest }) => {
    return (
        tooltipTest !== null && (
            <span  className={`tooltip-${tooltipTest.type}`}>
                    <i className="fas fa-info-circle" />
                    {` ${tooltipTest.msg}`}
            </span>
        )
    )
}

export default Tooltip