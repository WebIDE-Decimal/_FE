import HomeBanner from "./HomeBanner/HomeBanner.tsx";

const Home = () => {
  const code = new URL(window.location.href).searchParams.get("code");
  return (
    <div className={"w-full h-full mt-14"}>
      <HomeBanner />
    </div>
  );
};

export default Home;
