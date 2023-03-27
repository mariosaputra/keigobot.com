import Link from "next/link";
import Image from "next/image";
import emailIcon from "@/images/email.png";

export default function Footer() {
  return (
    <footer className="text-center h-10 w-full sm:pt-2 border-t mt-5 flex sm:flex-row flex-col justify-between items-center px-3 sm:mb-0">
      <div>
        Credits:{" "}
        <a
          href="https://openai.com/"
          target="_blank"
          rel="noreferrer"
          className="font-bold hover:underline transition underline-offset-2 mr-1"
        >
          OpenAI
        </a>
        <span>・</span>
      </div>
      <div className="flex space-x-4 pb-4 sm:pb-0">
        <Link href={"mailto:contact@keigobot.com"}>
          <Image src={emailIcon} alt="email" />
        </Link>
      </div>
    </footer>
  );
}
