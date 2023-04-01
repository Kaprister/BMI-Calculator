import React from 'react'
import { useState } from 'react';
import "./content.css";


const Content = () => {
    const [formData, setFormData] = useState({
        weight : "",
        feet : "",
        inches : "",
    })

    function changeHandler(event) {
        setFormData((prev) => ({
            ...prev,
            [event.target.name] : event.target.value
        }));
    }

    let height = (12 * parseInt(formData.feet) + parseInt(formData.inches)) * 2.54;
    let weight = parseInt(formData.weight);
    let bmi = (weight / ((height * height) / 10000)).toFixed(2);
    let result = document.querySelector("#status");
    let container = document.querySelector("#wrapper");
    let content = document.querySelector("#content");

    console.log(bmi);

    function changeStatus(event) {
        if (height === "" || isNaN(height)) {
            result.value = "Provide a valid Height!";
            content.classList.add("bg-red-600");
            container.classList.remove("bg-yellow-500");
            container.classList.remove("bg-red-500");
            container.classList.remove("bg-green-500");
        }  
        else if (weight === "" || isNaN(weight)) {
            result.value = "Provide a valid Weight!";
            content.classList.add("bg-red-600");
            container.classList.remove("bg-yellow-500");
            container.classList.remove("bg-red-500");
            container.classList.remove("bg-green-500");
        }    
        // If both input is valid, calculate the bmi
        else {
            // Dividing as per the bmi conditions
            if (bmi < 18.6){
                result.value = "Under Weight";
                container.classList.add("bg-yellow-500")
                content.classList.remove("bg-red-600");
                container.classList.remove("bg-green-500")
                container.classList.remove("bg-red-500")
            } 
            else if (bmi >= 18.6 && bmi < 24.9) {
                result.value = "Normal";
                container.classList.add("bg-green-500")
                content.classList.remove("bg-red-600");
                container.classList.remove("bg-yellow-500")
                container.classList.remove("bg-red-500")
            }
            else{
                result.value = "Over Weight";
                container.classList.add("bg-red-500")
                content.classList.remove("bg-red-600");
                container.classList.remove("bg-yellow-500")
                container.classList.remove("bg-green-500")
            }
        }
    }

    function submitHandler(event) {
        event.preventDefault();
        changeStatus();
        // console.log(formData);
    }


  return (
    <div id="wrapper" className="  h-[100vh] w-full flex flex-col justify-center items-center bg-[#192345]">
        <h1 className="text-white text-xl tracking-wider leading-10 font-extrabold uppercase" >BMI Calculator</h1>
        <div id="content" className="rounded-md bg-[#152d78] p-4 m-3">
            <div className="flex flex-col justify-center items-center gap-3">
                <label>
                    <p className='font-bold text-center text-yellow-50 shadow-md'>BMI STATUS</p>
                    <input 
                        id='status'
                        type="text"
                        name="status"
                        placeholder='status'
                        onChange={changeStatus}
                        className="border-2 font-bold w-[200px] border-slate-500 bg-[#8ee9ed] rounded-md text-center outline-none"
                        readOnly
                    />
                </label>
                <form onSubmit={submitHandler} >
                    <label>
                        <p className='font-bold text-center text-yellow-50 uppercase'>Weight</p>
                        <input
                            id='weight'
                            type="text"
                            name="weight"
                            placeholder='Enter weight (in kg)'
                            value={formData.weight}
                            onChange={changeHandler}
                            className="border-2 font-bold w-[200px] border-slate-500 rounded-md text-center bg-[#ccfbf1] outline-none "
                        />
                    </label>
                    <label>
                        <p className="font-bold uppercase text-yellow-50 text-center">Height</p>
                        <div className="flex gap-2 justify-center">
                            <input
                                id='feet'
                                type="text"
                                name='feet'
                                placeholder='feet'
                                value={formData.feet}
                                onChange={changeHandler}
                                className="border-2 font-bold border-slate-500 bg-[#ccfbf1] rounded-md w-[80px] text-center outline-none "
                            />
                            <span className="font-extrabold text-white">:</span>
                            <input
                                id='inches'
                                type='text'
                                name='inches'
                                placeholder='inch'
                                value={formData.inches}
                                onChange={changeHandler}
                                className='border-2  font-bold border-slate-500 rounded-md w-[80px] text-center bg-[#ccfbf1] outline-none '
                            />
                        </div>
                    </label>
                    <div className="text-center mt-3 text-yellow-50 font-bold">
                        <button
                            className="bg-[#6366f1] hover:border-2 rounded-md p-1 hover:text-black hover:bg-[#818cf8]"
                        >Calculate</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Content
