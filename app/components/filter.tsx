import { useState } from 'react';

type FilterProps = {
  attributes: any;
};

export default function AttributesFilter() {
  return (
    <>
      <button
        // onClick={() => setShowModal(!showModal)}
        className="button button--filled attributes-filter"
      >
        Traits
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
