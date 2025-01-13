import React from 'react'
import { incrementDownloads, incrementViews } from '@/API/booksAPI'
import { bookCardData } from '@/data/bookCardData'
import SetFavBook from '../favBooks/SetFavBook'
import LoadingWheel from '@/components/loading/LoadingWheel'
import Image from 'next/image'

function BookInfomation({book, loading}) {
  return (
    <div>
     <div className="relative w-1/6 aspect-[3/4] bg-gray-300 overflow-hidden flex items-center justify-center">
            {loading ? (
              <LoadingWheel className="h-12 w-12" />
            ) : (
              <Image
                src={book.cover_art_url || bookCardData.defaultImg}
                alt={`Cover art for ${book.title || 'Default Cover'}`}
                className="object-cover w-full h-full"
                width={200}
                height={200}
              />
            )}
            {!loading && (
              <div className="absolute top-2 right-2">
                <SetFavBook id={book.id} bookTitle={book.title} />
              </div>
            )}
          </div>

            {book &&
            <>
              <div className='flex flex-wrap items-center gap-2'>
                <p className="text-gray-600 mt-2">{book.description} |</p>
                <p className="text-gray-600 mt-2">Author: {book.author} |</p>
                <p className="text-gray-600 mt-2">Genre: {book.genre} |</p>
                <p className="text-gray-600 mt-2">Language: {book.language} |</p>
                <p className="text-gray-600 mt-2">
                Published: {book.published_date ? new Date(book.published_date).toLocaleDateString() : "Not available"} | 
                </p>
                <p className="text-gray-600 mt-2">Downloads: {book.downloads} |</p>
                <p className="text-gray-600 mt-2">Views: {book.views}</p>
              </div>

                   <p className="text-gray-500 mt-2">Created at: {new Date(book.created_at).toLocaleDateString()}</p>
       <p className="text-gray-500 mt-2">Last updated: {new Date(book.updated_at).toLocaleDateString()}</p>


       <a 
  href={book.content_url} 
  download 
  onClick={() => incrementDownloads(id)} // Increment downloads when the content is downloaded
>
  Download Content
</a>

              <div className="flex gap-4">
      <img 
        src={book.owner_profile_pic} 
        alt={`Profile picture of ${book.owner_username}`} 
        width={40} 
        height={50} 
        className="rounded-full"
      />
        <p className="text-gray-600 mt-2">Owner: {book.owner_username}</p>
      </div>


            </>
            }



{/*           
    <div>{JSON.stringify(loading)}</div>
    <div>{JSON.stringify(book)}</div> */}
    </div>
  )
}

export default BookInfomation