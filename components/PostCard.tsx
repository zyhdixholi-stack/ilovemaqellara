import React from 'react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="bg-gray-50 rounded-xl shadow-lg overflow-hidden flex flex-col group">
      {(post.imageUrl || post.videoUrl) && (
        <div className="relative aspect-video bg-gray-200">
          {post.imageUrl && (
            <>
              <img src={post.imageUrl} alt={`Postim nga ${post.author}`} className="w-full h-full object-cover" />
              <a
                href={post.imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-2 right-2 bg-black bg-opacity-60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-opacity-80"
                aria-label="Hap imazhin në një skedë të re"
                title="Hap imazhin në një skedë të re"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </>
          )}
          {post.videoUrl && (
             <iframe
              className="w-full h-full"
              src={post.videoUrl}
              title="Video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
      )}
      {(post.comment || post.author) && (
        <div className="p-4 flex flex-col flex-grow">
          {post.comment && <p className="text-gray-700 flex-grow">{post.comment}</p>}
          <p className="text-right text-sm font-semibold text-emerald-600 mt-3">- {post.author}</p>
        </div>
      )}
    </div>
  );
};

export default PostCard;