import { useUserData } from "@/helpers/UserProvider";
import Title from "./Title";

const Header = () => {
  const { state } = useUserData();
  return (
    <>
      {state.player.id ? (
        <header>
          <svg
            viewBox="0 0 1rem 1rem"
            className="playerColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              fill={`var(--color-${state.player.color})`}
              cx="1.1rem"
              cy="1rem"
              r="1rem"
            />
          </svg>
          <span>{state.player.name}</span>
        </header>
      ) : (
        ""
      )}
    </>
  );
};

export default Header;
