import Image from 'next/image';
import React from 'react';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StatusBar from "@/components/StatusBar";
import Favorites from "@/components/Favorites";

export default function Home() {

    return (
        <div className="modii modii-dark">
            <StatusBar/>
            <Header/>
            <Favorites/>

            <Footer/>
        </div>
    );
}
