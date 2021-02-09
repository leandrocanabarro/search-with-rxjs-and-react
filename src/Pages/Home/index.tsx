import * as React from 'react';

import { BehaviorSubject, of, merge, empty } from 'rxjs';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter,
  switchMap,
} from 'rxjs/operators';

import Input from '~/Components/Input';
import Results from '~/Components/Results';

const INITIAL_STATE = {
  data: [],
  loading: false,
  noResults: false,
};

export default function Home() {
  const [state, setState] = React.useState<HomeProps>(INITIAL_STATE);

  const subject$ = React.useMemo(() => new BehaviorSubject(''), []);

  React.useEffect(() => {
    const observable = subject$
      .pipe(
        map((searchTerm: string) => searchTerm.trim()),
        distinctUntilChanged(),
        filter((searchTerm: string) => searchTerm.length >= 3),
        debounceTime(1000),
        switchMap((searchTerm) =>
          searchTerm
            ? merge(
                of({ loading: true, noResults: false }),
                fetch(
                  `https://api.github.com/search/users?q=${searchTerm}&per_page=500&sort=ASC`,
                ).then((response: any) => {
                  if (response.status === 200) {
                    return response.json().then((data: ResultsProps) => ({
                      data: data.items,
                      loading: false,
                      noResults: data.total_count === 0,
                    }));
                  }

                  return INITIAL_STATE;
                }),
              )
            : empty(),
        ),
      )
      .subscribe((results: HomeProps) => {
        setState((previousResults) => ({ ...previousResults, ...results }));
      });

    return () => {
      observable.unsubscribe();
      subject$.unsubscribe();
    };
  }, [subject$]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      return subject$.next(event.target.value);
    }

    setState(INITIAL_STATE);

    return false;
  };

  return (
    <div className="container mx-auto px-10">
      <h1 className="text-center mt-10 font-bold text-3xl">
        Encontre usuários no github
      </h1>
      <div className="mx-auto my-6 w-48 border-b-2" />
      <Input loading={state.loading} onChange={onChange} />
      <Results data={state.data} noResults={state.noResults} />
    </div>
  );
}

type DataProps = {
  login: string;
  url: string;
  avatar_url: string;
};

type ResultsProps = {
  total_count: number;
  incomplete_results: boolean;
  items: DataProps[];
};

type HomeProps = {
  data: DataProps[];
  loading: boolean;
  noResults: boolean;
};
