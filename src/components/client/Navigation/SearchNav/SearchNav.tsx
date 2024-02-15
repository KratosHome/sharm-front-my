import React, { ChangeEvent, useState } from "react";

import { useSearchParams } from "next/navigation";

import SearchSvg from "@/components/svg/SearchSvg";

import "./SearchNav.scss";

const SearchNav = () => {
  const searchParams = useSearchParams();

  const [inputValue, setValue] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    setValue(inputValue);
  };

  const handleSearch = () => {
    if (inputValue) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("query", inputValue);
      window.history.pushState(null, "", `?${params.toString()}`);

      return;
    }

    if (!inputValue) return window.history.pushState(null, "", `/`);
  };

  const handleKeyPress = (event: { key: any }) => {
    if (event.key === "Enter") return handleSearch();
  };

  return (
    <div className="search mobile-menu__item">
      <input
        type="text"
        className="search__input"
        placeholder="Пошук"
        value={inputValue ?? ""}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
      />
      <div className="search__icon">
        <SearchSvg />
      </div>
    </div>
  );
};

export default SearchNav;
