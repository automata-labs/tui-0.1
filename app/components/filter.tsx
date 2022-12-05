import { useState } from 'react';

type FilterProps = {
  text: string;
};

export default function AttributesFilter({ text }: FilterProps) {
  return (
    <>
      <button
        // onClick={() => setShowModal(!showModal)}
        className="button button--filled attributes-filter"
      >
        {text}
        <svg
          width="10"
          height="5"
          viewBox="0 0 10 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 0.5L5 4.5L9 0.5"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </>
  );
}
