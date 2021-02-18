import React from "react";

const JobCard: React.FC<JobContextType> = ({ job }) => {

  const { id, position, description, createdAt, createdBy, company } = job;

  const fixedDescription = description.length > 100 ? `${description.substr(0, 80)}...` : description;

  return (
    <>
      {/* START COLUMN*/}
      <div className="my-1 px-1 py-2 md:py-0 md:w-1/2 lg:my-4 lg:px-10 lg:w-1/3">
        <article className="overflow-hidden rounded-lg shadow-lg bg-white">
          <a href="#">
            <img
              alt="Placeholder"
              className="block h-auto w-full"
              src="https://picsum.photos/600/400/?random"
            />
          </a>

          <header className="flex items-center justify-between leading-tight p-2 md:p-4">
            <h1 className="text-lg">
              <a className="no-underline hover:underline text-black font-bold" href="#">
                {position}
              </a>
            </h1>
            <p className="text-white text-sm font-bold px-2 rounded-md bg-purple-700">{createdAt}</p>
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
              <p className="ml-2 text-sm font-bold">{createdBy} | {company}</p>
            </a>
            <a
              className="no-underline text-grey-darker hover:text-red-dark"
              href="#"
            >
              <span className="hidden">Like</span>
              <i className="fa fa-heart"></i>
            </a>
          </footer>
        </article>
      </div>
      {/* END COLUMN*/}
    </>
  );
};

export default JobCard;
