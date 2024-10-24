import React, { useState } from 'react';
import { uploadNewBookContent } from '@/API/editBookAPI';  // Placeholder for file upload function
import { toast } from 'react-hot-toast';

function ChangeBookContent({ bookId }) {
  const [newCoverArt, setNewCoverArt] = useState(null);
  const [newContent, setNewContent] = useState(null);

  const handleCoverArtChange = (e) => setNewCoverArt(e.target.files[0]);
  const handleContentChange = (e) => setNewContent(e.target.files[0]);

  const handleUpload = async () => {
    if (newCoverArt || newContent) {
      try {
        const formData = new FormData();
        if (newCoverArt) formData.append('cover_art', newCoverArt);
        if (newContent) formData.append('content', newContent);

        await uploadNewBookContent(bookId, formData);  // API call to handle upload
        toast.success('Book content updated successfully');
      } catch (error) {
        toast.error('Failed to upload content');
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleCoverArtChange} />
      <input type="file" onChange={handleContentChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default ChangeBookContent;
