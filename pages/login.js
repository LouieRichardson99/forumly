import { useEffect, useContext } from "react";
import LoginForm from "../components/user/LoginForm";
import { useRouter } from "next/router";
import { UserContext } from "../context/UserContext";

export default function login() {
  const [user, setUser] = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  return (
    <>
      <LoginForm />
    </>
  );
}
