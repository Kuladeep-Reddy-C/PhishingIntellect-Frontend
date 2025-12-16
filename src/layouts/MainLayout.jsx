import React, { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function MainLayout({ children }) {
    const [userRole] = useState("guest");
    const location = useLocation();
    const navigate = useNavigate();

    const currentPage = useMemo(() => {
        const path = location.pathname;
        if (path === "/home") return "home";
        if (path === "/detect") return "detect";
        if (path === "/report") return "report";
        if (path === "/about") return "about";
        return "";
    }, [location.pathname]);

    const handleNavigate = (page) => {
        const path = page === "home" ? "/home" : `/${page}`;
        navigate(path);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const scrollToSection = (sectionId) => {
        const scroll = () => {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        };

        if (location.pathname !== "/home") {
            navigate("/home");
            setTimeout(scroll, 100);
        } else {
            scroll();
        }
    };

    const enhancedChild = React.isValidElement(children)
        ? React.cloneElement(children, {
            onNavigate: handleNavigate,
            onScrollToSection: scrollToSection,
            userRole,
            currentPage,
        })
        : children;

    return (
        <div className="min-h-screen bg-white">
            <Navbar
                onNavigate={handleNavigate}
                onScrollToSection={scrollToSection}
                userRole={userRole}
                currentPage={currentPage}
            />
            {enhancedChild}
        </div>
    );
}

export default MainLayout;
