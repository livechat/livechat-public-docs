import React, { useEffect, useState } from "react";
import api from "api";

function useFetchBookmarks({ fetchData, onError, onSuccess }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    
  }, []);
  return { data, loading, error };
}

export default useFetchBookmarks;
