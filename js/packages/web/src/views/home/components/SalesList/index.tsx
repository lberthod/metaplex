import { useWallet } from '@solana/wallet-adapter-react';
import { Col, Layout, Row, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import React, { useMemo, useState } from 'react';

import { useMeta } from '../../../../contexts';
import { CardLoader } from '../../../../components/MyLoader';
import { Banner } from '../../../../components/Banner';
import { HowToBuyModal } from '../../../../components/HowToBuyModal';

import { useAuctionsList } from './hooks/useAuctionsList';
import { AuctionRenderCard } from '../../../../components/AuctionRenderCard';

const { TabPane } = Tabs;
const { Content } = Layout;

export enum LiveAuctionViewState {
  All = '0',
  Participated = '1',
  Ended = '2',
  Resale = '3',
  Own = '4',
}

export const SalesListView = (props: { collectionMintFilter?: string }) => {
  const [activeKey, setActiveKey] = useState(LiveAuctionViewState.All);
  const { isLoading } = useMeta();
  const { connected } = useWallet();
  const { auctions, hasResaleAuctions } = useAuctionsList(activeKey);

  const filteredAuctions = useMemo(() => {
    if (props.collectionMintFilter) {
      return auctions.filter(
        auction =>
          auction.thumbnail.metadata.info.collection?.key ===
          props.collectionMintFilter,
      );
    }
    return auctions;
  }, [auctions, props.collectionMintFilter]);

  return (
    <>
      {!props.collectionMintFilter && (
        <Banner
          src="/main-banner.svg"
          headingText="The Leading Marketplace for Luxury Watches NFTs"
          subHeadingText="Behind every collection of images is a real luxury watch."
          actionComponent={<HowToBuyModal buttonClassName="secondary-btn" />}
          useBannerBg
        />
      )}

<p><h2>All big brands are represented</h2>
Audemars Piguet
Breitling
BrÈguet
Cartier
Omega
Patek Philippe
Piaget
Rolex
Tudor</p>


NFT-Luxury Buyer Protection: The Safest Way to Buy, Sell, Finance Your Dream Watch<br>
</br><br>
</br>
Purchase or Sale via Crypto<br>
</br>
Authenicity Guaranteed<br>
</br>
Global Money Back Guaranteed<br>
</br><br>
</br>
We want to make thousands of customers happy to buy, sell, trade, finance of give a value to their luxury watch.
<br>
</br><br>
</br>
See our collection of watches


      <Layout>
        <Content style={{ display: 'flex', flexWrap: 'wrap' }}>
          <Col style={{ width: '100%', marginTop: 32 }}>
            <Row>
              <Tabs
                activeKey={activeKey}
                onTabClick={key => setActiveKey(key as LiveAuctionViewState)}
              >
                <TabPane
                  tab={
                    <>
                      <span className="live"></span> Live
                    </>
                  }
                  key={LiveAuctionViewState.All}
                ></TabPane>
                {hasResaleAuctions && (
                  <TabPane
                    tab="Secondary Marketplace"
                    key={LiveAuctionViewState.Resale}
                  ></TabPane>
                )}
                <TabPane tab="Ended" key={LiveAuctionViewState.Ended}></TabPane>
                {connected && (
                  <TabPane
                    tab="Participated"
                    key={LiveAuctionViewState.Participated}
                  ></TabPane>
                )}
                {connected && (
                  <TabPane
                    tab="My Live Auctions"
                    key={LiveAuctionViewState.Own}
                  ></TabPane>
                )}
              </Tabs>
            </Row>
            <Row>
              <div className="artwork-grid">
                {isLoading &&
                  [...Array(10)].map((_, idx) => <CardLoader key={idx} />)}
                {!isLoading &&
                  filteredAuctions.map(auction => (
                    <Link
                      key={auction.auction.pubkey}
                      to={`/auction/${auction.auction.pubkey}`}
                    >
                      <AuctionRenderCard auctionView={auction} />
                    </Link>
                  ))}
              </div>
            </Row>
          </Col>
        </Content>
      </Layout>
    </>
  );
};
