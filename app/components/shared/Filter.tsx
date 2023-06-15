"use client";
import { filterNews } from "@/store/features/news/searchSlice";
import {
  addCategory,
  addCountry,
  addLanguage,
  addSortBy,
  addSource,
  removeCategory,
  removeCountry,
  removeLanguage,
  removeSortBy,
  removeSource,
  savePreferences,
} from "@/store/features/preference/preferenceSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Multiselect from "multiselect-react-dropdown";
import { FormEvent, useState } from "react";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { data } from "./dummyFilter";

// import {data} from './dummyFilters.ts'

// =====================================================
// FILTERS  COMPONENT ==================================
// =====================================================
const Filter = () => {
  const [showModal, setShowModal] = useState(false);
  // news sources (domain)
  const sourcesList = [
    {
      title: "BBC News UK",
      key: "bbc.co.uk",
    },
    {
      title: "TechCrunch",
      key: "techcrunch.com",
    },
  ];

  const categoriesList = [
    {
      title: "business",
      key: "business",
    },
    {
      title: "entertainment",
      key: "entertainment",
    },
    {
      title: "health",
      key: "health",
    },
    {
      title: "science",
      key: "science",
    },
    {
      title: "sports",
      key: "sports",
    },
    {
      title: "technology",
      key: "technology",
    },
  ];

  const languagesList = [
    {
      title: "arabic",
      key: "ar",
    },
    {
      title: "german",
      key: "de",
    },
    {
      title: "english",
      key: "en",
    },
    {
      title: "spanish",
      key: "es",
    },
    {
      title: "chinese",
      key: "zh",
    },
  ];

  const countriesList = [
    {
      title: "egypt",
      key: "eg",
    },
    {
      title: "germany",
      key: "de",
    },
    {
      title: "united kingdom",
      key: "gb",
    },
    {
      title: "united states",
      key: "us",
    },
    {
      title: "france",
      key: "fr",
    },
    {
      title: "russia",
      key: "ru",
    },
    {
      title: "china",
      key: "cn",
    },
  ];

  const sortByList = [
    {
      title: "relevancy",
      key: "relevancy",
    },
    {
      title: "popularity",
      key: "popularity",
    },
    {
      title: "latest",
      key: "publishedAt",
    },
  ];

  // handle filter
  const handleFilters = () => {
    setShowModal(!showModal);
  };

  // RETURN ==========================================
  return (
    <div className="relative">
      <button onClick={handleFilters} className="flex gap-2 items-center">
        <HiOutlineAdjustmentsHorizontal />
        <span>Filters & Preferences</span>
      </button>
      {/* modal */}
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          sourcesList={sourcesList}
          categoriesList={categoriesList}
          languagesList={languagesList}
          countriesList={countriesList}
          sortByList={sortByList}
        />
      )}
    </div>
  );
};

// EXTENDED COMPONENT =================================
type Filter = { title: string; key: string };

const Modal = ({
  setShowModal,
  sourcesList,
  categoriesList,
  languagesList,
  countriesList,
  sortByList,
}: {
  setShowModal: (arg0: boolean) => void;
  sourcesList: Filter[];
  categoriesList: Filter[];
  languagesList: Filter[];
  countriesList: Filter[];
  sortByList: Filter[];
}) => {
  // redux
  const dispatch = useAppDispatch();
  const { query } = useAppSelector(state => state.news);

  // state
  const {
    sources,
    categories,
    languages,
    countries,
    sortBy,
    loading,
    error,
    saved,
  } = useAppSelector(state => state.preference);

  // handle submit
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const preference = {
      sources: JSON.stringify(sources.map(source => source.key)),
      categories: JSON.stringify(categories.map(category => category.key)),
      languages: JSON.stringify(languages.map(language => language.key)),
      countries: JSON.stringify(countries.map(country => country.key)),
      sortBy: JSON.stringify(sortBy.map(sort => sort.key)),
    };

    let filter = "";
    if (sources.length > 0) {
      filter = `sources=${sources.map(source => source.key).join(",")}&`;
    }
    if (categories.length > 0) {
      filter += `category=${categories
        .map(category => category.key)
        .join(",")}&`;
    }
    if (languages.length > 0) {
      filter += `language=${languages
        .map(language => language.key)
        .join(",")}&`;
    }
    if (countries.length > 0) {
      filter += `country=${countries.map(country => country.key).join(",")}&`;
    }
    if (sortBy.length > 0) {
      filter += `sortBy=${sortBy.map(sort => sort.key).join(",")}&`;
    }

    filter = filter.slice(0, -1);

    dispatch(filterNews({ query, filter }));

    dispatch(savePreferences(preference));

    if (saved) setShowModal(false);
  };

  // RETURN ==========================================
  return (
    <div className="absolute shadow-lg top-8 left-4">
      <form className="bg-white space-y-4 p-6 rounded">
        {/* sources */}
        <div className="">
          <h1>Sources</h1>
          <div className="flex gap-6">
            <Multiselect
              displayValue="title"
              onSelect={e => dispatch(addSource(e))}
              onRemove={e => dispatch(removeSource(e))}
              options={data.sources}
              selectedValues={sources}
            />
          </div>
        </div>
        {/* categories */}
        <div className="">
          <h1>Categories</h1>
          <div className="flex gap-6">
            <Multiselect
              displayValue="title"
              onSelect={e => dispatch(addCategory(e))}
              onRemove={e => dispatch(removeCategory(e))}
              options={data.categories}
              selectedValues={categories}
            />
          </div>
        </div>
        {/* languages */}
        <div className="">
          <h1>Languages</h1>
          <div className="flex gap-6">
            <Multiselect
              displayValue="title"
              onSelect={e => dispatch(addLanguage(e))}
              onRemove={e => dispatch(removeLanguage(e))}
              options={data.languages}
              selectedValues={languages}
            />
          </div>
        </div>
        {/* countries */}
        <div className="">
          <h1>Countries</h1>
          <div className="flex gap-6">
            <Multiselect
              displayValue="title"
              onSelect={e => dispatch(addCountry(e))}
              onRemove={e => dispatch(removeCountry(e))}
              options={data.countries}
              selectedValues={countries}
            />
          </div>
        </div>
        {/* sortBy */}
        <div className="">
          <h1>SortBy</h1>
          <div className="flex gap-6">
            <Multiselect
              displayValue="title"
              onSelect={e => dispatch(addSortBy(e))}
              onRemove={e => dispatch(removeSortBy(e))}
              options={data.sortBy}
              selectedValues={sortBy}
            />
          </div>
        </div>

        {/* buttons */}
        <div className="flex gap-4 pt-4">
          <button
            className="border border-gray-300 text-gray-600 px-4 py-2 rounded-md"
            onClick={() => {
              setShowModal(false);
            }}
          >
            Close
          </button>
          <button
            className="border border-blue-500 text-blue-500 px-4 py-2 rounded-md"
            onClick={handleSubmit}
          >
            {loading ? "Loading..." : error ? error : "Apply"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
