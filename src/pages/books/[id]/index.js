"use client";

import React from "react";
import { useRouter } from "next/router";
import Banner from "@/components/Banner";
import Image from "next/image";
import { BsDownload, BsStar } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import client, { urlFor } from "../../../../sanity";

function index({ book }) {
  const router = useRouter();
  const src = urlFor(book[0].mainImage).url();
  return (
    <>
      <Banner page={book[0].title} sub="Self-Help" />
      <section className="side py-8 text-lightBlue ">
        <button
          onClick={() => router.back()}
          className="bg-lightBlue text-[24px] rounded-full text-white my-4 p-2"
        >
          <BiArrowBack />
        </button>
        <div className="flex flex-col md:flex-row gap-4">
          <Image
            height={200}
            width={350}
            loader={() => src}
            src={src}
            unoptimized={true}
            className="w-full md:w-1/2"
            alt=""
          />
          <div>
            <h2 className="text-[36px] font-bold">{book[0].title}</h2>
            <hr />
            <p className="text-base my-4">
              {book[0].description[0].children[0].text}
            </p>
            <hr />
            <h3 className="my-3">
              <b>Author:</b>
              {/* {book?.author} */}
            </h3>
            <h3 className="my-3">
              <b>File Size:</b> {book[0].size}
            </h3>
            <h3 className="my-3">
              <b>File format:</b> PDF
            </h3>

            <h3 className="my-3">
              <b>Category:</b>
              {/* {book?.category} */}
            </h3>
            <hr className="my-4" />
            <a
              href={book[0].link}
              download
              className="bg-green-400 flex items-center gap-2 rounded text-base text-black font-bold max-w-[200px] my-4 px-4 py-2"
            >
              Download <BsDownload />
            </a>
            <button className="bg-yellow-300 flex items-center gap-2 rounded text-base text-black font-bold my-4 px-4 py-2">
              Star <BsStar />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default index;

export const getServerSideProps = async (context) => {
  console.log(context);
  const book = await client.fetch(`*[_id == $id]`, {
    id: context.params.id,
  });

  return {
    props: {
      book,
    },
  };
};
