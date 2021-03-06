import React from "react";
import Link from "next/link";
import moment from "moment";

const JobCard: React.FC<JobContextType> = ({ job }) => {
  const {
    id,
    position,
    description,
    createdAt,
    createdBy,
    company,
    categories,
  } = job;

  console.log(createdBy);

  const fixedDescription =
    description.length > 100 ? `${description.substr(0, 80)}...` : description;

  return (
    <>
      {/* START COLUMN*/}
      <div className="my-1 px-1 py-2 md:py-0 md:w-1/2 lg:my-4 lg:px-10 lg:w-1/3">
        <article className="overflow-hidden rounded-lg shadow-lg bg-white">
          <p className="text-white text-xs font-bold px-2 rounded-lg bg-red-500">
            {categories}
          </p>
          <Link href="/jobs/[id]" as={`/jobs/${id}`}>
            <img
              alt="Placeholder"
              className="block h-auto w-full"
              src="https://picsum.photos/600/400/?random"
            />
          </Link>

          <header className="flex items-center justify-between leading-tight p-2 md:p-4">
            <h1 className="text-lg">
              <Link href="/jobs/[id]" as={`/jobs/${id}`}>
                <a className="no-underline hover:underline text-black font-bold">
                  {position}
                </a>
              </Link>
            </h1>
            <p className="text-white text-xs font-bold px-2 rounded-md bg-purple-700">
              {moment(createdAt).fromNow()}
            </p>
          </header>

          <main className="p-4">
            <p className="text-black">{fixedDescription}</p>
          </main>

          <footer className="flex items-center justify-between leading-none p-2 md:p-4">
            <a
              className="flex items-center no-underline hover:underline text-black"
              href="#"
            >
              <img
                alt="Placeholder"
                className="block rounded-full"
                src="https://picsum.photos/32/32/?random"
              />
              <p className="ml-2 text-sm font-bold">
                {createdBy} | {company}
              </p>
            </a>
          </footer>
        </article>
      </div>
      {/* END COLUMN*/}
    </>
  );
};

export default JobCard;
