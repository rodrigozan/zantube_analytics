import { useState, useEffect } from 'react';
import Link from 'next/link';
import moment from 'moment-timezone';
import { Button, FormControl, InputGroup, Table, Nav, Tabs, Tab, Row, Col, Container } from 'react-bootstrap';
import { getChannelInfo, fetchChannelData, fetchChannelVideos, fetchChannelShorts, fetchChannelLiveStreams, fetchChannelPlaylists } from '../lib/youtubeApi';
import CardBootstrap from './Bootstrap/Card';

import VideoStatistics from './VideoStatistics';
import Image from 'next/image';

const Channel = () => {
    const [channelUrl, setChannelUrl] = useState('');
    const [channelId, setChannelId] = useState('');
    const [channelData, setChannelData] = useState<any>(null);
    const [channelInfo, setChannelInfo] = useState(null);
    const [videos, setVideos] = useState<any[]>([]);
    const [shorts, setShorts] = useState<any[]>([]);
    const [liveStreams, setLiveStreams] = useState<any[]>([]);
    const [playlists, setPlaylists] = useState<any[]>([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const handleChageChannelId = (e: any) => {
        const url = e.target.value;
        setChannelUrl(url);
        const id = url.split('channel/')[1];
        setChannelId(id);
        console.log(id);
    };

    const searchAndSaveChannelData = async () => {
        try {

            const channelInfo = await getChannelInfo(channelId)
            setChannelInfo(channelInfo)

            const channelData = await fetchChannelData(channelId);
            setChannelData(channelData);
            setIsDataLoaded(true);

            const videosData = await fetchChannelVideos(channelId);
            const shortsData = await fetchChannelShorts(channelId);
            const liveStreamsData = await fetchChannelLiveStreams(channelId);
            const playlistsData = await fetchChannelPlaylists(channelId);

            setVideos(videosData);
            setShorts(shortsData);
            setLiveStreams(liveStreamsData);
            setPlaylists(playlistsData);
        } catch (error) {
            console.error('Erro ao buscar e salvar dados do canal:', error);
        }
    };

    return (
        <div>
            <h1 className='mb-3'>YT Analytics</h1>
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Insira a URL do Canal"
                    value={channelUrl}
                    onChange={handleChageChannelId}
                    disabled={isDataLoaded}
                />
                <Button variant="primary" onClick={searchAndSaveChannelData} disabled={isDataLoaded}>
                    Pesquisar
                </Button>
            </InputGroup>
            {isDataLoaded && (
                <>
                    <Container>
                        <Row>
                            <Col md="3">
                                <CardBootstrap
                                    channelUrl={channelInfo.channelUrl}
                                    title={channelInfo.title}
                                    customUrl={channelInfo.customUrl}
                                    description={channelInfo.description}
                                />
                            </Col>
                            <Col md="9">
                                <h3>Estatísticas do Canal</h3>
                                <hr />
                                <ul className="list-group">
                                    <li className="list-group-item"><span className='fw-bold'>Inscritos: </span>{channelInfo.subscriberCount}</li>
                                    <li className="list-group-item"><span className='fw-bold'>Visualizações nos últimos 30 dias: </span>{channelInfo.viewsLast30Days / 1000} visualizações</li>
                                    <li className="list-group-item"><span className='fw-bold'>Horas assistidas nos últimos 30 dias: </span>{channelInfo.watchTimeLast30Days}</li>
                                </ul>
                            </Col>
                        </Row>
                    </Container>
                    <Tabs
                        defaultActiveKey="videos"
                        transition={false}
                        id="channel-tabs"
                        className="mb-3"
                    >
                        <Tab eventKey="videos" title="Vídeos">
                            {videos.map((video) => (
                                <>
                                    <Row>
                                        <Col md='1'><Image src={video.snippet.thumbnails.default.url} width={video.snippet.thumbnails.default.width} height={video.snippet.thumbnails.default.height} alt={`Thumbnail of ${video.snippet.title}`} /></Col>
                                        <Col md='11'>
                                            <Table striped bordered hover>
                                                <thead>
                                                    <tr>
                                                        <th colSpan={2} style={{ backgroundColor: '#999999' }}>{video.snippet.title}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    <tr key={video.id.videoId}>
                                                        <td><Link href={`https://youtu.be/${video.id.videoId}`}>Video ID</Link></td>
                                                        <td>{video.id.videoId}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Descrição</td>
                                                        <td>{video.snippet.description}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Publicado em</td>
                                                        <td>{moment(video.snippet.publishTime).tz('America/Sao_Paulo').format('DD/MM/YYYY')} as {moment(video.snippet.publishTime).tz('America/Sao_Paulo').format('HH:mm:ss')}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Estatísticas</td>
                                                        <td>
                                                            <VideoStatistics
                                                                viewCount={video.statistics.viewCount}
                                                                likeCount={video.statistics.likeCount}
                                                                dislikeCount={video.statistics.dislikeCount}
                                                                commentCount={video.statistics.commentCount}
                                                            />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                </>
                            ))}
                        </Tab>
                        <Tab eventKey="shorts" title="Shorts">
                        {shorts.map((video) => (
                                <>
                                    <Row>
                                        <Col md='1'><Image src={video.snippet.thumbnails.default.url} width={video.snippet.thumbnails.default.width} height={video.snippet.thumbnails.default.height} alt={`Thumbnail of ${video.snippet.title}`} /></Col>
                                        <Col md='11'>
                                            <Table striped bordered hover>
                                                <thead>
                                                    <tr>
                                                        <th colSpan={2} style={{ backgroundColor: '#999999' }}>{video.snippet.title}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    <tr key={video.id.videoId}>
                                                        <td>Video ID</td>
                                                        <td>{video.id.videoId}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Descrição</td>
                                                        <td>{video.snippet.description}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Publicado em</td>
                                                        <td>{moment(video.snippet.publishTime).tz('America/Sao_Paulo').format('DD/MM/YYYY')} as {moment(video.snippet.publishTime).tz('America/Sao_Paulo').format('HH:mm:ss')}</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                </>
                            ))}
                        </Tab>
                        <Tab eventKey="liveStreams" title="Lives" disabled>
                            Tab content for Contact
                        </Tab>
                        <Tab eventKey="playlists" title="Playlists" disabled>
                            Tab content for Contact
                        </Tab>
                    </Tabs>
                </>
            )}
        </div>
    );
};

export default Channel;
