"use client";
import { filterNews } from "@/store/features/news/searchSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Multiselect from "multiselect-react-dropdown";
import { FormEvent, useState } from "react";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

// =====================================================
// FILTERS  COMPONENT ==================================
// =====================================================
const Filter = () => {
  const [showModal, setShowModal] = useState(false);
  // news sources (domain)
  const sourcesList = [
    {
      title: "BBC News UK",
      link: "bbc.co.uk",
    },
    {
      title: "TechCrunch",
      link: "techcrunch.com",
    },
  ];

  const categoriesList = [
    {
      title: "business",
      link: "business",
    },
    {
      title: "entertainment",
      link: "entertainment",
    },
    {
      title: "health",
      link: "health",
    },
    {
      title: "science",
      link: "science",
    },
    {
      title: "sports",
      link: "sports",
    },
    {
      title: "technology",
      link: "technology",
    },
  ];

  const languagesList = [
    {
      title: "arabic",
      link: "ar",
    },
    {
      title: "german",
      link: "de",
    },
    {
      title: "english",
      link: "en",
    },
    {
      title: "spanish",
      link: "es",
    },
    {
      title: "french",
      link: "fr",
    },
    {
      title: "russian",
      link: "ru",
    },
    {
      title: "chinese",
      link: "zh",
    },
  ];

  const countriesList = [
    {
      title: "egypt",
      link: "eg",
    },
    {
      title: "germany",
      link: "de",
    },
    {
      title: "united kingdom",
      link: "gb",
    },
    {
      title: "united states",
      link: "us",
    },
    {
      title: "france",
      link: "fr",
    },
    {
      title: "russia",
      link: "ru",
    },
    {
      title: "china",
      link: "cn",
    },
  ];

  const sortByList = [
    {
      title: "relevancy",
      link: "relevancy",
    },
    {
      title: "popularity",
      link: "popularity",
    },
    {
      title: "latest",
      link: "publishedAt",
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
type Filter = { title: string; link: string };

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
  const [sources, setSources] = useState<Filter[]>([]);
  const [categories, setCategories] = useState<Filter[]>([]);
  const [languages, setLanguages] = useState<Filter[]>([]);
  const [countries, setCountries] = useState<Filter[]>([]);
  const [sortBy, setSortBy] = useState<Filter[]>([]);

  // handle submit
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const preference = {
      sources: sources.map(source => source.link),
      categories: categories.map(category => category.link),
      languages: languages.map(language => language.link),
      countries: countries.map(country => country.link),
      sortBy: sortBy.map(sort => sort.link),
    };

    let filter = "";
    if (sources.length > 0) {
      filter = `sources=${sources.map(source => source.link).join(",")}&`;
    }
    if (categories.length > 0) {
      filter += `category=${categories
        .map(category => category.link)
        .join(",")}&`;
    }
    if (languages.length > 0) {
      filter += `language=${languages
        .map(language => language.link)
        .join(",")}&`;
    }
    if (countries.length > 0) {
      filter += `country=${countries.map(country => country.link).join(",")}&`;
    }
    if (sortBy.length > 0) {
      filter += `sortBy=${sortBy.map(sort => sort.link).join(",")}&`;
    }

    filter = filter.slice(0, -1);

    dispatch(filterNews({ query, filter }));

    setShowModal(false);
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
              onSelect={e => {
                setSources(e);
              }}
              options={sourcesList}
            />
          </div>
        </div>
        {/* categories */}
        <div className="">
          <h1>Categories</h1>
          <div className="flex gap-6">
            <Multiselect
              displayValue="title"
              onSelect={e => {
                setCategories(e);
              }}
              options={categoriesList}
            />
          </div>
        </div>
        {/* languages */}
        <div className="">
          <h1>Languages</h1>
          <div className="flex gap-6">
            <Multiselect
              displayValue="title"
              onSelect={e => {
                setLanguages(e);
              }}
              options={languagesList}
            />
          </div>
        </div>
        {/* countries */}
        <div className="">
          <h1>Countries</h1>
          <div className="flex gap-6">
            <Multiselect
              displayValue="title"
              onSelect={e => {
                setCountries(e);
              }}
              options={countriesList}
            />
          </div>
        </div>
        {/* sortBy */}
        <div className="">
          <h1>SortBy</h1>
          <div className="flex gap-6">
            <Multiselect
              displayValue="title"
              onSelect={e => {
                setSortBy(e);
              }}
              options={sortByList}
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
            Apply
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
