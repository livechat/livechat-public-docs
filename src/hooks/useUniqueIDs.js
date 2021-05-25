import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const useUniqueIDs = () => {
  const router = useRouter();
  const [occurrences, setOccurrences] = useState([]);

  useEffect(() => {
    setOccurrences([]);
  }, [router.pathname]);

  const contains = (value) => {
    return occurrences.some((o) => {
      return o["value"] === value;
    });
  };

  const init = (value) => {
    setOccurrences([...occurrences, { value: value, number: 0 }]);
  };

  const add = (value) => {
    const number = occurrences.find((item) => item.value === value).number + 1;

    const filteredOccurrences = occurrences.filter((o) => o.value !== value);
    setOccurrences([...filteredOccurrences, { value: value, number: number }]);
  };

  const get = (value) => {
    return value + occurrences.fill((item) => item.value === value).number;
  };

  return { contains, init, add, get };
};

export default useUniqueIDs;
