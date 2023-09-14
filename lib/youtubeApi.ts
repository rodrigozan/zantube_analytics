import axios from 'axios';

const BASE_URL = 'https://www.googleapis.com/youtube/v3';

const YOUTUBE_API_KEY = 'AIzaSyDcq57gWiblabGyxk0VuVmfpibOuYRNJFM'

export const getChannelInfo = async (channelId: string) => {
  try {
    const channelResponse = await axios.get(`${BASE_URL}/channels`, {
      params: {
        part: 'snippet',
        id: channelId,
        key: YOUTUBE_API_KEY,
      },
    });

    console.log('channelResponse', channelResponse.data)

    const channelData = channelResponse.data.items[0].snippet;
    const channelUrl = channelResponse.data.items[0].snippet.thumbnails.high.url;

    const channelStatisticsResponse = await axios.get(`${BASE_URL}/channels`, {
      params: {
        part: 'statistics',
        id: channelId,
        key: YOUTUBE_API_KEY,
      },
    });

    const channelStatistics = channelStatisticsResponse.data.items[0].statistics;

    console.log('channelStatistics', channelStatistics)

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const videosResponse = await axios.get(`${BASE_URL}/search`, {
      params: {
        part: 'snippet',
        channelId: channelId,
        maxResults: 10,
        key: YOUTUBE_API_KEY,
        type: 'video',
        publishedAfter: thirtyDaysAgo.toISOString(),
      },
    });

    console.log('videosResponse', videosResponse.data)

    const videos = videosResponse.data.items;

    let totalWatchTime = 0;
    for (const video of videos) {
      const videoDurationResponse = await axios.get(`${BASE_URL}/videos`, {
        params: {
          part: 'contentDetails',
          id: video.id.videoId,
          key: YOUTUBE_API_KEY,
        },
      });

      const videoDuration = videoDurationResponse.data.items[0].contentDetails.duration;
      console.log('videoDuration', videoDuration);
      
      const durationInSeconds = parseISO8601Duration(videoDuration);
      totalWatchTime += durationInSeconds;
    }

    const totalWatchTimeHours = totalWatchTime / 3600; 

    return {
      title: channelData.title,
      description: channelData.description,
      customUrl: channelData.customUrl,
      channelUrl: channelUrl,
      subscriberCount: channelStatistics.subscriberCount,
      viewsLast30Days: channelStatistics.viewCount,
      watchTimeLast30Days: totalWatchTimeHours,
      topVideosLast30Days: videos,
    };
  } catch (error) {
    throw new Error('Erro ao obter informações do canal.');
  }
};

function parseISO8601Duration(duration) {
  const matches = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  const hours = parseInt(matches[1]) || 0;
  const minutes = parseInt(matches[2]) || 0;
  const seconds = parseInt(matches[3]) || 0;

  return hours * 3600 + minutes * 60 + seconds;
}

export const fetchChannelData = async (channelId: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/channels`, {
            params: {
                part: 'statistics',
                id: channelId,
                key: YOUTUBE_API_KEY,
            },
        });

        console.log('Dados do canal', response.data)

        return response.data.items[0].statistics;
    } catch (error) {
        throw new Error('Erro ao consultar a API do YouTube.', error.message);
    }
};

export const fetchVideoStatistics = async (videoId) => {
    try {
        const response = await axios.get(`${BASE_URL}/videos`, {
            params: {
                part: 'statistics',
                id: videoId,
                key: YOUTUBE_API_KEY,
            },
        });

        return response.data.items[0].statistics;
    } catch (error) {
        throw new Error('Erro ao buscar estatísticas do vídeo.');
    }
};

export const fetchChannelVideos = async (channelId: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/search`, {
            params: {
                part: 'snippet',
                channelId: channelId,
                maxResults: 10,
                key: YOUTUBE_API_KEY,
                type: 'video',
            },
        });

        console.log('Videos do canal', response.data);

        const videos = response.data.items;
        const videosWithStatistics = [];

        for (const video of videos) {
            const videoStatistics = await fetchVideoStatistics(video.id.videoId);
            videosWithStatistics.push({
                ...video,
                statistics: videoStatistics,
            });
        }

        videosWithStatistics.sort((a, b) => {
            const dateA = new Date(a.snippet.publishedAt).getTime();
            const dateB = new Date(b.snippet.publishedAt).getTime();
            return dateB - dateA;
        });

        return videosWithStatistics;
    } catch (error) {
        throw new Error('Erro ao buscar vídeos do canal.');
    }
};


export const fetchChannelShorts = async (channelId: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/search`, {
            params: {
                part: 'snippet',
                channelId: channelId,
                maxResults: 10,
                key: YOUTUBE_API_KEY,
                type: 'video',
                q: 'short'
            },
        });

        const shorts = response.data.items;

        shorts.sort((a, b) => {
            const dateA = new Date(a.snippet.publishedAt).getTime();
            const dateB = new Date(b.snippet.publishedAt).getTime();
            return dateB - dateA;
        });

        console.log('Shorts do canal', shorts)

        return shorts
    } catch (error) {
        throw new Error('Erro ao buscar shorts do canal.');
    }
};

export const fetchChannelLiveStreams = async (channelId: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/search`, {
            params: {
                part: 'snippet',
                channelId: channelId,
                maxResults: 10,
                key: YOUTUBE_API_KEY,
                type: 'video',
                eventType: 'live',
            },
        });

        const lives = response.data.items;

        lives.sort((a, b) => {
            const dateA = new Date(a.snippet.publishedAt).getTime();
            const dateB = new Date(b.snippet.publishedAt).getTime();
            return dateB - dateA;
        });

        console.log('Lives do canal', lives)

        return lives;
    } catch (error) {
        throw new Error('Erro ao buscar live streams do canal.');
    }
};

export const fetchChannelPlaylists = async (channelId: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/playlists`, {
            params: {
                part: 'snippet',
                channelId: channelId,
                maxResults: 10,
                key: YOUTUBE_API_KEY,
            },
        });

        console.log('Playlists do canal', response.data)

        return response.data.items;
    } catch (error) {
        throw new Error('Erro ao buscar playlists do canal.');
    }
};


