import {Navbar} from "flowbite-react";
import React from "react";
export default function NavbarComp () {
    return(
        <Navbar>
            {/* Navbar.Brand */}
            <Navbar.Brand style={{marginLeft:'0%'}} href="/home">
                <img
                    className="mr-3 h-6 sm:h-9"
                    src="/ocr.png"
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          OCRbuddy
          </span>
            </Navbar.Brand>

            {/* Navbar.Toggle */}
            <Navbar.Toggle />

            {/* Navbar.Collapse */}
            <Navbar.Collapse>
                {/* Navbar.Link */}
                <Navbar.Link active href="#">
                    <p>Home</p>
                </Navbar.Link>

                {/* Navbar.Link */}
                <Navbar.Link href="#">
                    <p>About</p>
                </Navbar.Link>

                {/* Navbar.Link */}
                <Navbar.Link href="#">Services</Navbar.Link>

                {/* Navbar.Link */}
                <Navbar.Link href="#">Pricing</Navbar.Link>

                {/* Navbar.Link */}
                <Navbar.Link href="#">Contact</Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
        )

}
