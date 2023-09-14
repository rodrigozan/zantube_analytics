// ShortsStatistics.tsx

import React, { useEffect, useState } from 'react';
import {fetchShortStatistics} from '../lib/youtubeApi'; // Importe a função para buscar estatísticas dos shorts

const ShortsStatistics = ({ channelId }) => {
  const [shorts, setShorts] = useState([]);

  useEffect(() => {
    const fetchShorts = async () => {
      try {
        const shortsData = await fetchShortStatistics(channelId); // Substitua pelo nome correto da função de busca de estatísticas
        setShorts(shortsData);
      } catch (error) {
        console.error('Erro ao buscar shorts do canal.', error);
      }
    };

    fetchShorts();
  }, [channelId]);

  return (
    <div>
      <h2>Shorts do Canal</h2>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Publicado em</th>
            <th>Visualizações</th>
            {/* Adicione mais colunas de estatísticas aqui, se necessário */}
          </tr>
        </thead>
        <tbody>
          {shorts.map((short) => (
            <tr key={short.id.videoId}>
              <td>{short.snippet.title}</td>
              <td>{short.snippet.publishedAt}</td>
              <td>{short.statistics.viewCount}</td>
              {/* Adicione mais colunas de estatísticas aqui, se necessário */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShortsStatistics;
