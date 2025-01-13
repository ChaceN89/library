import React from 'react'
import { useBookContext } from "@/context/BookContext";
import PlaceHolderText from '@/components/general/PlaceHolderText';


function BookInfo() {
  const { book, loading} = useBookContext();
  
  return (
    <div className='space-y-2 flex flex-col w-full'>
      <PlaceHolderText loading={loading} ><h1>{book?.title}</h1></PlaceHolderText>  
      <PlaceHolderText loading={loading} ><p>{book?.description}</p></PlaceHolderText>  
      <PlaceHolderText loading={loading} ><h3>{book?.author}</h3></PlaceHolderText>  
      <PlaceHolderText loading={loading} ><p>Genre: {book?.genre}</p></PlaceHolderText>  
      <PlaceHolderText loading={loading} ><p>Language: {book?.language}</p></PlaceHolderText>  
      <PlaceHolderText loading={loading} ><p>Published: {book?.published_date ? new Date(book?.published_date).toLocaleDateString() : "Unknown"}</p></PlaceHolderText>  
      <PlaceHolderText loading={loading} ><p>Downloads: {book?.downloads}</p></PlaceHolderText>  
      <PlaceHolderText loading={loading} ><p>Total Views: {book?.views}</p></PlaceHolderText>  
    </div>
  )
}

export default BookInfo