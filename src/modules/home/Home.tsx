import Card from "../../styles/components/Card";
import Heading from "../../styles/components/Heading";
import Main from "../../styles/components/Main";

const Home = () => (
    <Main>
        <Heading level={1}>Home</Heading>
        <Card link={"fut"} title={"FUT"} />
    </Main>
);

export default Home;