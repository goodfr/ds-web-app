import React, { useState } from "react";
import './Form.css';

function Form(){

    const [form, setForm] = useState({
        pregnancies: "",
        glucose: "",
        blood_pressure: "",
        skin_thickness: "",
        insulin_level: "",
        bmi: "",
        diabetes_pedigree: "",
        age: "",
    });

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const form_data = new FormData() ; 
        form_data.append("1", form.pregnancies);
        form_data.append("2", form.glucose);
        form_data.append("3", form.blood_pressure);
        form_data.append("4", form.skin_thickness);
        form_data.append("5", form.insulin_level);
        form_data.append("6", form.bmi);
        form_data.append("7", form.diabetes_pedigree);
        form_data.append("8", form.age);

        setLoading(true);

        fetch('https://dsapp0.herokuapp.com/predict', {
            method: 'POST',
            body: form_data 
        })
            .then( response => response.text() )
            .then( html => {
                setResult(html);
            })
    };

    const onChange = (event) => {
        const name = event.target.name ;
        const value = event.target.value ;
        setForm({...form, [name]: value});
    }

    return(
        <form onSubmit={handleSubmit}>
            <h4>Diabetes Prediction Model</h4>
            <p>Example to Predict Probability of diabetes</p>
            <input type="number" name="pregnancies" onChange={onChange} placeholder="Number of Pregnancies"/>
            <input type="number" name="glucose" onChange={onChange} placeholder="Glucose level in sugar"/>
            <input type="number" name="blood_pressure" onChange={onChange} placeholder="Blood pressure"/>
            <input type="number" name="skin_thickness" onChange={onChange} placeholder="Skin thickness"/>
            <input type="number" name="insulin_level" onChange={onChange} placeholder="Insulin level"/>
            <input type="number" name="bmi" onChange={onChange} placeholder="Body Mass Index (BMI)"/>
            <input type="number" name="diabetes_pedigree" onChange={onChange} placeholder="Diabetes pedigree function"/>
            <input type="number" name="age" onChange={onChange} placeholder="Age"/>
            {/* <button type="submit" disabled={loading}>{loading ? "Predicting result..." : "Submit form"}</button> */}
            <button type="submit">{loading ? "Predicting result..." : "Submit form"}</button>

            {result && <div dangerouslySetInnerHTML={{__html: result }} className="result"/> }
        </form>

    );
}

export default Form;
