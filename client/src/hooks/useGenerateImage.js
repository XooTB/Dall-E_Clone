import { useAtom } from "jotai";
import { useState } from "react";
import { formAtom } from "../atoms";

export const useGenerateImage = () => {
  const [form, setForm] = useAtom(formAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const generateImage = async () => {
    setIsLoading(true);
    if (form.prompt) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API}/dalle`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });

        const data = await response.json();
        console.log(data);
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }
  };

  return { isLoading, generateImage, error };
};
