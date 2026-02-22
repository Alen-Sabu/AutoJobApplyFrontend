
import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <Image
        src="/images/logo/white_logo.png"
        alt="logo"
        width={50}
        height={30}
       
        quality={100}
      />
    </Link>
  );
};

export default Logo;
