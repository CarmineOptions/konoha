import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ page, route }: { page: string; route: string }) => {
  return (
    <nav className="flex items-center text-sm space-x-2 pt-6">
      <Link to="/" className="text-[#8E886A] font-inter text-[14px] hover:underline">
        Home
      </Link>

      <React.Fragment key={page}>
        <span className="text-[#8E886A] font-inter text-[14px]">{">"}</span>
        <Link
          to={route}
          className="text-black font-inter text-[14px] font-medium hover:underline"
        >
          {page}
        </Link>
      </React.Fragment>
    </nav>
  );
};

export default Breadcrumb;
