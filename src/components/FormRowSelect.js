import React from "react";

const FormRowSelect = ({
    labelText,
    name,
    value,
    handleChange,
    list,
    wrapperClass
}) => {
    return (
        <div className={`${wrapperClass} flex flex-col w-full  sm:text-sm text-xs `}>
            <label htmlFor="name" className="text-white capitalize tracking-wide">
                {labelText || name}
            </label>
            <select
                name={name}
                value={value}
                id={name}
                onChange={handleChange}
                className="border-[0.5px] rounded border-gray-300 mt-1 p-[0.3rem] capitalize outline-none text-gray-600"
            >
                {list.map((itemValue) => {
                    return (
                        <option key={itemValue} value={itemValue} className="capitalize">
                            {itemValue}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

export default FormRowSelect;