import * as React from 'react';

export default function Input({ loading, onChange }: InputProps) {
  return (
    <>
      <div className="mx-auto py-10">
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Informe um nome, sobrenome ou login"
          aria-label="Procurar usúarios no github"
          onChange={onChange}
        />
        <div className="mx-auto my-6">
          {loading ? (
            <div className="bg-green-200 p-5 w-full rounded">
              <div className="flex justify-between">
                <div className="flex-1 leading-tight text-sm text-green-600 font-medium">
                  Aguarde enquanto organizamos as informações encontradas para
                  sua pesquisa.
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-blue-200 p-5 w-full rounded">
              <div className="flex justify-between">
                <div className="flex-1 leading-tight text-sm text-blue-500 font-medium">
                  Veja abaixo as informações encontradas.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

type InputProps = {
  loading: boolean;
  onChange(value: React.ChangeEvent<HTMLInputElement>): void;
};
