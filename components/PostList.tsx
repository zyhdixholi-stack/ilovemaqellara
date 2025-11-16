import React from 'react';
import { Post } from '../types';
import PostCard from './PostCard';
import { useLanguage } from '../contexts/LanguageContext';

interface PostListProps {
  posts: Post[];
  noPostsMessageKey: string;
}

const PostList: React.FC<PostListProps> = ({ posts, noPostsMessageKey }) => {
  const { t } = useLanguage();

  if (posts.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-100 rounded-lg">
        <p className="text-gray-500">{t(noPostsMessageKey)}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;