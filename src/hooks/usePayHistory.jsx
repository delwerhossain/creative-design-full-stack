import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
const usePayHistory = () => {
  const { user, loading } = useAuth();
  // const token = localStorage.getItem('access-token');
  const [axiosSecure] = useAxiosSecure();
  const { refetch, data: history = [] } = useQuery({
    queryKey: ["history", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/payment-history?email=${user?.email}`);
      return res.data;
    },
  });

  return [history, refetch];
};
export default usePayHistory;
