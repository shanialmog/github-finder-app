

const Tooltip = ({ tooltipText }) => {
    return (
        tooltipText !== null && (
            <span className={`tooltip-${tooltipText.type}`}>
                <i className="fas fa-info-circle" />
                {` ${tooltipText.msg}`}
            </span>
        )
    )
}

export default Tooltip