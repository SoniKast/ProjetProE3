import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const DropdownMenu = ({ title, links }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="dropdown">
            <div
                className="bg-light text-center nav-link link-secondary dropdown-btn pe-auto"
                onClick={() => setIsOpen(!isOpen)}
                style={{ cursor: "pointer" }}
            >
                {title} <i className={`bi bi-caret-${isOpen ? "up" : "down"}-fill`}></i>
            </div>

            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="dropdown-container"
                style={{ display: isOpen ? "block" : "none" }}>
                <ul className="dropdown-ul">
                    {links.map((link, index) => (
                        <li key={index} className="dropdown-link">
                            <Link className="nav-link link-light" to={link.path}>
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </motion.div>
        </div>
    );
};

export default DropdownMenu;
