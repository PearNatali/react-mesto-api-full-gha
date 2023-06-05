import success from '../images/success.svg'

function InfoTooltipSuccess() {
    return (
        <div className={'tooltip'}>
            <img
                className="tooltip__img"
                alt={"Иконка галочки"}
                src={success}/>
            <p className="tooltip__text">
                Вы успешно зарегистрировались!
            </p>
        </div>
    )
}

export default InfoTooltipSuccess