import Image from "next/image";
import React from "react";

export default function StatusBar() {
    return (
        <Image
            src="/images/Status bar.png"
            alt="Status bar"
            className="absolute w-auto"
            width={393}
            height={54.1}
            style={{objectFit: 'cover'}}
            priority
        />
    );
}