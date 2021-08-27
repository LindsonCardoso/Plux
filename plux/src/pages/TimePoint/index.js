import React, { useEffect, useState } from "react";
import Axios from 'axios'
import './times.css'


const date = new Date();



export default function Registrar(){


    const [ dateTime, setDateTime] = useState({
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds()
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const date = new Date();
            setDateTime({
                hours: date.getHours(),
                minutes: date.getMinutes(),
                seconds: date.getSeconds()
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [])


    
    const handleSubmit = async ()=>{
        alert('CLICOU')
        console.log(dateTime)

        Axios.post("http://localhost:3001/api/register", {
    
            horas:`${dateTime.hours}:${dateTime.minutes}:${dateTime.seconds}`

        }).then(() => {
            alert('SuccessFull insert')
        })

    }


      

    function BaterPonto(){



    }


    return(

        <section className="section-time" id="about">
         <div className="container">
          
            <div className="title">
              <h1>PluX</h1>
            </div>
     
            <div className="CountdownContainer">
                <div>
                    <span>{dateTime.hours}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{dateTime.minutes}</span>
                </div>
                    <span>:</span>
                <div>
                    <span>{dateTime.seconds}</span>
                </div>
            </div>

            <div >
            <button className="startCountdownButton" type="submit" onClick={handleSubmit}>Gravar ponto</button>
            </div>


            </div>
        </section>
    )

}



/**
 * 
Dentro App, temos o dateTimeestado, que criamos com o useStategancho.

Ele é definido como um objeto com as hours, minutese secondspropriedades.

Ficamos com as horas, minutos e segundos com getHours, getMinutese, getSecondsrespectivamente.

Em seguida, adicionamos o useEffectgancho para obter a última data e hora atribuídas à datevariável.

Chamamos setIntervalpara definir a última data e hora a cada segundo, conforme indicado pelo segundo argumento.

Em seguida, ligamos setDateTimecom os valores de horas, minutos e segundos.

Na última linha do useEffectretorno de chamada, retornamos uma função que chama clearIntervalcom timerpara limpar o cronômetro quando desmontamos o componente.**/