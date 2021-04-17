import axios from "axios";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function Logout() {
  const [user, setUser] = useContext(UserContext);
  const router = useRouter();

  const handleLogout = () => {
    axios("api/logout");
    router.push("/");
    setUser(null);
  };

  return (
    <button className="button" onClick={handleLogout}>
      Logout
    </button>
  );
}
