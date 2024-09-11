import Link from "next/link";
import Image from "next/image";

export default function Header() {
    return (
        <div className="pt-12">
            <div className="p-7 flex items-center justify-between">
                <Image
                    src="/images/logo_main.png"
                    alt="logo"
                    style={{objectFit: 'cover'}}
                    width={93}
                    height={24}
                />
                <Link href="/settings">
                    <Image
                        src="/images/icon_24px_set.png"
                        alt="settings icon"
                        style={{objectFit: 'cover'}}
                        width={24}
                        height={24}
                    />
                </Link>

            </div>
        </div>

    );
}