const Channel = () => {
    return (
        <Tab.Container id="channel-tabs" defaultActiveKey="channel">
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="channel">Canal</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="videos">Vídeos</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="shorts">Shorts</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="liveStreams">Live Streams</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="playlists">Playlists</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="channel">
                                    <h2>Dados do Canal</h2>
                                    <Table striped bordered hover>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>Nome da Estatística</th>
                                                    <th>Valor</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Object.entries(channelData).map(([key, value]) => (
                                                    <tr key={key}>
                                                        <td>{key}</td>
                                                        <td>{JSON.stringify(value)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </Table>
                                </Tab.Pane>
                                <Tab.Pane eventKey="videos">
                                    <h2>Vídeos do Canal</h2>
                                    <Table striped bordered hover>

                                        {videos.map((video) => (
                                            <>
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
                                            </>
                                        ))}

                                    </Table>
                                </Tab.Pane>
                                <Tab.Pane eventKey="shorts">
                                    <h2>Shorts do Canal</h2>
                                    <Table striped bordered hover>
                                        {shorts.map((short) => (
                                            <>
                                                <thead>
                                                    <tr>
                                                        <th colSpan={2} style={{ backgroundColor: '#999999' }}>{short.snippet.title}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr key={short.id.videoId}>
                                                        <td>Video ID</td>
                                                        <td>{short.id.videoId}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Descrição</td>
                                                        <td>{short.snippet.description}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Publicado em</td>
                                                        <td>{moment(short.snippet.publishTime).tz('America/Sao_Paulo').format('DD/MM/YYYY')} as {moment(short.snippet.publishTime).tz('America/Sao_Paulo').format('HH:mm:ss')}</td>
                                                    </tr>
                                                </tbody>
                                            </>
                                        ))}
                                    </Table>
                                </Tab.Pane>
                                <Tab.Pane eventKey="liveStreams">
                                    <h2>Live Streams do Canal</h2>
                                    <Table striped bordered hover>
                                        {liveStreams.map((live) => (
                                            <>
                                                <thead>
                                                    <tr>
                                                        <th colSpan={2} style={{ backgroundColor: '#999999' }}>{live.snippet.title.replace("'", "&#39;")}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr key={live.id.videoId}>
                                                        <td>Video ID</td>
                                                        <td>{live.id.videoId}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Descrição</td>
                                                        <td>{live.snippet.description}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Publicado em</td>
                                                        <td>{moment(live.snippet.publishTime).tz('America/Sao_Paulo').format('DD/MM/YYYY')} as {moment(live.snippet.publishTime).tz('America/Sao_Paulo').format('HH:mm:ss')}</td>
                                                    </tr>
                                                </tbody>
                                            </>
                                        ))}
                                    </Table>
                                </Tab.Pane>
                                <Tab.Pane eventKey="playlists">
                                    <h2>Playlists do Canal</h2>
                                    <Table striped bordered hover>
                                        {playlists.map((pl) => (
                                            <>
                                                <thead>
                                                    <tr>
                                                        <th colSpan={2} style={{ backgroundColor: '#999999' }}>{pl.snippet.title.replace("'", "&#39;")}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr key={pl.id.videoId}>
                                                        <td>Video ID</td>
                                                        <td>{pl.id}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Descrição</td>
                                                        <td>{pl.snippet.description}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Publicado em</td>
                                                        <td>{moment(pl.snippet.publishedAt).tz('America/Sao_Paulo').format('DD/MM/YYYY')} as {moment(pl.snippet.publishedAt).tz('America/Sao_Paulo').format('HH:mm:ss')}</td>
                                                    </tr>
                                                </tbody>
                                            </>
                                        ))}
                                    </Table>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
    )
}