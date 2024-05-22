import { ConnectWallet, useAddress, useWallet } from "@thirdweb-dev/react";
import Image from "next/image";
import { ConnectButton } from "thirdweb/react";
import Link from "next/link";
import styles from "./Navbar.module.css";

/**
 * Navigation bar that shows up on all pages.
 * Rendered in _app.tsx file above the page content.
 */
export function Navbar() {
  const address = useAddress();
  console.log("adress = ", address);
  const wallet = useWallet();
  console.log("wallet = ", wallet);
  const clientId = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID;
  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;

  const client =
    clientId && secretKey
      ? { clientId, secretKey }
      : { clientId: "", secretKey: "" };
  return (
    <div className={styles.navContainer}>
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <Link href="/" className={`${styles.homeLink} ${styles.navLeft}`}>
            <Image
              src="/logo.png"
              width={48}
              height={48}
              alt="NFT marketplace sample logo"
            />
          </Link>

          <div className={styles.navMiddle}>
            <Link href="/buy" className={styles.link}>
              Buy
            </Link>
            <Link href="/sell" className={styles.link}>
              Sell
            </Link>
            <Link href="/create" className={styles.link}>
              Create
            </Link>
          </div>
        </div>

        <div className={styles.navRight}>
          <div className={styles.navConnect}>
            {/* <ConnectButton
              client={client}
              // wallets={wallets}
              theme={"dark"}
              connectModal={{ size: "wide" }}
            /> */}

            <ConnectWallet theme="dark" btnTitle="Connect Wallet" />
          </div>
          {address && (
            <Link className={styles.link} href={`/profile/${address}`}>
              <Image
                className={styles.profileImage}
                src="/user-icon.png"
                width={42}
                height={42}
                alt="Profile"
              />
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
