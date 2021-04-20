import { useEffect, useContext } from "react";
import RegisterForm from "../components/user/RegisterForm";
import { UserContext } from "../context/UserContext";
import { useRouter } from "next/router";
import Head from "next/head";

export default function register() {
  const [user, setUser] = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Register to Forumly</title>
      </Head>
      <RegisterForm />
    </>
  );
}
