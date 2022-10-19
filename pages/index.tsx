import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import Layout from "../layout/Layout";
import { UserContext } from "../components/UserContext";

export default function Home() {
  const [message, setMessage] = useState("");
  const [auth, setAuth] = useState(false);
  const router = useRouter();
  const [value, setValue] = useState("");

  const providerValue = useMemo(() => ({ value, setValue }), [value, setValue]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:8080/users", {
          credentials: "include",
          });
        const data = await res.json();
        const firstElement = data[0];
        const firstName = firstElement.firstName;
        setMessage(`Hello ${firstName}`);
        setAuth(true);
      } catch (error) {
        setMessage("You are not logged in");
        setAuth(false);
        router.push("/login");
      }
    })();
  }, []);

  
  return (
    <Layout auth={auth}>
      <UserContext.Provider value={providerValue}>

      <div className="container"> {message} </div>
      </UserContext.Provider>
    </Layout>
  );
}

