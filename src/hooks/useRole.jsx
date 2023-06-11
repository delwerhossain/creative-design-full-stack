import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
const useRole = () => {
  const { user } = useAuth();
  // const token = localStorage.getItem('access-token');
  const [axiosSecure] = useAxiosSecure();
  const { refetch, data: userCheck = [] } = useQuery({
    queryKey: ["userCheck", user?.email],
    // enabled: !loading,
    queryFn: async () => {
        const res = await axiosSecure.post(`/check-user-role`, {
          email: user?.email
        });
        console.log(res?.data);
      return res?.data?.role;
    },
  });

  return [userCheck, refetch];
};
export default useRole;
