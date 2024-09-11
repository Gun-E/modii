import Image from "next/image";
import React from "react";

export default function StatusBar() {
    return (
        <Image
            src="/images/Status bar.png"
            alt="Status bar"
            className="absolute"
            style={{objectFit: 'cover'}}
            width={393}
            height={54}
        />
    );
}