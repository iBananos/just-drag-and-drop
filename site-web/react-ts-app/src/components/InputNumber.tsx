
interface inputProps{
    min : string;
    step : string;
    defaultValue :number;
    id :string;
}


const InputNumber = (props:inputProps) => {

    function roundDecimal(nombre:number, precision:number){
        precision = precision || 2;
        var tmp = Math.pow(10, precision);
        return Math.round( nombre*tmp )/tmp;
    }

    function increaseCounter(){
        var value = (document.getElementById(props.id) as HTMLInputElement).value;
        var res =(parseFloat(value)+parseFloat(props.step));
        (document.getElementById(props.id) as HTMLInputElement).value = roundDecimal(res,props.step.length).toString();
    }

    function  decreaseCounter(){
        var value = (document.getElementById(props.id) as HTMLInputElement).value;
        var res =(parseFloat(value)-parseFloat(props.step));
        if(res>0){
            (document.getElementById(props.id) as HTMLInputElement).value = roundDecimal(res,props.step.length).toString();
        }else{
            (document.getElementById(props.id) as HTMLInputElement).value = "0"
        }
        
    }


    return (
        <div className="InputNumberComponent">
            <button className="boutonMinus" onClick={decreaseCounter}>-</button>
            <input type="number" className="inputNumber" min={props.min} step={props.step} defaultValue={props.defaultValue} id={props.id}/>
            <button className="boutonPlus" onClick={increaseCounter}>+</button>
        </div>
    );
};

export default InputNumber;