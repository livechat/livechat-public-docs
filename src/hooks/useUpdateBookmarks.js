import { useMutation, useQueryClient } from "react-query";
import api from "../api";

const useUpdateBookmarks = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: updateBookmarks, isLoading } = useMutation(
    (values) => api.getDPS().updateBookmarks(values),
    {
      onMutate: async (newBookmarks) => {
        queryClient.cancelQueries("allBookmarks");
        const previousBookmarks = queryClient.getQueryData("allBookmarks");
        queryClient.setQueryData("allBookmarks", newBookmarks);
        return { previousBookmarks };
      },
    }
  );
  return { updateBookmarks, isLoading };
};
export default useUpdateBookmarks;
