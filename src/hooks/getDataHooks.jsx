import { useEffect } from "react";
import { useState } from "react";

export function useGetProducts() {

    const [data, setData] = useState([]);


    const sendReq = async () => {
        try {
        const result = await fetch("http://localhost:5000/api/products");

            if(!result.ok) {
                throw new Error("resultat ikke OK!");
            }

        const json = await result.json();
        setData(json);

        }catch(error) {
            console.log(error.message);
        }
    }


    useEffect(() => {
        sendReq();
    }, []);


    return data;
}

export function useGetQuotes() {

    const [data, setData] = useState([]);


    const sendReq = async () => {
        try {
        const result = await fetch("http://localhost:5000/api/reviews");

            if(!result.ok) {
                throw new Error("resultat ikke OK!");
            }

        const json = await result.json();
        setData(json);

        }catch(error) {
            console.log(error.message);
        }
    }


    useEffect(() => {
        sendReq();
    }, []);


    return data;
}


export function useGetFAQS() {

    const [data, setData] = useState([]);


    const sendReq = async () => {
        try {
        const result = await fetch("http://localhost:5000/api/accordions");

            if(!result.ok) {
                throw new Error("resultat ikke OK!");
            }

        const json = await result.json();
        setData(json);

        }catch(error) {
            console.log(error.message);
        }
    }


    useEffect(() => {
        sendReq();
    }, []);


    return data;
}