
import { useEnsureLoggedIn } from "~/hooks/useEnsureLoggedIn";

function Home() {
  useEnsureLoggedIn();

  return <div>HOME PAGE</div>;
}

export default Home;
