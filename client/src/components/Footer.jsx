import { NavLink } from "react-router-dom";

const Footer = () => {
    const footerLinks = [
        {
            title: "Quick Links",
            links: [
                { text: "Home", url: "/" },
                { text: "All Listings", url: "/products" },
                { text: "Sell Item", url: "/sell" },
                { text: "Contact Us", url: "/contact" },
            ],
        },
    ];

    return (
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-24 bg-primary/10">
            <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">L</div>
                        <span className="text-2xl font-bold text-gray-800">Legacy</span>
                    </div>
                    <p className="max-w-[410px]">
                        Your campus marketplace for buying and selling textbooks, lab coats, notes, bicycles, and more. Connect with fellow students and save money.</p>
                </div>
                <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
                    {footerLinks.map((section, index) => (
                        <div key={index}>
                            <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">{section.title}</h3>
                            <ul className="text-sm space-y-1">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <NavLink to={link.url} className="hover:underline transition">{link.text}</NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
                Copyright {new Date().getFullYear()} © Legacy - University Marketplace. All Rights Reserved.
            </p>
        </div>
    );
};

export default Footer