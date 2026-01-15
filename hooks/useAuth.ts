// "use client";

// import { useEffect, useState } from "react";
// import { apolloClient } from "../lib/apolloClient";
// // import { REFRESH_TOKEN_MUTATION } from "../graphql/mutations";

// export const useAuth = () => {
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const refreshToken = async () => {
//       try {
//         const result = await apolloClient.mutate({
//           mutation: REFRESH_TOKEN_MUTATION,
//         });

//         if (result.data?.refreshToken?.accessToken) {
//           localStorage.setItem("accessToken", result.data.refreshToken.accessToken);
//           setUser(result.data.refreshToken.user);
//         }
//       } catch (err) {
//         console.log("Refresh token failed, logging out");
//         localStorage.removeItem("accessToken");
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     refreshToken();
//   }, []);

//   return { user, loading };
// };
