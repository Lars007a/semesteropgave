import { useEffect } from "react";
import { useState } from "react";

/* Hook til at få produkterne fra apien. */
export function useGetProducts() {
  const [data, setData] = useState([]);

  const sendReq = async () => {
    try {
      const result = await fetch("https://legekrogen.webmcdm.dk/products");

      if (!result.ok) {
        throw new Error("resultat ikke OK!");
      }

      const json = await result.json();
      setData(json);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    sendReq();
  }, []);

  return data;
}

/* Hook til at få citaterne fra kunderne fra apien. */

export function useGetQuotes() {
  const [data, setData] = useState([]);

  const sendReq = async () => {
    try {
      const result = await fetch("https://legekrogen.webmcdm.dk/reviews");

      if (!result.ok) {
        throw new Error("resultat ikke OK!");
      }

      const json = await result.json();
      setData(json);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    sendReq();
  }, []);

  return data;
}

/* Hook til at få faq spørgsmål fra apien. */

export function useGetFAQS() {
  const [data, setData] = useState([]);

  const sendReq = async () => {
    try {
      const result = await fetch("https://legekrogen.webmcdm.dk/questions");

      if (!result.ok) {
        throw new Error("resultat ikke OK!");
      }

      const json = await result.json();
      setData(json);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    sendReq();
  }, []);

  return data;
}

/* disse funktioner kan måske godt kombineres ind i en funktion? Hvor et argument i hooken bestemmer om får produkter, faq, citater, etc, etc. */