import { useParams } from 'react-router-dom';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

const AlbumPage = () => {
  const { id } = useParams();
  return (
    <>
      <h1>
        Альбом
      </h1>
      <p>Here it is...</p>
      <Accordion sx={{
        backgroundColor: 'transparent'
      }}>
        <AccordionSummary>Трек #1</AccordionSummary>
        <AccordionDetails>Инфа</AccordionDetails>
      </Accordion>
    </>
  );
};

export default AlbumPage;
