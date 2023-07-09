import { cx } from "@emotion/css";
import Block from "../components/ui/Block/Block";
import { AiFillGithub } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";
import Menu from "../components/pages/HomePage/Menu/Menu";

/**
 * * Components:
 * * "../components/pages/HomePage"
 */

export default function Index() {
  return (
    <div
      className={cx(
        "w-screen h-screen",
        "flex flex-col items-center",
        "pt-[300px]",
        "bg-[url('https://scrollprize.org/img/landing/vesuvius.jpg')] bg-cover"
      )}
    >
      {/* Logo */}
      <h1 className={cx("text-6xl font-extrabold text-m3")}>VC Scrolls Game</h1>
      <Block value={6} />
      {/* Descrition */}
      <h2 className={cx("text-3xl text-c1")}>
        A Web Base Game design for Vesuvius Challenge
      </h2>
      <Block value={12} />
      {/* Menu */}
      <Menu />
      <Block value={12} />
      {/* Links */}
      <ul
        className={cx(
          "flex",
          "text-sm text-m2",
          "flex flex-col items-center gap-1"
        )}
      >
        <li>
          Vesuvius Challenge :{" "}
          <a
            href="https://scrollprize.org/"
            className="underline"
            target="_blank"
          >
            https://scrollprize.org/
          </a>
        </li>
      </ul>
      <Block value={2} />
      {/* Social */}
      <ul className={cx("flex", "text-xl text-m2", "flex items-center gap-2")}>
        <li>
          <button>
            <a
              href="https://github.com/Dalufishe/vc-scrolls-game"
              target="_blank"
            >
              <AiFillGithub />
            </a>
          </button>
        </li>
        <li>
          <button>
            <FaDiscord />
          </button>
        </li>
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
