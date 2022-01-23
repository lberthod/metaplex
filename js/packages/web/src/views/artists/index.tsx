import { Col, Layout } from 'antd';
import React from 'react';
import Masonry from 'react-masonry-css';
import { Link } from 'react-router-dom';
import { ArtistCard } from '../../components/ArtistCard';
import { useMeta } from '../../contexts';

const { Content } = Layout;
let nameCo = "-";
let titleCo = "-";

export const ArtistsView = () => {
  const { whitelistedCreatorsByCreator } = useMeta();

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const items = Object.values(whitelistedCreatorsByCreator);
  const artistGrid = (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid artists-masonry"
      columnClassName="my-masonry-grid_column"
    >
      {items.map((m, idx) => {
        const id = m.info.address;
        const backg = "/banner"+id+".jpeg"
        const user = "/banner"+id+".jpeg"

if(id == "88yYDZ7KPiVfpSHaTQ2jDpRKezmC1VVnzk7CV9v8boY5"){
  titleCo = "Sur le départ du soleil";
  nameCo = "Sur le départ du soleil";
} 
if(id == "8pSUGaKMWtdrvUV5R96Cxz8Q54EJizEPyKxtYjkDW7YW"){
  titleCo = "Un coucher ";
  nameCo = "L'hymne de nos montagnes";
} 
        return (
          <Link to={`/artists/${id}`} key={idx}>
            <ArtistCard
              key={id}
              artist={{
                address: m.info.address,
                name: nameCo || '',
                image: user || '',
                link: m.info.twitter || '',
                background: backg || '',
              }}
            />
          </Link>
        );
      })}
    </Masonry>
  );

  return (
    <Layout style={{ margin: 0, marginTop: 30 }}>
      <Content style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Col style={{ width: '100%', marginTop: 10 }}>{artistGrid}</Col>
      </Content>
    </Layout>
  );
};
