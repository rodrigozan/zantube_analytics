import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CardBootstrap({ channelUrl, title, customUrl, description }) {
  return (
    <Card>
      {channelUrl && (<Card.Img variant="top" src={channelUrl} />)}
      <Card.Header className='mb-3'>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle><Link href={`https://youtube.com/${customUrl}`}>{customUrl}</Link></Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Card.Text className='text-truncate'>
          {description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CardBootstrap;