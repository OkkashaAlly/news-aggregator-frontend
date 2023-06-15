"use client";
import { filterNews } from "@/store/features/news/searchSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useState } from "react";
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
        />
      )}
    </div>
  );
};

// EXTENDED COMPONENT =================================
const Modal = ({
  setShowModal,
  sourcesList,
  categoriesList,
  languagesList,
  countriesList,
}: {
  setShowModal: (arg0: boolean) => void;
  sourcesList: any[];
  categoriesList: any[];
  languagesList: any[];
  countriesList: any[];
}) => {
  // redux
  const dispatch = useAppDispatch();
  const { query } = useAppSelector(state => state.news);

  // state
  const [sources, setSources] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);

  // RETURN ==========================================
  return (
    <div className="absolute shadow-lg top-8 left-4">
      <div className="bg-white space-y-4 p-6 rounded">
        {/* sources */}
        <div className="">
          <h1>Sources</h1>
          <div className="flex gap-6">
            {sourcesList.map(source => (
              <div key={source.link} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  value={source.link}
                  onChange={e => {
                    if (e.target.checked) {
                      setSources([...sources, source.link]);
                    } else {
                      setSources(sources.filter(item => item !== source.link));
                    }
                  }}
                />
                <span>{source.title}</span>
              </div>
            ))}
          </div>
        </div>
        {/* categories */}
        <div className="">
          <h1>Categories</h1>
          <div className="flex gap-6">
            {categoriesList.map(category => (
              <div key={category.link} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  value={category.link}
                  onChange={e => {
                    if (e.target.checked) {
                      setCategories([...categories, category.link]);
                    } else {
                      setCategories(
                        categories.filter(item => item !== category.link)
                      );
                    }
                  }}
                />
                <span className="capitalize">{category.title}</span>
              </div>
            ))}
          </div>
        </div>
        {/* languages */}
        <div className="">
          <h1>Languages</h1>
          <div className="flex gap-6">
            {languagesList.map(language => (
              <div key={language.link} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  value={language.link}
                  onChange={e => {
                    if (e.target.checked) {
                      setLanguages([...languages, language.link]);
                    } else {
                      setLanguages(
                        languages.filter(item => item !== language.link)
                      );
                    }
                  }}
                />
                <span className="capitalize">{language.title}</span>
              </div>
            ))}
          </div>
        </div>
        {/* countries */}
        <div className="">
          <h1>Countries</h1>
          <div className="flex gap-6">
            {countriesList.map(country => (
              <div key={country.link} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  value={country.link}
                  onChange={e => {
                    if (e.target.checked) {
                      setCountries([...countries, country.link]);
                    } else {
                      setCountries(
                        countries.filter(item => item !== country.link)
                      );
                    }
                  }}
                />
                <span className="capitalize">{country.title}</span>
              </div>
            ))}
          </div>
        </div>
        {/* buttons */}
        <div className="flex gap-4 pt-4">
          <button
            className="border border-gray-300 text-gray-600 px-4 py-2 rounded-md"
            onClick={() => {
              // clear all filters
              // setSources([]);
              // setCategories([]);
              // setLanguages([]);
              // setCountries([]);

              // close modal
              setShowModal(false);
            }}
          >
            Close
          </button>
          <button
            className="border border-blue-500 text-blue-500 px-4 py-2 rounded-md"
            onClick={() => {
              // TODO: save to db
              console.log(sources, categories, languages, countries);

              const filters = () => {
                let filter = ``;

                if (sources.length > 0) {
                  filter += `&domains=${sources.join(",")}`;
                }

                if (categories.length > 0) {
                  filter += `&category=${categories.join(",")}`;
                }

                if (languages.length > 0) {
                  filter += `&language=${languages.join(",")}`;
                }

                if (countries.length > 0) {
                  filter += `&country=${countries.join(",")}`;
                }

                return filter;
              };

              // filter news
              dispatch(
                filterNews({
                  query,
                  filter: filters(),
                })
              );

              // close modal
              setShowModal(false);
            }}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
