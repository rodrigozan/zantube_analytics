// VideoStatistics.tsx

import React from 'react';

interface VideoStatisticsProps {
  viewCount: number;
  likeCount: number;
  dislikeCount: number;
  commentCount: number;
}

const VideoStatistics: React.FC<VideoStatisticsProps> = ({
  viewCount,
  likeCount,
  dislikeCount,
  commentCount,
}) => {
  return (
    <div>
      <p>Visualizações: {viewCount}</p>
      <p>Curtidas: {likeCount}</p>
      <p>Descurtidas: {dislikeCount}</p>
      <p>Comentários: {commentCount}</p>
    </div>
  );
};

export default VideoStatistics;
