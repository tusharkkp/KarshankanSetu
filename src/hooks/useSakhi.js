import { useState } from "react";
import { runSakhiEngine } from "../sakhi/sakhiEngine";
import { useContextGraph } from "./useContextGraph";

export const useSakhi = () => {
  const context = useContextGraph();
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const askSakhi = async (question) => {
    if (!context) return;

    setLoading(true);

    const result = runSakhiEngine({
      question,
      context,
    });

    setResponse(result);
    setLoading(false);
  };

  return {
    askSakhi,
    response,
    loading,
    context,
  };
};
