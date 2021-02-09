import * as React from 'react';

export default function Results({ data, noResults }: ResultsProps) {
  return (
    <div className="mb-24">
      {noResults && <div> No results for this search </div>}
      <div className="grid grid-cols-4 gap-12">
        {data.map(({ login, avatar_url }) => (
          <div
            className="bg-white shadow appearance-none border p-4 rounded w-64"
            key={login}
          >
            <div className="text-center mt-4">
              <p className="text-gray-600 font-bold">{login}</p>
            </div>
            <div className="flex justify-center mt-4">
              <img
                className="shadow w-32 h-32 rounded-full"
                src={avatar_url}
                alt={login}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

type DataProps = {
  login: string;
  url: string;
  avatar_url: string;
};

type ResultsProps = {
  data: DataProps[];
  noResults: boolean;
};
