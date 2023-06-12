import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
const useEnroll = () => {
  const { user, loading } = useAuth();
  // const token = localStorage.getItem('access-token');
  const [axiosSecure] = useAxiosSecure();
  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["carts", user?.email],
    enabled: !loading,
    queryFn: async () => {
        const res = await axiosSecure(`/enrolled?email=${user?.email}`);
        console.log(res);
      return res.data;
    },
  });

  return [cart, refetch];
};
export default useEnroll;
