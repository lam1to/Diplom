import { useRouter } from 'next/router';
import { selectMyNfts } from '../../components/store/NFT/nftSlice';
import { useAppSelector } from '../../components/store/hooks';
import Container from '../../components/Container/Container';
import st from '../../styles/SellCard.module.css';
const PageNft = () => {
  const myNft = useAppSelector(selectMyNfts);
  console.log('my = ', myNft);
  const router = useRouter();
  const data = myNft
    ? router.query && router.query.id && myNft[+router.query.id]
    : {
        name: 'Test',
        description: 'Test description',
        file: '1703625957756_digital_transformation.png',
        price: '9999',
      };
  return (
    <Container maxWidth="lg">
      <div className={st.page_nft_block}>
        <div className={st.page_nft_block_img}>
          <img
            src={`/images/${
              data && data.file
                ? data.file
                : '1703625957756_digital_transformation.png'
            }`}
          ></img>
        </div>
        <div className={st.page_nft_block_info}>
          <div className={st.title}>NFT information</div>

          <div className={st.page_nft_item_label}>Name</div>
          {/* @ts-ignore */}
          <div className={st.page_nft_item_info}>{data && data.nameNFT}</div>
          <div className={st.page_nft_item_label}>Description</div>
          <div className={st.page_nft_item_info}>
            {data && data.description}
          </div>
          <div className={st.page_nft_item_label}>Price</div>
          <div className={st.page_nft_item_info}>{data && data.price}$</div>
        </div>
      </div>
    </Container>
  );
};
export default PageNft;
