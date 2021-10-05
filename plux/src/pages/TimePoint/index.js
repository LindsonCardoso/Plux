import React, { useEffect, useState } from "react";
import Axios from 'axios'


const date = new Date();


export default function Registrar(){


    const [ dateTime, setDateTime] = useState({

        day: date.getDay(),
        month: date.getMonth(),
        year: date.getFullYear(),
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds()
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const date = new Date();
            setDateTime({
                day: date.getDay(),
                month: date.getMonth(),
                year: date.getFullYear(),
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


    return(

        <section className="section-time" id="about">
         <div className="container">
          
            <div className="title">
              <h1>PluX</h1>
            </div>
     
            <div className="date-time">
             <div>
                 <a className="voltar-tela-ponto"></a>
             </div>
             <div>
              <span className="">{`${dateTime.day}/${dateTime.month}/${dateTime.year}`}</span>
             </div>
             <div>
              <span>{`${dateTime.hours}:${dateTime.minutes}:${dateTime.seconds}`}</span>
             </div>
            </div>

            <span className="">* Horário de Brasília</span>
           
            <div className="Ipo">
             <form className="formSignin">  
              <input type="text" class="form-control" placeholder="Código Empregador" />
              <input type="text" class="form-control" placeholder="" />
             </form>
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