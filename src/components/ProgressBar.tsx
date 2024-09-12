import Image from "next/image";
import React from "react";

export default function ProgressBar() {
    return (
        <div className="mt-4 flex justify-center align-items-center">
            <Image
                src={`/images/progress bar.png`}
                alt={`progress bar`}
                style={{
                    objectFit: 'cover',
                }}
                width={50}
                height={50}
            />
        </div>

    );
}