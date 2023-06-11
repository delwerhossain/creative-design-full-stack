import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
const useClass = () => {
  const { user, loading } = useAuth();
  // const token = localStorage.getItem('access-token');
  const [axiosSecure] = useAxiosSecure();
  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["class", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/class?email=${user?.email}`);
      console.log("res from axios", res);
      return res.data;
    },
  });

  return [cart, refetch];
};
export default useClass;
