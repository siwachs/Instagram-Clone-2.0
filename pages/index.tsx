import type { NextPage } from "next";
import Head from "next/head";
import Header from "../Components/Header";
import Feed from "../Components/Feed";
import Modal from "../Components/Modal";

const Home: NextPage = () => {
  return (
    <div className="h-screen overflow-y-scroll bg-gray-50 scrollbar-hide">
      <Head>
        <title>Instagram Clone 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Modal */}
      <Modal></Modal>

      <Header></Header>

      <Feed></Feed>
    </div>
  );
};

export default Home;
