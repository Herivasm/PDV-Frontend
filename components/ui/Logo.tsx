import Image from "next/image";

export default function Logo() {
    return (
        <Image
            src="/icons/icon-512x512.png"
            alt="Logo"
            width={50}
            height={50}
        />
    )
}