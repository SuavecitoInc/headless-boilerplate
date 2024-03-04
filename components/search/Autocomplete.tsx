'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { createAutocomplete } from '@algolia/autocomplete-core';
import { getAlgoliaResults } from '@algolia/autocomplete-js';
import { useClickAway } from 'react-use';
import { IconSearch, IconClose, Button } from '@/components/ui';
import { useAutocomplete } from '@/contexts/Autocomplete';
import { searchClient } from '@/utils/algolia';
import '@algolia/autocomplete-theme-classic';
import AutoHit from './AutoHit';

const HITS_PER_PAGE = 5;

export const Autocomplete: React.FC = () => {
  const { setShowSearch } = useAutocomplete();
  const router = useRouter();
  const [autocompleteState, setAutocompleteState] = useState<any>({});
  const containerRef = useRef<null | HTMLDivElement>(null);
  const autocompleteRef = useRef<null | HTMLDivElement>(null);
  const inputRef = useRef<null | HTMLInputElement>(null);
  const formRef = useRef(null);
  const panelRef = useRef(null);

  const hasText = (inputText: string): boolean =>
    !!inputText && inputText.trim().length > 0;

  const handleClose = () => {
    if (hasText(autocompleteState.query as string)) return;
    setShowSearch(false);
  };

  const handleViewInSearch = () => {
    if (!autocompleteState.query) return;
    setShowSearch(false);
    // setQuery(autocompleteState.query);
    router.push('/search');
  };

  const autocomplete = useMemo(
    () =>
      createAutocomplete({
        id: 'autocomplete-search',
        onStateChange({ state }) {
          setAutocompleteState(state);
        },

        onSubmit({ state }) {
          setShowSearch(false);
          router.push(`/search?q=${state.query}`);
        },
        onReset() {
          setAutocompleteState({});
        },

        // @ts-ignore
        getSources() {
          return [
            {
              sourceId: 'products',
              getItemInputValue({ item }) {
                return item.query;
              },
              getItems({ query: _query }) {
                return getAlgoliaResults({
                  searchClient,
                  queries: [
                    {
                      indexName: `shopify_products`,
                      query: _query,
                      params: {
                        hitsPerPage: HITS_PER_PAGE,
                        clickAnalytics: true,
                        highlightPreTag: '<mark>',
                        highlightPostTag: '</mark>',
                      },
                    },
                  ],
                });
              },
              getItemUrl({ item }) {
                return `/products/${item.handle}`;
              },
            },
          ];
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const { getEnvironmentProps } = autocomplete;

  useEffect(() => {
    if (!(formRef.current && panelRef.current && inputRef.current)) {
      return;
    }

    const { onTouchStart, onTouchMove, onMouseDown } = getEnvironmentProps({
      formElement: formRef.current,
      panelElement: panelRef.current,
      inputElement: inputRef.current,
    });

    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('mousedown', onMouseDown);

    // eslint-disable-next-line consistent-return
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mousedown', onMouseDown);
    };
  }, [getEnvironmentProps, autocompleteState.isOpen]);

  useClickAway(containerRef, () => {
    setShowSearch(false);
  });

  return (
    <div className="mx-auto max-w-[768px]" ref={containerRef}>
      <div
        className="aa-Autocomplete relative z-10 h-full w-full bg-white"
        {...autocomplete.getRootProps({})}
        ref={autocompleteRef}
      >
        <div className="mx-auto flex w-full items-center justify-center bg-white">
          {/* @ts-ignore */}
          <form
            ref={formRef}
            className="aa-Form m-4 w-full"
            {...autocomplete.getFormProps({ inputElement: inputRef.current })}
          >
            <div className="flex w-full flex-row border-none">
              <div className="aa-InputWrapperPrefix">
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label
                  className="aa-Label"
                  {...autocomplete.getLabelProps({ htmlFor: 'search' })}
                >
                  <button
                    type="button"
                    className="aa-SubmitButton"
                    name="search"
                    aria-label="Search"
                  >
                    <IconSearch className="fill-tertiary" />
                  </button>
                </label>
              </div>

              <div className="aa-InputWrapper">
                {/* @ts-ignore */}
                <input
                  className="aa-Input flex-auto"
                  ref={inputRef}
                  {...autocomplete.getInputProps({
                    id: 'search',
                    inputElement: null,
                    autoFocus: true,
                  })}
                />
              </div>

              <div className="aa-InputWrapperSuffix">
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label
                  className="aa-Label"
                  {...autocomplete.getLabelProps({ htmlFor: 'close' })}
                >
                  <button
                    type="reset"
                    name="clear"
                    aria-label="Clear"
                    className="aa-ClearButton"
                    onClick={() => handleClose()}
                  >
                    <IconClose className="fill-tertiary" />
                  </button>
                </label>
              </div>
            </div>
          </form>
        </div>
        <div className="relative mx-auto block h-full w-full">
          {autocompleteState.isOpen && (
            // @ts-ignore
            <div
              ref={panelRef}
              className={clsx(
                'aa-Panel !overflow-auto w-full h-screen md:h-[unset]',
                autocompleteState.status === 'stalled' && 'aa-Panel--stalled'
              )}
              {...autocomplete.getPanelProps({})}
            >
              <div className="m-4 flex flex-col border-tertiary md:flex-row">
                {autocompleteState.collections.map((collection: any) => {
                  const { source, items } = collection;
                  const isProducts = source.sourceId === 'products';
                  return (
                    <div
                      key={source.sourceId}
                      className={clsx(
                        'aa-Source',
                        isProducts ? 'flex-2' : 'flex-1'
                      )}
                    >
                      <div className="pb-24 md:pb-0">
                        <h3 className="mb-3 font-bold uppercase text-tertiary">
                          {source.sourceId}
                        </h3>
                        <ul
                          className={clsx(
                            'aa-List border-1 border-red',
                            isProducts &&
                              'grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-3'
                          )}
                          {...autocomplete.getListProps()}
                        >
                          {items.length > 0 ? (
                            items.map((item: any) => (
                              // @ts-ignore
                              <li
                                key={item.objectID}
                                className="aa-Item w-full"
                                {...autocomplete.getItemProps({
                                  item,
                                  source,
                                })}
                              >
                                {source.sourceId === 'products' ? (
                                  <AutoHit hit={item} />
                                ) : (
                                  <Link href={`/collections/${item.handle}`}>
                                    {item.title}
                                  </Link>
                                )}
                              </li>
                            ))
                          ) : (
                            <li className="my-2">
                              No {source.sourceId} available
                            </li>
                          )}
                          {source.sourceId === 'products' && (
                            <li className="grid place-items-center">
                              <Button
                                onClick={handleViewInSearch}
                                className="!bg-primary !px-3.5 !py-2.5"
                              >
                                Search in all products
                              </Button>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Autocomplete;
