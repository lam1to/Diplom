import { FC } from 'react';
import st from '../styles/SellCard.module.css';
import Link from 'next/link';
export interface SellCardProps {
  file: string;
  nameNFT: string;
  description: string;
  price: number;
  i: number;
}

const SellCard: FC<SellCardProps> = (item, { i, nameNFT }) => {
  console.log('item = ', item);
  return (
    <Link href={`nft/${item.i}`}>
      <div className={st.card_item}>
        <img
          style={{ width: '100%', height: '200px', borderRadius: '20px' }}
          src={`/images/${item.file}`}
        ></img>
        <div className={st.name_card}>{item.nameNFT}</div>
      </div>
    </Link>
  );
};
export default SellCard;
