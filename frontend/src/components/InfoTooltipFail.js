import fail from '../images/fail.svg';

function InfoTooltipFail() {
    return (
        <div className={'tooltip'}>
            <img
                className="tooltip__img"
                alt={"Иконка крестика"}
                src={fail}/>
            <p className="tooltip__text">
                Что-то пошло не так! Попробуйте ещё раз.
            </p>
        </div>
    )
}

export default InfoTooltipFail